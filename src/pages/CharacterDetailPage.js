import React, { useState } from 'react';

const CharacterDetailPage = ({ character }) => {
  // Panggil useState di awal fungsi komponen
  const [locations, setLocations] = useState([]);

  // Menangani karakter yang tidak didefinisikan
  if (!character) {
    return <div>Loading...</div>; // Atau tampilkan pesan lain sesuai kebutuhan
  }

  // Pastikan karakter telah didefinisikan dengan benar sebelum mengakses propertinya
  const { name, status } = character;

  const addCharacterToLocation = (locationName) => {
    // Pastikan karakter hanya bisa ada di satu lokasi
    const existingLocation = locations.find(loc => loc.name === locationName);
    if (existingLocation) {
      console.log(`Character ${name} is already in location ${locationName}.`);
      return;
    }

    const newLocation = { name: locationName, characters: [character] };
    setLocations(prevLocations => [...prevLocations, newLocation]);
  };

  return (
    <div className="container">
      <h1>Character Detail: {name}</h1>
      <div>
        <p>Name: {name}</p>
        <p>Status: {status}</p>
        {/* Add more character details as needed */}
      </div>
      <button onClick={() => addCharacterToLocation('Earth')}>Assign to Earth</button>
      <button onClick={() => addCharacterToLocation('Space')}>Assign to Space</button>
      {/* Render locations dynamically */}
      <div>
        <h2>Locations:</h2>
        <ul>
          {locations.map((loc, index) => (
            <li key={index}>{loc.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
