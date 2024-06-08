import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventImage, setEventImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('authorUsername', "DEFAULTUSER");
    formData.append('eventImage', eventImage);
    formData.append('description', description)

    try {
      const response = await axios.post('http://localhost:5000/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('There was an error uploading the event!', error);
    }
  };

  return (
    <div className="event-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', maxWidth: '400px' }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
        <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
        <input type="file" onChange={(e) => setEventImage(e.target.files[0])} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
        <button type="submit" style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', width: '100%' }}>Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
