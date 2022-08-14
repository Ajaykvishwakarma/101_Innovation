const mongoose = require('mongoose')
const mongoDB = "mongodb+srv://innovation:innovation@cluster0.rbbqzhf.mongodb.net/?retryWrites=true&w=majority";

module.exports = ()=>mongoose.connect(mongoDB)