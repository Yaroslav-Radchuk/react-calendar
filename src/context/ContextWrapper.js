import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from 'react';

import dayjs from 'dayjs';
import { GlobalContext } from './GlobalContext';

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'push':
      return [...state, payload];

    case 'update':
      return state.map((event) =>
        event.id === payload.id ? payload : event
      );

    case 'delete':
      return state.filter((event) => event.id !== payload.id);

    default:
      throw new Error();
  };
}

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];

  return parsedEvents;
}

export function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCallEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((event) =>
      labels
        .filter((item) => item.checked)
        .map((item) => item.label)
        .includes(event.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((event) => event.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (item) => item.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateLabel = (event) => {
    setLabels(
      labels.map((item) => (item.label === event.label ? event : item))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        dispatchCallEvent,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
