import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const data = {
      title: `New Repo ${Date.now()}`,
      url: "Freud",
      techs: [
        "React native", "Java"
      ]
    }
    const response = await api.post('repositories', data)
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) { 
    await api.delete(`repositories/${id}`)
    const obj = repositories.findIndex( reposito => reposito.id === id )
    const auxiliarList = repositories.slice()
    auxiliarList.splice(obj, 1)
    setRepositories(auxiliarList)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id} >
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
