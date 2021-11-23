const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.urlencoded());
app.use(express.json());  
app.use(cors());

app.post('/login', (req, res) => {
  console.log(JSON.stringify(req.body))
  if(req.body.username === 'email@test.com' && req.body.password === 'test123') {
    res.send({
      success: true,
      token: 'test123'
    });
  } else {
    res.send({
      success: false,
      errorMessage: 'The username or password is incorrect.'
    });
  }
 
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));