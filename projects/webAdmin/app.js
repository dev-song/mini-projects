const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.get('/admin', (req, res) => {
  const options = {
    root: __dirname
  }
  res.sendFile('admin.html', { root: __dirname });
})

app.post('/validate-login', (req, res) => {
  const { id, pw } = req.body;
  console.log(id, pw);
})

app.listen(port, () => console.log(`Port ${port} is listening!`));