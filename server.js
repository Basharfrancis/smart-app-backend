const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('ok')
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register',(req, res) => {register.handleRegister(req,res, db, bcrypt)})

app.get('/profile/:id',(req, res)=>{profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

const PORT = process.env.PORT
app.listen(PORT || 7979, ()=> {
  console.log(`app is running on port ${PORT}`);
})
// console.log(process.env)
