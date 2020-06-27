const dotenv = require('dotenv');

dotenv.config()

module.exports = {
    MONGO_URI: process.env.APP_MONGO_URI,
    SECRET: process.env.APP_SECRET
}