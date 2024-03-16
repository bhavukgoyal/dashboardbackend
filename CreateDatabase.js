const mongoose = require('mongoose');
const Data = require('./Data.js');
const DataModel = require('./Model.js');

const DBURL = 'mongodb+srv://bhavukgoyal:mymongo138@cluster0.bt4vwxx.mongodb.net/dashboard';
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    await DataModel.deleteMany({});
    // console.log(connection)
    await DataModel.insertMany(Data)
    await mongoose.disconnect();
}
refreshAll()