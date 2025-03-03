date time stamp get server 


function convertServerTimestamp(serverTimestamp) {
    // Extract the milliseconds from the timestamp
    let milliseconds = parseInt(serverTimestamp.replace("/Date(", "").replace(")/", ""), 10);

    // Convert to Date object
    let date = new Date(milliseconds);

    // Format the date to match the DB format (YYYY-MM-DD HH:mm:ss.SSS)
    let formattedDate = date.getUTCFullYear() + "-" +
        String(date.getUTCMonth() + 1).padStart(2, '0') + "-" +
        String(date.getUTCDate()).padStart(2, '0') + " " +
        String(date.getUTCHours()).padStart(2, '0') + ":" +
        String(date.getUTCMinutes()).padStart(2, '0') + ":" +
        String(date.getUTCSeconds()).padStart(2, '0') + "." +
        String(date.getUTCMilliseconds()).padStart(3, '0');

    return formattedDate;
}

// Test cases
console.log("Converted Time 1:", convertServerTimestamp("/Date(1739324062607)/")); // Expected: 2025-02-12 07:04:22.607
console.log("Converted Time 2:", convertServerTimestamp("/Date(1739324029517)/")); // Expected: 2025-02-12 07:03:49.517
