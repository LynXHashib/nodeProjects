const express = require('express');
const home = require('./routes/home');
const app = express();
const otherRouter = require('./routes/otherRoutes');
const router = require('./routes/home');
const taskRouter = require('./routes/taskMangerRoutes');
const convertTemp = require('./routes/convertTemp');
app.use(express.json());
// app.use(express.static('templates'));
const PORT = 3000;
// API'S
app.use('/', router);
app.use('/api/v1', taskRouter);
app.use('/api/v2', convertTemp);
app.listen(PORT, () => {
  console.log(`Server is Running`);
});
