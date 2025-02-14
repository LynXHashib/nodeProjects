const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 2000;
const diary = require('./controllers/diaryCRUD');

app.use(express.json());
app.use(morgan('dev'));

app.get('/' || 'home', diary.getDiary);
app.post('/' || 'home', diary.createDiary);
app.listen(PORT, () => {
  console.log(`Server is running ${new Date()}`);
});
