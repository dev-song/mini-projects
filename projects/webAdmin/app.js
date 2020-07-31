const express = require('express');
const app = express();
const port = 3000;
const options = {
  root: __dirname
};

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.sendFile('index.html', options);
})

app.get('/admin', (req, res) => {
  res.sendFile('admin.html', options);
})

app.post('/validate-login', (req, res) => {
  const { id, pw } = req.body;
  const validId = 'devsong';
  const validPw = 'SecTest1';

  if (id !== validId) {
    console.log(`${id}는 존재하지 않는 ID입니다.`);
    res.redirect('/admin');
    return;
  }
  if (pw !== validPw) {
    console.log(`${pw}는 올바르지 않은 비밀번호입니다.`);
    res.redirect('/admin');
    return;
  }
  res.send('로그인 성공');
})

app.listen(port, () => console.log(`Port ${port} is listening!`));