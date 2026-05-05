import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({ selectedDate, setSelectedDate }) {
  return (
    <div className="calendar">
      <Calendar onChange={setSelectedDate} value={selectedDate} />
    </div>
  );
}

export default CalendarView;