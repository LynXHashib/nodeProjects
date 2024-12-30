const fs = require('fs');
const express = require('express');
const client = require('../database/maindb');
const tasksList = JSON.parse(
  fs.readFileSync(`${__dirname}/../tasks.json`, 'utf-8')
);
const getTask = (req, res) => {
  async function database(task) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db('admin').command({ ping: 1 });
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!'
      );

      const db = client.db('JSON_API'); // Replace with your database name
      const TaskList = db.collection('TaskList'); // Replace with your collection name

      const taskArray = await TaskList.find().toArray();
      const tasky = await TaskList.find();
      console.log(tasky);

      res.status(200).json(taskArray);
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`
      );
      res.status(500).send('Internal Server Error');
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  database().catch(console.dir);
};

const postTask = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send('Invalid Task');
  }

  const newJson = {
    task: `${task}`,
  };

  async function database(task) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db('admin').command({ ping: 1 });
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!'
      );

      const db = client.db('JSON_API'); // Replace with your database name
      const TaskList = db.collection('TaskList'); // Replace with your collection name

      const insertManyResult = await TaskList.insertMany([task]);
      console.log(
        `${insertManyResult.insertedCount} documents successfully inserted.\n`
      );
      res.status(201).json({
        Success: true,
        info: newJson,
      });
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`
      );
      res.status(500).send('Internal Server Error');
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  database(newJson).catch(console.dir);
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
