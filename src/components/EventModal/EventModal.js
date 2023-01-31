import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { MdOutlineSubtitles, MdOutlineSubtitlesOff } from 'react-icons/md';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';
import { GlobalContext } from '../../context/GlobalContext';

const labels = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export function EventModal() {
  const {
    daySelected,
    selectedEvent,
    setShowEventModal,
    dispatchCalEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ''
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent
    ? labels.find((lbl) => lbl === selectedEvent.label)
    : labels[0]
  );
  const [time, setTime] = useState(selectedEvent?.time ?? '--:--');

  const dateFormCreated = (event) => {
    if (!selectedEvent) {
      return;
    }
  
    const date = new Date(event);
    return dayjs(date).format('DD.MM.YYYY HH:mm')
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const eventCalendar = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
    } else {
      dispatchCalEvent({ type: 'update', payload: eventCalendar });
      dispatchCalEvent({ type: 'push', payload: eventCalendar });
    };

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <div className="font-bold text-gray-600">
            {!selectedEvent ? 'Add new idea item' : 'Edit idea item'}
          </div>
          <IconButton onClick={() => setShowEventModal(false)}>
            <CloseIcon color="action" fontSize="small" />
          </IconButton>
        </header>
        <div className="p-3">
          {selectedEvent && (
            <p className="text-sm text-gray-400">
              {!selectedEvent.updated && (
                `Created at: ${dateFormCreated(selectedEvent.id)}`
              )}
              {selectedEvent.updated && (
                `Updated at: ${dateFormCreated(selectedEvent.updated)}`
              )}
            </p>
          )}
          <div className="grid grid-cols-1/6 items-end gap-y-7">
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="standard"
                label="Title"
                name="Title"
                color="info"
                placeholder="Title goes here"
                value={title}
                required
                fullWidth
                onChange={(event) => setTitle(event.target.value)}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="start">
                      {!title ? <MdOutlineSubtitlesOff /> : <MdOutlineSubtitles /> }
                    </InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="standard"
                label="Description"
                color="info"
                name="Description"
                value={description}
                fullWidth
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
          <div className="flex justify-between items-center">
            <Grid item xs={6}>
              <TextField
                type="text"
                name="Date"
                value={daySelected.format('DD.MM.YYYY')}
                variant="standard"
                label="Date"
                color="info"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="standard"
                label="Begin time"
                color="info"
                type="time"
                name="Time"
                placeholder="Begin time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </Grid>
          </div>
            <div className="flex gap-x-2">
              {labels.map((label, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(label)}
                  className={`bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-2xl`}
                >
                  {selectedLabel === label && (
                    <span className="material-icons-outlined text-white text-sm">
                      ✓
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          {selectedEvent && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                dispatchCalEvent({
                  type: "delete",
                  payload: selectedEvent,
                });
                  setShowEventModal(false);
              }}
            >
              <DeleteIcon />
            </Button>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className={classNames(title
              ? 'bg-gray-900 hover:bg-gray-700 px-6 ml-2 mr-2 py-2 rounded text-white'
              : 'disabled:opacity-90 bg-gray-300 px-6 mr-2 py-2 rounded text-white'
            )}
            disabled={!title}
          >
            SAVE
          </button>
        </footer>
      </form>
    </div>
  );
}
