
require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("./db");

async function createAdmin() {
    const username = "admin";

    // Replace this with a strong password of your choice.
    const password = "Numan@0786";

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO staff_users (username, password_hash, role)
            VALUES (?, ?, 'admin')
        `;

        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error("Admin creation failed:", err.message);
            } else {
                console.log("Admin account created successfully!");
                console.log("Username: admin");
                console.log("Use the password you set in create-admin.js.");
            }

            db.end();
        });
    } catch (error) {
        console.error("Error:", error.message);
        db.end();
    }
}

createAdmin();
