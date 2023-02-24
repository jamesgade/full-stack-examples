const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const MONGO_URI = "mongodb://127.0.0.1:27017/nemja";

const connectDB = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error) => {
        if (error) {
            console.log('ERROR CONNECTING TO DB : ', error)
        } else {
            console.log('CONNECTED TO DB')
        }
    });
}

module.exports = connectDB;
