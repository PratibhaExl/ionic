To create a calendar that shows blocked meetings, allows the creation of meetings on clicking a specific date, and applies color coding to view blocked dates, you can use Material-UI's (@mui/material and @mui/lab for version 5) DatePicker along with a custom implementation for the meeting logic. This example will use @mui/lab's StaticDatePicker to display the calendar and @mui/material for the UI components.

First, ensure you have the necessary MUI and date libraries installed:

bash
Copy code
npm install @mui/material @mui/lab @emotion/react @emotion/styled @date-io/luxon luxon
Here's a basic implementation:

tsx
Copy code
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { StaticDatePicker } from '@mui/lab';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';

interface Meeting {
  date: DateTime;
  title: string;
}

const CalendarWithMeetings: React.FC = () => {
  const [value, setValue] = useState<DateTime | null>(DateTime.now());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingTitle, setMeetingTitle] = useState<string>('');

  const handleDateChange = (newValue: DateTime | null) => {
    setValue(newValue);
  };

  const addMeeting = () => {
    if (!value || meetingTitle.trim() === '') return;
    const newMeeting: Meeting = {
      date: value,
      title: meetingTitle,
    };
    setMeetings([...meetings, newMeeting]);
    setMeetingTitle('');
  };

  const isDateBlocked = (date: DateTime) => {
    return meetings.some(meeting => meeting.date.hasSame(date, 'day'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isBlocked = isDateBlocked(day);
            return (
              <Button
                onClick={() => setValue(day)}
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: isBlocked ? 'red' : 'transparent',
                  '&:hover': {
                    backgroundColor: isBlocked ? 'darkred' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {day.day}
              </Button>
            );
          }}
        />
        <TextField
          label="Meeting Title"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={addMeeting} disabled={!value || meetingTitle.trim() === ''}>
          Add Meeting
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default CalendarWithMeetings;
This component uses StaticDatePicker from MUI to render the calendar. It keeps track of meetings in state and allows users to add a meeting on a selected date with a specified title. The renderDay method is customized to change the background color of days with meetings to red, indicating they are blocked.

Remember to adapt styles and functionalities as per your application's requirements.

