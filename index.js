const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method='POST'>
        <input name='email' placeholder="email"/>
        <input name='password' placeholder="password"/>
        <input name='psaswordConfirmation' placeholder="password confirmation"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', data => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

app.post('/', bodyParser, (req, res) => {
  // get access to email, password, password confirmation
  console.log(req.body);
  res.send(`Account created!!! `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
