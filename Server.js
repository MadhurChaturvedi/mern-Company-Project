const express = require('express')
const dotenv = require('dotenv').config()
const TaskRouter = require('./routes/taskRoutes.js')
var colors = require('@colors/colors');
// const colors = require('colors')
var bodyParser = require('body-parser');
const connectDB = require('./db/db.js')
const app = express()
const { errorHandler } = require('./middleware/ErrorMiddleware.js')
const userRouter = require('./routes/userRoutes.js')
const cors = require('cors')

// Configure CORS
app.use(cors({
    origin: ["https://task-manager-frontend-six-ruby.vercel.app"], // Array for allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Ensure preflight requests are handled
app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();
const PORT = process.env.PORT || 8080


app.use('/api/tasks', TaskRouter)
app.use('/api/user', userRouter)
app.use(errorHandler)

// Test Api
app.get('/Test_api_Task', (req, res) => {
    res.send("Backend Application is working")
})

app.listen(PORT, () => {
    console.log(`server is running on port https://localhost:${PORT} 👾`.yellow);
})
