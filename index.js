const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ['ctvg423t456v']
  })
);

app.use(authRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
