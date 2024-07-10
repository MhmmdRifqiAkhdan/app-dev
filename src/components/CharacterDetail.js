import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
    }
  }
`;

const ADD_CHARACTER_TO_LOCATION = gql`
  mutation AddCharacterToLocation($characterId: ID!, $locationName: String!) {
    addCharacterToLocation(characterId: $characterId, locationName: $locationName) {
      id
      name
    }
  }
`;

const CharacterDetail = () => {
  const { id } = useParams();
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState(null);
  const { loading, error: queryError, data } = useQuery(GET_CHARACTER, {
    variables: { id }
  });
  const [addCharacterToLocation] = useMutation(ADD_CHARACTER_TO_LOCATION, {
    onError: (err) => setError(err.message)
  });

  if (loading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  const { character } = data;

  const handleAssignLocation = () => {
    if (locationName.trim() === '') {
      setError('Location name is required');
      return;
    }

    addCharacterToLocation({ variables: { characterId: character.id, locationName } })
      .then(response => {
        console.log('Location assigned:', response.data.addCharacterToLocation);
        setError(null); // Clear previous errors
      })
      .catch(err => {
        console.error('Error assigning location:', err);
        setError(err.message);
      });
  };

  return (
    <div className="character-card">
      <h1>{character.name}</h1>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <img src={character.image} alt={character.name} />
      <input
        type="text"
        className="input"
        placeholder="Location Name"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
      />
      <button className="button" onClick={handleAssignLocation}>Assign to Location</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CharacterDetail;
