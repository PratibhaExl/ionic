const getRecords = async (req, res) => {
    try {
        const { id } = req.query;

        let records;
        if (id) {
            // Fetch single record by id from Table A
            records = await TableA.findOne({ id, isActive: true }).lean();

            if (records) {
                // Fetch corresponding workflowname from Table B based on detailId
                const workflowRecord = await TableB.findOne({
                    detailId: records.detailId,
                    isActive: true
                }, 'workflowname').lean();

                if (workflowRecord) {
                    records.workflowname = workflowRecord.workflowname;
                }
            }
        } else {
            // Fetch all records from Table A
            records = await TableA.find({ isActive: true }).lean();

            // Attach workflowname from Table B to each record
            for (let record of records) {
                const workflowRecord = await TableB.findOne({
                    detailId: record.detailId,
                    isActive: true
                }, 'workflowname').lean();

                if (workflowRecord) {
                    record.workflowname = workflowRecord.workflowname;
                }
            }
        }

        res.json(records || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
