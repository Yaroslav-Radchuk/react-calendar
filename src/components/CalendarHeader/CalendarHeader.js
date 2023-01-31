import React, { useContext, useState } from 'react';
import plusImg from '../../assets/plus.png';

import { BsCalendar } from 'react-icons/bs'
import { SmallCalendar } from '../SmallCalendar/SmallCalendar';

import dayjs from 'dayjs';
import { GlobalContext } from '../../context/GlobalContext';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';


export function CalendarHeader() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handleMonth = month => {
    setMonthIndex(monthIndex + month);
  }

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month()
      ? monthIndex + Math.random()
      : dayjs().month()
    );
  }

  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <header className="py-2 flex justify-between items-center relative">
      <div>
        <button
          onClick={() => setShowEventModal(true)}
          className="border rounded-full flex items-center shadow-md hover:shadow-2xl"
        >
          <img
            src={plusImg}
            alt="create_event"
            className="w-9 h-9"
          />
        </button>
        </div>
        <div className="flex items-center">
        <button
          onClick={handleReset}
          className="border rounded py-1 px-4 mr-6 shadow-md hover:shadow-2xl"
        >
          Today
        </button>
        <IconButton onClick={() => handleMonth(-1)}>
          <ArrowBackIosNewIcon
            fontSize="small"
          />
        </IconButton>
        <h1 className="text-gray-700 w-32 text-center font-semibold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format(
            "MMMM YYYY"
          )}
        </h1>
        <IconButton onClick={() => handleMonth(1)}>
          <ArrowForwardIosIcon
            fontSize="small"
          />
        </IconButton>
        <button
          className="border rounded py-2 px-5 ml-3 shadow-md hover:shadow-2xl"
          onClick={() => setCalendarOpen(!calendarOpen)}
        >
          <BsCalendar />
        </button>
          {calendarOpen && (
            <SmallCalendar />
          )}
      </div>
    </header>
  );
}
