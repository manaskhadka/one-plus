import React, { useState, useEffect } from 'react';
import Sidebar from "./sidebar";
import axios from 'axios'; // Import Axios for making HTTP requests
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

const Author = ({ name, imageUrl}) => {
  return (
    <div className="author" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="author-image" style={{ marginRight: '10px' }}>
        <img src={imageUrl} alt={name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
      <div className="author-name">
        <p>{name}</p>
      </div>
    </div>
  );
};

const Activity = ({ activity, author, onYes, onNo, onSave }) => {
  console.log("AUTHOR:", author, "ACTIVITY", activity);
  const { title, date, location, eventImage } = activity;

  // Convert the Buffer data to Base64
  const eventImg = `data:${eventImage.contentType};base64,${Buffer.from(
    eventImage.data
  ).toString('base64')}`;

  var authorImage = ""
  if (author) {
    // set authorImage 
    authorImage = `data:${author.userImage.contentType};base64,${Buffer.from(
      author.userImage.data
    ).toString('base64')}`;
  }

  return (
    <div className="activity-wrapper">
      <div className="activity-box" style={{ border: '1px solid #ccc', borderRadius: '30px', marginBottom: '10px' }}>
        {author && <Author name={author.username} imageUrl={authorImage} />}
        {/* Use the converted Base64 string as src */}
        <img src={eventImg} alt={title} style={{ width: 512, height: 'auto'}} /> 
        <p><b>{title}</b></p>
        <p>Date: {date}</p>
        <p>Location: {location}</p>
      </div>
      <ActivityButtons onYes={onYes} onNo={onNo} onSave={onSave} />
    </div>
  );
};




const ActivityButtons = ({ onYes, onNo, onSave }) => {
  return (
    <div className="buttons" style={{ marginTop: '10px', textAlign: 'center' }}>
      <button className="activity-button" onClick={onYes}>Yes</button>
      <button className="activity-button" onClick={onNo}>No</button>
      <button className="activity-button" onClick={onSave}>Save</button>
    </div>
  );
};

const TwoColumnLayout = ({ component }) => { // Destructure component from props
  return (
    <div className="two-column-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: '1', padding: '20px' }}>
        {component} {/* render component directly */}
      </div>
    </div>
  );
};

const Mainpage = () => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    // Fetch events data from the server when the component mounts
    axios.get('http://localhost:5000/events')
      .then(response => {
        setActivitiesData(response.data);
        console.log('Activities data:', response.data); // Log fetched data
        
        // Initialize userData with user data from the first activity
        const firstActivityUsername = response.data[0]?.authorUsername
        if (firstActivityUsername) {;
          axios.get(`http://localhost:5000/user/${firstActivityUsername}`)
            .then(userResponse => {
              setUserData(userResponse.data);
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Fetch user data when activitiesData or currentActivityIndex changes
    if (activitiesData.length > 0 && currentActivityIndex < activitiesData.length) {
      const username = activitiesData[currentActivityIndex]?.author?.username;
      if (username) {
        axios.get(`http://localhost:5000/user/${username}`)
          .then(response => {
            setUserData(response.data);
            console.log('Fetched user data:', response.data); // Log fetched user data
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    }
  }, [activitiesData, currentActivityIndex]); // Dependencies: activitiesData and currentActivityIndex

  const handleYes = () => {
    setCurrentActivityIndex(currentActivityIndex + 1);
  };

  const handleNo = () => {
    setCurrentActivityIndex(currentActivityIndex + 1);
  };

  const handleSave = () => {
    console.log('Activity saved!');
  };

  const activityComponent = currentActivityIndex < activitiesData.length ? (
    <Activity
      activity={activitiesData[currentActivityIndex]}
      author={userData}
      onYes={handleYes}
      onNo={handleNo}
      onSave={handleSave}
    />
  ) : (
    <p>No more activities</p>
  );

  return (
  
  <div>
    <div className="transition-button" style={{ marginTop: '10px', textAlign: 'center' }}>
      <Link to="/create-event">
        <button>Create Event</button>
      </Link>
    </div>

    <TwoColumnLayout
      component={activityComponent}
      userData={userData} // Pass userData to TwoColumnLayout
    />
  </div>
    
  ); 
};

export default Mainpage;
