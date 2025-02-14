const express = require('express');
const app = express();
const PORT = 2001;
app.listen(PORT, () => {
  console.log(`Servers running at PORT:${PORT}`);
});
