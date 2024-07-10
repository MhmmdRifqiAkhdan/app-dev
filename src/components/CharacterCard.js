import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => (
  <div className="character-card">
    <Link to={`/character/${character.id}`}>
      <h3>{character.name}</h3>
      <img src={character.image} alt={character.name} />
    </Link>
  </div>
);

export default CharacterCard;
