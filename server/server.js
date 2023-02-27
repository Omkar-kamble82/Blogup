require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes  = require('./routes/blogs')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())
const allowedOrigins = [
    process.env.CORS_ORIGIN,
    process.env.VITE_USER_SIGNUP,
    process.env.VITE_USER_LOGIN,
    process.env.VITE_SERVER_ID,
    process.env.CORS_SEND,
    process.env.FRONTEND,
]

app.use(
    cors({
        origin: allowedOrigins
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