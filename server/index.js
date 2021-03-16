const express = require("express");
const { v4: uuid, validate } = require("uuid");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const clients = [];

const findUser = (request, response, next) => {
  const { id } = request.params;

  if (!validate(id)) {
    return response.status(400).json({ message: "Invalid uuid" });
  }

  const clientIndex = clients.findIndex((client) => client.id === id);

  if (clientIndex < 0) {
    return response.status(404).json({ message: "Client not found" });
  }

  request.clientIndex = clientIndex;

  return next();
};

app.use("/clients/:id", findUser);

app.get("/clients", (request, response) => {
  const { name } = request.query;

  const results = name
    ? clients.filter((client) => client.name.includes(name))
    : clients;

  response.json(results);
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
  const { clientIndex } = request;

  const body = request.body;

  clients[clientIndex] = { ...clients[clientIndex], ...body };

  response.json(clients[clientIndex]);
});

app.delete("/clients/:id", (request, response) => {
  const { clientIndex } = request;

  clients.splice(clientIndex, 1);

  response.status(204).json();
});

app.listen(3333, () => {
  console.log("Server is online");
});
