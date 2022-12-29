require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

mongoose.set('strictQuery', true);


const PORT = process.env.PORT

/** Express app */
const app = express()



/** Middleware */
app.use(express.json())
app.use((req, re, next) => {
    console.log(req.path, req.method)
    next()
})


/** Routes */
app.use('/api/workouts', workoutRoutes)


/** Connect to DB */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        /** Listen for requests */
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT} ( http://localhost:${PORT} ) `);
        })
        
    })
    .then(error => console.log(error))


