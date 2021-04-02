const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(mongoose.Error))
db.once('open', () => console.log('Connected Success!!'))

app.use(express.json())

const subscriberRouter = require('./routes/messsages')
app.use('/messsages', subscriberRouter)

app.listen(3000, () => console.log('Server is Started'))