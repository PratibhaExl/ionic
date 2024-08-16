

CREATE PROCEDURE [dbo].[USP_TA_SEP_GetUpdateDetails_new] 
    @SEPEventID UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @fileid NVARCHAR(100);

    -- Retrieve the file ID associated with the event
    SELECT @fileid = FK_UniqueFileId 
    FROM TA_SEP_EventMasterData 
    WHERE SEPEventID = @SEPEventID;

    -- Create a temporary table to store county information
    CREATE TABLE dbo.CountyArrTbl (
        Id INT IDENTITY(1,1) PRIMARY KEY, 
        FK_SEPEventID UNIQUEIDENTIFIER, 
        countyArr NVARCHAR(MAX), 
        insertDate DATETIME, 
        countyStr NVARCHAR(MAX)
    );

    -- Insert data into the temporary county table
    INSERT INTO dbo.CountyArrTbl (FK_SEPEventID, countyArr, insertDate, countyStr)
    SELECT 
        @SEPEventID, 
        Purpose, 
        MAX(InsertedDate) AS InsertedDate, 
        STRING_AGG(countyid, ',') WITHIN GROUP (ORDER BY RowId) AS countyStr
    FROM TA_SEP_EventMasterData_History
    WHERE FK_SEPEventID = @SEPEventID 
    GROUP BY Purpose, RowId;

    -- Execute any additional processing
    EXEC ProcessImpactedAreaUpdate;

    -- Create a temporary table to store file upload information
    CREATE TABLE #tempFileUpload (
        FileName NVARCHAR(MAX), 
        FileAddedDate DATE
    );

    -- Insert data into the temporary file upload table
    INSERT INTO #tempFileUpload (FileName, FileAddedDate)
    SELECT 
        CONCAT('Filename updated to: ', STRING_AGG(SEPEventFileName, ',') WITHIN GROUP (ORDER BY UpdatedDate)), 
        CONVERT(DATE, UpdatedDate)
    FROM TA_SEP_EventFileUpload
    WHERE IsActive = 1 AND UniqueFileId = @fileid
    GROUP BY CONVERT(DATE, UpdatedDate);

    -- Combine results and select final output with the specified logic
    SELECT 
        COALESCE(STRING_AGG(DISTINCT CONCAT(a.Purpose, ',', CAT.countyStr), ', '), 
                 f.FileName) AS Purpose,
        COALESCE(CONVERT(DATE, a.InsertedDate), f.FileAddedDate) AS InsertedDate
    FROM TA_SEP_EventMasterData_History a
    FULL OUTER JOIN dbo.CountyArrTbl CAT 
        ON CONVERT(DATE, a.InsertedDate) = CONVERT(DATE, CAT.insertDate)
    FULL OUTER JOIN #tempFileUpload f 
        ON COALESCE(CONVERT(DATE, a.InsertedDate), CAT.insertDate) = f.FileAddedDate
    WHERE (a.Action = 'U' AND a.Purpose IS NOT NULL AND a.PK_SEPEventID = @SEPEventID)
       OR (f.FileAddedDate IS NOT NULL)
    GROUP BY 
        COALESCE(CONVERT(DATE, a.InsertedDate), f.FileAddedDate), 
        f.FileName, 
        f.FileAddedDate
    ORDER BY 
        COALESCE(CONVERT(DATE, a.InsertedDate), f.FileAddedDate) ASC;

    -- Drop the temporary tables
    DROP TABLE dbo.CountyArrTbl;
    DROP TABLE #tempFileUpload;
END;
