const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://Lynx:4305@cluster0.ooue9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// async function database() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );

//     const db = client.db('JSON_API'); // Replace with your database name
//     const TaskList = db.collection('TaskList'); // Replace with your collection name

//     const recipes = [
//       {
//         task: 'Get in the drip',
//       },
//       {
//         task: 'Be the mane who sold the world',
//       },
//     ];

//     const insertManyResult = await TaskList.insertMany(recipes);
//     console.log(
//       `${insertManyResult.insertedCount} documents successfully inserted.\n`
//     );
//   } catch (err) {
//     console.error(
//       `Something went wrong trying to insert the new documents: ${err}\n`
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// database().catch(console.dir);

module.exports = client;
