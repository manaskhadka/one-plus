import React from 'react';

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

const SavedEvents = () => {
  let savedEvents = [
    { id: 1, title: '21st Birthday Party', description: 'Come bool', imageUrl: './sample_data/birthday.png', imageAuthor: './sample_data/user6.jpg' },
    { id: 2, title: 'Pizza Night!!!', description: "Free 'Za", imageUrl: './sample_data/pizza-night.jpg', imageAuthor: './sample_data/user2.png' },
    { id: 3, title: 'Salsa Workshop', description: "Intro to Salsa; Open to All!", imageUrl: './sample_data/salsa-workshop.png', imageAuthor: './sample_data/user4.png'}
  ];

  return (
    <div className="saved-events">
      <h2>Saved Events</h2>
      {savedEvents.map(event => (
        <SavedEvent key={event.id} event={event} />
      ))}
    </div>
  );
};

const AcceptedEvents = () => {
  const acceptedInvites = [
    { id: 1, title: 'Volleyball', description: 'Wilbur field all day!!!', imageUrl: './sample_data/volleyball.jpg', imageAuthor: './sample_data/user8.png' },
    { id: 2, title: 'Gym Day', description: 'Gym meet & greet lol', imageUrl: './sample_data/gym.jpg', imageAuthor: './sample_data/user7.png' },
  ];

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

export default Sidebar;