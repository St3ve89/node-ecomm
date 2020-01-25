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

app.post('/', (req, res) => {
  res.send(`Account created!!! `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
