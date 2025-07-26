// imports
// import mongoose from 'mongoose';

// // const dbName = 'todo-list-db';
// const dbName = 'test';

// (async () => {
//     try {
//         await mongoose.connect(
//             process.env.MONGODB_URL + '/' + dbName
//             , { useNewUrlParser: true });
//         console.log('connected successfuly');
//     }
//     catch (e) {
//         console.log(e);
//     }
// })();


import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const dbName = 'todoapp'; // Or your actual DB name

(async () => {
    try {
        const mongoURL = process.env.MONGODB_URL;

        if (!mongoURL) {
            throw new Error('❌ MONGODB_URL is not defined in .env file');
        }

        await mongoose.connect(`${mongoURL}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB successfully');
    } catch (e) {
        console.error('❌ MongoDB connection error:', e.message);
    }
})();
