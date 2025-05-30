const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json()); // REQUIRED to parse JSON bodies

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/add', (req, res) => {
  console.log('Received:', req.body); // Debug line

  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.status(200).send('Task added');
  } else {
    res.status(400).send('Task is required');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.delete('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.status(200).send('Task deleted');
  } else {
    res.status(400).send('Invalid index');
  }
});
