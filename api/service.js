const express = require('express');
const mongoose = require('mongoose')
const sanphamRoute = require('../routes/sanphamRoute')
const userRoute = require('../routes/userRoute')

const app = express();
const PORT = process.env.PORT || 3000;

//kết nối đến mongodb
mongoose.connect('mongodb://localhost:27017/asm',
 { useNewUrlParser: true, useUnifiedTopology: true })
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open',()=>console.log('ket noi thanh cong'))

 app.use('/', sanphamRoute)
 app.use(express.json(), userRoute);
 app.listen(PORT, () => console.log(`Server started on port ${PORT}`))