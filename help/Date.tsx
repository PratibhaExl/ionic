
two digits value
function getDayMonthYear(inputDate: Date): {
    day: number,
    month: number,
    year: number,
    fullDate: string
} | {} {
    try {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        const fullDateTimeString = inputDate.toLocaleString("en-US", options);
        const [datePart, timePart] = fullDateTimeString.split(', ');
        const [month, day, year] = datePart.split('/');

        return {
            day: parseInt(day, 10),
            month: parseInt(month, 10),
            year: parseInt(year, 10),
            fullDate: fullDateTimeString
        };
    } catch (e) {
        console.error(e);
        return {};
    }
}


function getDayMonthYear(inputDate) {
    try {
        // Define options for formatting.
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        };

        // Format the date string.
        const fullDateTimeString = new Date(inputDate).toLocaleString("en-US", options);
        const [datePart, timePart] = fullDateTimeString.split(', '); // Splits into date and time parts
        const [month, day, year] = datePart.split('/'); // Splits the date into month, day, and year

        // Parse the date parts to integers.
        return {
            day: parseInt(day, 10),  // Parses day ensuring leading zero is ignored
            month: parseInt(month, 10),  // Parses month ensuring leading zero is ignored
            year: parseInt(year, 10),  // Parses full year
            fullDate: fullDateTimeString,  // Returns the full date and time string
        };
    } catch (e) {
        console.log(e);
        return {};
    }
}


*******new**** last modified 


function getCurrentDate() {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear(); // year is already a number
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1 and pad with 0
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const timeZoneName = currentDate.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2];

        const currentDateFormatted = `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${timeZoneName}`;
        const YYYY_MM_DD = `${year}-${month}-${day}`; // return format - 2024-05-14
        const MM_DD_YYYY = `${month}-${day}-${year}`; // return format - 05-14-2024
        const _YYYY_MM_DD = `${year}/${month}/${day}`; // return format - 2024/05/14
        const _MM_DD_YYYY = `${month}/${day}/${year}`; // return format - 05/14/2024

        return {
            day: parseInt(day, 10),
            month: parseInt(month, 10),
            year: year, // no need to parse, it's already a number
            currentDate: currentDateFormatted,
            YYYY_MM_DD: YYYY_MM_DD, // return format - 2024-05-14
            MM_DD_YYYY: MM_DD_YYYY, // return format - 05-14-2024
            _YYYY_MM_DD: _YYYY_MM_DD, // return format - 2024/05/14
            _MM_DD_YYYY: _MM_DD_YYYY, // return format - 05/14/2024
        };
    } catch (e) {
        console.log(e);
        return {};
    }
}

    
function getDayMonthYear(inputDate: any): any {
    try {
        // Ensure inputDate is a Date object
        const date = new Date(inputDate);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        };

        const optionsNumeric: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };

        // Formatting the input date according to the options provided
        const fullDate = date.toLocaleDateString('en-US', options);
        const fullDateNumeric = date.toLocaleDateString('en-US', optionsNumeric);

        // Using methods to extract date parts
        const day = date.getDate(); // Extracts the day of the month (1-31)
        const month = date.getMonth() + 1; // Extracts the month (0-11), so +1 to get (1-12)
        const year = date.getFullYear(); // Extracts the full year (e.g., 2024)

        // Constructing the MM/DD/YYYY format
        const date_MM_DD_YYYY = `${month}/${day}/${year}`;

        return {
            day: day,
            month: month,
            year: year,
            fullDate: fullDateNumeric, // Format with numeric date parts
            date_MM_DD_YYYY: date_MM_DD_YYYY, // Date formatted as MM/DD/YYYY
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}
console.log(getDayMonthYear('2024-07-03')); // Valid date string
console.log(getDayMonthYear(new Date())); // Current date
console.log(getDayMonthYear(1720291200000)); // Unix timestamp in milliseconds
