const express = require('express');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();
require('./utils/db');
const app = express();
app.use(express.json()); // for parsing application/json

app.use('/api/auth',authRouter);


const PORT  = process.env.PORT;
app.listen(PORT, ()=>{
  console.log(`server is running at http://localhost:${PORT}`);
});