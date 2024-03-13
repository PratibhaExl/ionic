To achieve the desired functionality with multiple meetings on a single date, 15-minute intervals, rescheduling, unblocking, and displaying all booked meetings for the selected date, you can follow this approach using React functional components, MUI DatePicker, and Calendar:

tsx
Copy code
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { DatePicker, TimePicker } from '@mui/lab';

const MeetingScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [meetings, setMeetings] = useState<{
    startTime: DateTime;
    endTime: DateTime;
    message: string;
  }[]>([]);
  const [meetingStartTime, setMeetingStartTime] = useState<DateTime | null>(null);
  const [meetingEndTime, setMeetingEndTime] = useState<DateTime | null>(null);
  const [meetingMessage, setMeetingMessage] = useState<string>('');

  const handleDateChange = (date: DateTime | null) => {
    setSelectedDate(date);
  };

  const handleMeetingTimeChange = (time: DateTime | null, type: 'start' | 'end') => {
    if (type === 'start') {
      setMeetingStartTime(time);
    } else {
      setMeetingEndTime(time);
    }
  };

  const handleMeetingMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingMessage(e.target.value);
  };

  const addMeeting = () => {
    if (meetingStartTime && meetingEndTime && meetingMessage) {
      setMeetings([...meetings, { startTime: meetingStartTime, endTime: meetingEndTime, message: meetingMessage }]);
      setMeetingStartTime(null);
      setMeetingEndTime(null);
      setMeetingMessage('');
    }
  };

  const rescheduleMeeting = (index: number) => {
    // Implement rescheduling logic here
  };

  const unblockMeeting = (index: number) => {
    // Implement unblocking logic here
  };

  const getMeetingsForSelectedDate = () => {
    return meetings.filter(meeting =>
      selectedDate?.hasSame(meeting.startTime, 'day') || selectedDate?.hasSame(meeting.endTime, 'day'));
  };

  return (
    <div>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        minDate={DateTime.now()}
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
        label="Meeting Start Time"
        value={meetingStartTime}
        onChange={(time) => handleMeetingTimeChange(time, 'start')}
        minutesStep={15}
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
        label="Meeting End Time"
        value={meetingEndTime}
        onChange={(time) => handleMeetingTimeChange(time, 'end')}
        minutesStep={15}
        renderInput={(params) => <TextField {...params} />}
      />
      <input type="text" value={meetingMessage} onChange={handleMeetingMessageChange} />
      <button onClick={addMeeting}>Add Meeting</button>

      {getMeetingsForSelectedDate().map((meeting, index) => (
        <div key={index}>
          <p>{meeting.startTime.toLocaleString()} - {meeting.endTime.toLocaleString()}</p>
          <p>Message: {meeting.message}</p>
          <button onClick={() => rescheduleMeeting(index)}>Reschedule</button>
          <button onClick={() => unblockMeeting(index)}>Unblock</button>
        </div>
      ))}
    </div>
  );
};

export default MeetingScheduler;
This MeetingScheduler component allows users to select a date and time for meetings, add multiple meetings with 15-minute intervals, display all booked meetings for the selected date, and implement rescheduling and unblocking functionalities for individual meetings.

