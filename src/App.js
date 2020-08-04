/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

/**
 * useState retorna um array com 2 posições
 * 1. Variável com valor inicial
 * 2. Função para atualizar a variável
 */

 /**
  * Funções podem ser usadas com async e await ou .then
  */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';
import './App.css';
import backgroudImg from './assets/backgroud.jpg';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Teste Post Project ${Date.now()}`,
      owner: "Gabriel F. S. Santos"
    });
    
    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <img width="500" src={backgroudImg} alt="backgroud"/>

      <Header backgroud title="Projects" />

      <ul>
        {projects.map(project => (<li key={project.id}>{project.title}</li>))}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;