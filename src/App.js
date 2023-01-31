import React, { useState, useContext, useEffect } from 'react';

import './App.css';

import { getMonth } from './util';
import { Month } from './components/Month/Month';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { EventModal } from './components/EventModal/EventModal';
import { GlobalContext } from './context/GlobalContext';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="container mx-auto h-screen flex flex-col py-5 font-roboto">
      {showEventModal && <EventModal />}

      <CalendarHeader />
      <div className="flex flex-1">
        <Month month={currentMonth} />
      </div>
    </div>
  );
}

export default App;
