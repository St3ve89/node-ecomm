const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form>
        <input placeholder="email"/>
        <input placeholder="password"/>
        <input placeholder="password confirmation"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
