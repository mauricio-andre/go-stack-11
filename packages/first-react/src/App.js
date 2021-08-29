import React, { useState, useEffect } from 'react';
import './app.css';
import Header from './components/Header';
import api from './services/api';

function App() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjetos(response.data);
    });
  }, []);

  function handleAddProject() {
    api
      .post('projects', {
        title: `Novo projeto ${Date.now()}`,
        owner: 'Mauricio André',
      })
      .then((response) => {
        setProjetos([...projetos, response.data]);
      });
  }

  return (
    <Header title="Projetos">
      <ul>
        {projetos.map((projeto) => (
          <li key={projeto.id}>{projeto.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </Header>
  );
}

export default App;
