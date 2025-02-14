const express = require("express");
const client = require("../database/client");
const db = client.db("JSON_API");
const DiaryList = db.collection("Diary");

const getDiary = (req, res) => {
  async function database(task) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!",
      );

      const diaryArray = await DiaryList.find().toArray();

      res.status(200).json(diaryArray);
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`,
      );
      res.status(500).send("Internal Server Error");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  database().catch(console.dir);
};

const createDiary = (req, res) => {
  const { Diary, Day } = req.body;
  if (!Diary || !Day) {
    return res.status(400).send("Invalid Diary or Day");
  }

  // Convert Day to a Date object
  const dayAsDate = new Date(Day);
  if (isNaN(dayAsDate.getTime())) {
    return res.status(400).send("Invalid Date format");
  }

  async function database() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!",
      );

      const insertManyResult = await DiaryList.insertMany([
        { Diary, Day: dayAsDate },
      ]);
      console.log(
        `${insertManyResult.insertedCount} documents successfully inserted.\n`,
      );
      res.status(201).json({
        Success: true,
        Diary,
        Day: dayAsDate,
      });
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`,
      );
      res.status(500).send("Internal Server Error");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  database().catch(console.dir);
};

// const deleteTask = (req, res) => {
//   const { id } = req.body;
//   tasksList.splice(id, 1);
//   tasksList.forEach((task, index) => {
//     task.id = index;
//   });

//   fs.writeFileSync(
//     `${__dirname}/../tasks.json`,
//     JSON.stringify(tasksList, null, 2)
//   );
//   res.status(200).send('Task deleted successfully');
//   console.log(tasksList);
// };

// const editTask = (req, res) => {
//   const { id, newTask } = req.body;
//   if (id === null || !newTask) {
//     return res.status(400).send('Invalid post');
//   }
//   if (id < 0 || id > tasksList.length) {
//     return res.status(400).send('Invalid post');
//   }
//   tasksList[id].task = newTask;
//   fs.writeFileSync(
//     `${__dirname}/../tasks.json`,
//     JSON.stringify(tasksList, null, 2)
//   );
//   res.status(200).json({ newTask });
// };

module.exports = {
  getDiary,
  createDiary,
  //  deleteTask,
  // editTask,
};
