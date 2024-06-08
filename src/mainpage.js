import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
window.Buffer = window.Buffer || require("buffer").Buffer;


const SavedEvent = ({ event }) => {
  const { title, description, imageUrl, imageAuthor} = event;

  // Style for the right half of the rectangle div
  const rightHalfStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flex: 1,
    height: '100px',
    borderRadius: '5px 0 0 5px' // Ensure the border radius is applied only to the left side
  };

  return (
    <div className="saved-event" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <div className="event-image" style={{ marginRight: '10px' }}>
        <img src={imageAuthor} alt={title} style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'block' }} />
      </div>
      <div className="event-info" style={{ flex: 1 }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="right-half" style={rightHalfStyle}></div> {/* Right half with background image */}
    </div>
  );
};

const AcceptedEvent = ({ event }) => {
  const { title, description, imageUrl, imageAuthor} = event;

  // Style for the right half of the rectangle div
  const rightHalfStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flex: 1,
    height: '100px',
    borderRadius: '5px 0 0 5px' // Ensure the border radius is applied only to the left side
  };

  return (
    <div className="accepted-event" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <div className="event-image" style={{ marginRight: '10px' }}>
        <img src={imageAuthor} alt={title} style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'block' }} />
      </div>
      <div className="event-info" style={{ flex: 1 }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="right-half" style={rightHalfStyle}></div> {/* Right half with background image */}
    </div>
  );
};

let savedEvents = [
  { id: 1, title: '21st Birthday Party', description: 'Come bool', imageUrl: './sample_data/birthday.png', imageAuthor: './sample_data/user6.jpg' },
  { id: 2, title: 'Pizza Night!!!', description: "Free 'Za", imageUrl: './sample_data/pizza-night.jpg', imageAuthor: './sample_data/user2.png' },
  { id: 3, title: 'Salsa Workshop', description: "Intro to Salsa; Open to All!", imageUrl: './sample_data/salsa-workshop.png', imageAuthor: './sample_data/user4.png'}
];
const SavedEvents = () => {
  return (
    <div className="saved-events">
      <h2>Saved Events</h2>
      {savedEvents.map(event => (
        <SavedEvent key={event.id} event={event} />
      ))}
    </div>
  );
};

let acceptedInvites = [
  { id: 1, title: 'Volleyball', description: 'Wilbur field all day!!!', imageUrl: './sample_data/volleyball.jpg', imageAuthor: './sample_data/user8.png' },
  { id: 2, title: 'Gym Day', description: 'Gym meet & greet lol', imageUrl: './sample_data/gym.jpg', imageAuthor: './sample_data/user7.png' },
];
const AcceptedEvents = () => {
  return (
    <div className="recently-accepted-invites">
      <h2>Accepted Events</h2>
      {acceptedInvites.map(event => (
        <AcceptedEvent key={event.id} event={event} />
      ))}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: '600px', height: 'calc(100vh - 20px)', overflowY: 'scroll', padding: '10px' }}>
      <AcceptedEvents />
      <SavedEvents />
    </div>
  );
};

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

  let authorImage = "";
  if (author) {
    // Set authorImage 
    authorImage = `data:${author.userImage.contentType};base64,${Buffer.from(
      author.userImage.data
    ).toString('base64')}`;
  }

  return (
    <div className="activity-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="activity-box" style={{ border: '1px solid #ccc', borderRadius: '30px', marginBottom: '10px', padding: '20px', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
        {author && <Author name={author.username} imageUrl={authorImage} />}
        {/* Use the converted Base64 string as src */}
        <img src={eventImg} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '20px' }} />
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
  const { user } = useAuth(); // Extract user data using useAuth


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
    const { title, date, description, eventImage } = activitiesData[currentActivityIndex];
    setCurrentActivityIndex(currentActivityIndex + 1);
    acceptedInvites.push(
      {
        id: acceptedInvites.length,
        title: title,
        description: description,
        imageUrl: eventImage,
        imageAuthor: userData.userImage
      }
    )
  };

  const handleNo = () => {
    setCurrentActivityIndex(currentActivityIndex + 1);
  };

  const handleSave = () => {
    const { title, date, description, eventImage } = activitiesData[currentActivityIndex];
    setCurrentActivityIndex(currentActivityIndex + 1);
    savedEvents.push(
      {
        id: savedEvents.length,
        title: title,
        description: description,
        imageUrl: eventImage,
        imageAuthor: userData.userImage
      }
    )
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
    <TwoColumnLayout
      component={activityComponent}
      userData={userData} // Pass userData to TwoColumnLayout
    />
  </div>
    
  ); 
};

export default Mainpage;
