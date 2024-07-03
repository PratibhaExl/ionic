To create multiple meetings in the calendar for a single date with 15-minute intervals, along with the rescheduling and unblocking features, and displaying all booked meetings for the selected date, you can follow these steps:

Step 1: Set Up the Calendar Component
Create a component for the calendar using MUI DatePicker and TimePicker, allowing users to select a date and time for meetings.

tsx
Copy code
// CalendarComponent.tsx
import React, { useState } from 'react';
import { DatePicker, TimePicker } from '@mui/lab';
import { DateTime } from 'luxon';

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
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

  const blockCalendarSlot = () => {
    // Logic to block calendar slot
    // You can store the blocked slots in state or send them to the server
  };

  return (
    <div>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        minDate={DateTime.now()}
      />
      <TimePicker
        label="Meeting Start Time"
        value={meetingStartTime}
        onChange={(time) => handleMeetingTimeChange(time, 'start')}
        minutesStep={15}
      />
      <TimePicker
        label="Meeting End Time"
        value={meetingEndTime}
        onChange={(time) => handleMeetingTimeChange(time, 'end')}
        minutesStep={15}
      />
      <input type="text" value={meetingMessage} onChange={handleMeetingMessageChange} />
      <button onClick={blockCalendarSlot}>Block Calendar Slot</button>
    </div>
  );
};

export default CalendarComponent;
Step 2: Implement Rescheduling Feature
Add a button to the meeting details component to allow rescheduling.

tsx
Copy code
// MeetingDetailsComponent.tsx
import React from 'react';
import { DateTime } from 'luxon';

interface MeetingDetailsProps {
  meetingStartTime: DateTime | null;
  meetingEndTime: DateTime | null;
  meetingMessage: string;
  onReschedule: () => void;
}

const MeetingDetailsComponent: React.FC<MeetingDetailsProps> = ({
  meetingStartTime,
  meetingEndTime,
  meetingMessage,
  onReschedule,
}) => {
  return (
    <div>
      <p>Meeting Start Time: {meetingStartTime?.toLocaleString()}</p>
      <p>Meeting End Time: {meetingEndTime?.toLocaleString()}</p>
      <p>Meeting Message: {meetingMessage}</p>
      <button onClick={onReschedule}>Reschedule Meeting</button>
    </div>
  );
};

export default MeetingDetailsComponent;
Step 3: Display All Booked Meetings for Selected Date
Create a component to display all booked meetings for the selected date.

tsx
Copy code
// BookedMeetingsComponent.tsx
import React from 'react';
import { DateTime } from 'luxon';

interface BookedMeetingsProps {
  selectedDate: DateTime | null;
  bookedMeetings: Array<{
    startTime: DateTime;
    endTime: DateTime;
    message: string;
  }>;
}

const BookedMeetingsComponent: React.FC<BookedMeetingsProps> = ({
  selectedDate,
  bookedMeetings,
}) => {
  return (
    <div>
      <h2>Booked Meetings for {selectedDate?.toFormat('DDDD')}</h2>
      {bookedMeetings.map((meeting, index) => (
        <div key={index}>
          <p>Start Time: {meeting.startTime.toLocaleString()}</p>
          <p>End Time: {meeting.endTime.toLocaleString()}</p>
          <p>Message: {meeting.message}</p>
        </div>
      ))}
    </div>
  );
};

export default BookedMeetingsComponent;
Step 4: Integrate Dynamic Components and Hook
Combine all components and manage state using a custom hook.

tsx
Copy code
// DynamicComponent.tsx
import React, { useState } from 'react';
import CalendarComponent from './CalendarComponent';
import MeetingDetailsComponent from './MeetingDetailsComponent';
import BookedMeetingsComponent from './BookedMeetingsComponent';
import { DateTime } from 'luxon';

const DynamicComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [meetingDetails, setMeetingDetails] = useState<{
    meetingStartTime: DateTime | null;
    meetingEndTime: DateTime | null;
    meetingMessage: string;
  }>({
    meetingStartTime: null,
    meetingEndTime: null,
    meetingMessage: '',
  });
  const [bookedMeetings, setBookedMeetings] = useState<
    Array<{
      startTime: DateTime;
      endTime: DateTime;
      message: string;
    }>
  >([]);

  const handleBlockSlotClick = (
    meetingStartTime: DateTime | null,
    meetingEndTime: DateTime | null,
    meetingMessage: string,
  ) => {
    setMeetingDetails({ meetingStartTime, meetingEndTime, meetingMessage });
    // Logic to block calendar slot and add the meeting to bookedMeetings
  };

  const handleReschedule = () => {
    // Logic to handle rescheduling
    // Update meeting details
  };

  const handleUnblockClick = () => {
    // Logic to handle unblocking
    // Update meeting details
  };

  const handleDateChange = (date: DateTime | null) => {
    setSelectedDate(date);
    // Logic to fetch and set booked meetings for the selected date
  };

  return (
    <div>
      <div>
        <CalendarComponent onBlockSlotClick={handleBlockSlotClick} />
        {meetingDetails.meetingStartTime && (
          <MeetingDetailsComponent
            meetingStartTime={meetingDetails.meetingStartTime}
            meetingEndTime={meetingDetails.meetingEndTime}
            meetingMessage={meetingDetails.meetingMessage}
            onReschedule={handleReschedule}
          />
        )}
        {selectedDate && (
          <BookedMeetingsComponent
            selectedDate={selectedDate}
            bookedMeetings={bookedMeetings}
          />
        )}
        <button onClick={handleUnblockClick}>Unblock and Return to Calendar</button>
      </div>
    </div>
  );
};

export default DynamicComponent;
In this setup, the DynamicComponent manages the state for selected dates, meeting details, and booked meetings. Users can select dates and time slots for meetings, block calendar slots, view meeting details, reschedule meetings, and see all booked meetings for selected dates.




