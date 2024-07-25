import React, { useState, useEffect } from 'react';
import './App.css';

const Data = () => {
  const [photos, setPhotos] = useState([]);
  const [startId, setStartId] = useState('');
  const [endId, setEndId] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => setPhotos(data));
  }, []);

  const filterPhotos = () => {
    const start = parseInt(startId, 10);
    const end = parseInt(endId, 10);
    if (!isNaN(start) && !isNaN(end)) {
      const filtered = photos.filter(photo => photo.id >= start && photo.id <= end);
      setFilteredPhotos(filtered);
    }
  };

  return (
    <div className="app">
      <div className="filter">
        <input 
          type="number" 
          placeholder="Boshlang'ich ID" 
          value={startId} 
          onChange={e => setStartId(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Oxirgi ID" 
          value={endId} 
          onChange={e => setEndId(e.target.value)} 
        />
        <button onClick={filterPhotos}>Filter</button>
      </div>
      <div className="cards">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="card">
            <img src={`https://picsum.photos/id/${photo.id}/200/200`} alt={photo.title} />
            <h3>{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
