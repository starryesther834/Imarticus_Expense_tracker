const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

const jwt = require('jsonwebtoken'); // from gemini

// const connection = require("./db/db");   //this (only in app.js and db.js)
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())



//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
// readdirSync('./routes').map((route) => {
//     try {
//         const routePath = './routes/' + route;
//         console.log(`Loading route: ${routePath}`);
//         app.use('/api/v1', require(routePath));
//     } catch (error) {
//         console.error(`Error loading route ${route}:`, error);
//     }
// });

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//from gemini
// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

//from gemini
// Protected routes example:
app.get('/api/v1/protected-route', verifyToken, (req, res) => {
    // Access user data from req.user
    res.json({ message: 'Protected route accessed' });
  });

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()


