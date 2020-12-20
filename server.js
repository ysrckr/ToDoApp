const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const mainRouter = require('./routes/mainRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', mainRouter)

const port = process.env.PORT || 5000

app.listen(port, console.log('app is running'))
