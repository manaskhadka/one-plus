import React, { useState } from 'react';

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      date,
      image,
      file
    });
  };

  return (
    <div className="post-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1>Post an Event</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Post Event</button>
      </form>
    </div>
  );
};

export default PostPage;
