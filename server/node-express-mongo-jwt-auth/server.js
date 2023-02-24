const express = require('express');
const connectDB = require('./config/db');
const PORT = 5000;

// initialize express app
const app = express();

// connect to database
connectDB();

// middleware to receive raw/json data in req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get request on home URL
app.get('/', (req, res) => { res.status(200).json({ mesage: "Welcome to nemja-API" }) });

// routes
app.use('/', require('./routes/user/userRoutes'));
app.use('/todos', require('./routes/todo/todoRoutes'));

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
