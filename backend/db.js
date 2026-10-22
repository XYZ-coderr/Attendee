console.log("db.js is running...");
const mysql = require("mysql2");
require("dotenv").config();
console.log(process.env.DB_NAME);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

connection.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err.message);
        return;
    }

    console.log("✅ Connected to MySQL Database");
});

module.exports = connection;