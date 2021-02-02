const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const clients = [];

app.get("/clients", (request, response) => {
  response.json(clients);
});

app.post("/clients", (request, response) => {
  const { name } = request.body;

  const client = {
    id: uuid(),
    name,
  };

  clients.push(client);

  response.status(201).json(client);
});

app.put("/clients/:id", (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const clientIndex = clients.findIndex((client) => client.id === id);

  if (clientIndex < 0) {
    response.status(404).json({ message: "Client not found" });
  }

  clients[clientIndex].name = name;

  response.json(clients[clientIndex]);
});

app.delete("/clients/:id", (request, response) => {
  const { id } = request.params;

  const clientIndex = clients.findIndex((client) => client.id === id);

  if (clientIndex < 0) {
    return response.status(404).json({ message: "client not found" });
  }

  clients.splice(clientIndex, 1);

  response.json(clients);
});

app.listen(3333, () => {
  console.log("Server is online");
});
