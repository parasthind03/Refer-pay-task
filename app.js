require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {connectDB} = require('./utils/db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/', require('./router'))

connectDB()

app.listen(process.env.PORT, () => {
  console.log('Server running...');
})