const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, likes} = request.body;

  const repository = {
    id : uuid(),
    url,
    title,    
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const { id } = request.params;

  const searchId = repositories.findIndex( f => f.id == id);

  if (searchId < 0) {
    return response.status(400).json({ message : 'id not found'});
  }

  const likes = repositories[searchId].likes;

  repositories[searchId] = {
    id,
    title,
    url,
    techs,
    likes
  };

  return response.status(200).json(repositories[searchId]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const searchId = repositories.findIndex( f => f.id == id);

  if (searchId < 0) {
    return response.status(400).json({ message : 'id not found'});
  }

  repositories.splice(searchId, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const searchId = repositories.findIndex( f => f.id == id);

  if (searchId < 0) {
    return response.status(400).json({ message : 'id not found'});
  }

  repositories[searchId].likes++;

  return response.status(200).json(repositories[searchId]);
});

module.exports = app;
