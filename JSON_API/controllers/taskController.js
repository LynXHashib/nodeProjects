const fs = require('fs');
const express = require('express');
const tasksList = JSON.parse(
  fs.readFileSync(`${__dirname}/../tasks.json`, 'utf-8')
);

const getTask = (req, res) => {
  res.status(200).json(tasksList);
};

const postTask = (req, res) => {
  const newID = tasksList.length;
  const { task } = req.body;
  if (!task) {
    return res.status(400).send('Invalid Task');
  }
  const newJson = {
    id: newID,
    task: `${task}`,
  };
  tasksList.push(newJson);
  fs.writeFileSync(
    `${__dirname}/../tasks.json`,
    JSON.stringify(tasksList, null, 2)
  );
  return res.status(201).json({
    Success: true,
    info: newJson,
  });
};

const deleteTask = (req, res) => {
  const { id } = req.body;
  tasksList.splice(id, 1);
  tasksList.forEach((task, index) => {
    task.id = index;
  });

  fs.writeFileSync(
    `${__dirname}/../tasks.json`,
    JSON.stringify(tasksList, null, 2)
  );
  res.status(200).send('Task deleted successfully');
  console.log(tasksList);
};

const editTask = (req, res) => {
  const { id, newTask } = req.body;
  if (id === null || !newTask) {
    return res.status(400).send('Invalid post');
  }
  if (id < 0 || id > tasksList.length) {
    return res.status(400).send('Invalid post');
  }
  tasksList[id].task = newTask;
  fs.writeFileSync(
    `${__dirname}/../tasks.json`,
    JSON.stringify(tasksList, null, 2)
  );
  res.status(200).json({ newTask });
};

module.exports = {
  getTask,
  postTask,
  deleteTask,
  editTask,
};
