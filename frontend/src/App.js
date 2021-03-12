import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header title="Titulo 1">
        <ul>
          <li>homePage</li>
          <li>Projeto</li>
        </ul>
      </Header>
      <Header title="Titulo 2" />
      <Header title="Titulo 3" />
    </>
  );
}

export default App;
