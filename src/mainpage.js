import React, { useState } from 'react';
import Sidebar from "./sidebar";

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

const activitiesData = [
  {
    id: 3,
    title: 'Lake Lag Firepit BBQ',
    date: 'May 22, 2024',
    location: 'Lake Lag Firepit',
    author: {
      name: "Roberto Floberto",
      imageUrl: './sample_data/user3.png'
    },
    eventImage: './sample_data/lake_lag.png'
  },
  {
    id: 4,
    title: 'Windy Hill Hike w/ Toyon Hall',
    date: 'May 25, 2024',
    location: 'Meet @ Tresidder',
    author: {
      name: "Sarah Luu",
      imageUrl: "./sample_data/user2.png"
    },
    eventImage: './sample_data/windy-hill.png'
  }
];

const Activity = ({ activity, onYes, onNo, onSave }) => {
  const { title, date, location, author, eventImage } = activity;

  return (
    <div className="activity-wrapper">
      <div className="activity-box" style={{ border: '1px solid #ccc', borderRadius: '30px', marginBottom: '10px' }}>
        <div className="activity" style={{ padding: '10px' }}>
          <Author name={author.name} imageUrl={author.imageUrl} />
          <img src={eventImage} alt={title} style={{ width: 512, height: 'auto'}} /> 
          <p><b>{title}</b></p>
          <p>Date: {date}</p>
          <p>Location: {location}</p>
        </div>
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
        {component} {/* render coponent directly */}
      </div>
    </div>
  );
};

const App = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

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
      onYes={handleYes}
      onNo={handleNo}
      onSave={handleSave}
    />
  ) : (
    <p>No more activities</p>
  );

  return <TwoColumnLayout component={activityComponent} />; // Pass activityComponent directly as prop
};

export default App;

