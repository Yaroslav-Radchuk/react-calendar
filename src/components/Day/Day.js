import React, { useContext, useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { GlobalContext } from '../../context/GlobalContext';

export function Day({ day }) {
  const [eventDay, setEventDay] = useState([]);
  const {
    filteredEvents,
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) =>
        dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setEventDay(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? 'bg-blue-100 text-gray-900'
      : 'hover:bg-gray-100';
  }

  return (
    <div className={`border border-gray-200 flex flex-col ${getCurrentDayClass()}`}>
      <header className="flex px-2 justify-between items-center font-bold font-size-20 text-gray-600">
        <p className="text-sm p-1 my-1 text-center">
          {day.format("DD")}
        </p>
        <p className="text-sm mt-1">
          {day.format("dd")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {eventDay.map((event, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(event)}
            className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
