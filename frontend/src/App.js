import React, { useState, useEffect } from "react";
import api from "./services/api";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get("clients").then(({ data }) => {
      setClients(data);
    });
  }, []);

  function handleAddProject() {
    setClients([...clients, { id: Date.now(), name: "teste" }]);
  }

  return (
    <>
      <Header title="Titulo 1">
        <ul>
          {clients.map((client) => (
            <li key={client.id}>{client.name}</li>
          ))}
        </ul>

        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}

export default App;
