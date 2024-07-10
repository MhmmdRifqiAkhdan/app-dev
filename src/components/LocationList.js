import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query {
    locations {
      id
      name
      characters {
        id
        name
      }
    }
  }
`;

const LocationList = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.locations.map(location => (
        <div key={location.id} className="location-card">
          <h3>{location.name}</h3>
          <ul>
            {location.characters.map(character => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LocationList;
