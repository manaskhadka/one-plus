// src/components/EventForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [authorUsername, setAuthorUsername] = useState('');
  const [eventImage, setEventImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('authorUsername', authorUsername);
    formData.append('eventImage', eventImage);

    try {
      const response = await axios.post('http://localhost:5000/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error uploading the event!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        Date:
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>
      <br />
      <label>
        Author Username:
        <input type="text" value={authorUsername} onChange={(e) => setAuthorUsername(e.target.value)} required />
      </label>
      <br />
      <label>
        Event Image:
        <input type="file" onChange={(e) => setEventImage(e.target.files[0])} required />
      </label>
      <br />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
