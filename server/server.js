require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes  = require('./routes/blogs')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: (origin, callback) => {
            if (process.env.CORS_ORIGIN.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        optionsSuccessStatus: 200
    })
)

app.use('/api/blogs', blogRoutes)
app.use('/api/user', userRoutes)

mongoose.set('strictQuery', true).connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
}) 