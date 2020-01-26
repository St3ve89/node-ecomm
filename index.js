const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['ctvg423t456v']
  })
);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
      Your id is: ${req.session.userId}
      <form method='POST'>
        <input name='email' placeholder="email"/>
        <input name='password' placeholder="password"/>
        <input name='passwordConfirmation' placeholder="password confirmation"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
  // get access to email, password, password confirmation
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email in use!');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords mutch match!');
  }

  // Create user in a user repo to represent this person
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie
  req.session.userId = user.id; // req.session added by cookie-session

  res.send(`Account created!!! `);
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out!');
});

app.get('/signin', (req, res) => {
  res.send(`
    <div>
      <form method='POST'>
        <input name='email' placeholder="email"/>
        <input name='password' placeholder="password"/>
        <button>Sign In</button>
      </form>
    </div>
 `);
});

app.post('/signin', async (req, res) => {});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
