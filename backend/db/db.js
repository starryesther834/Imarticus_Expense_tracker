const mongoose = require('mongoose')

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB Connected')
    } catch (error) {
        console.log('DB Connection Error:', error)
    }
}

module.exports = {db}

// module.exports = () => {
//     const connectionParams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     };
//     try {
//         mongoose.connect(process.env.MONGO_URL,connectionParams);
//         console.log("Connected to database successfully");
//     } catch (error) {
//         console.log(error);
//         console.log("Could not connect to Database");
//     }
// }

//allthis above