const fs = require('fs');
const https = require('https');
const contactList = JSON.parse(
  fs.readFileSync(`${__dirname}/../contactList.json`, 'utf-8')
);

const contactForm = (req, res) => {
  const newid = contactList.length;
  const { username, password, email } = req.body;

  if (!username || !password || isNaN(password) || !email) {
    return res.status(400).send('Invalid parameters');
  }
  const newJson = {
    id: `${newid}`,
    email: `${email}`,
    username: `${username}`,
    password: `${password}`,
  };
  contactList.push(newJson);
  console.log(newJson);
  fs.writeFileSync(
    `${__dirname}/../conctactList.json`,
    JSON.stringify(contactList, null, 2)
  );
  res.status(201).json({
    task: 'success',
    info: newJson,
  });
};

const jokeApi = (req, res) => {
  https
    .get('https://official-joke-api.appspot.com/random_joke', (response) => {
      let data = '';

      // Collect data chunks
      response.on('data', (chunk) => {
        data += chunk;
      });

      // On end, parse and send the data
      response.on('end', () => {
        const joke = JSON.parse(data);
        res.json(joke);
      });
    })
    .on('error', (err) => {
      res.status(500).send('Error fetching joke');
    });
};

module.exports = { contactForm, jokeApi };
