import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from './apolloClient';
import CharactersListPage from './pages/CharactersListPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import CharactersByLocationPage from './pages/CharactersByLocationPage';
import { client } from './apolloClient';
import './App.css'; // Import the CSS file

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<CharactersListPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
          <Route path="/locations" element={<CharactersByLocationPage />} />
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
