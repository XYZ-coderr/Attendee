
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "attendee_secret_key";

app.use(cors());
app.use(express.json());

// Verify the JWT sent by the logged-in student.
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ message: "Please log in to continue." });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Your session has expired. Please log in again." });
        }

        req.student = decoded;
        next();
    });
}

// ==============================
// HOME ROUTE
// ==============================
app.get("/", (req, res) => {
    res.send("🚀 Attendee Backend Running Successfully!");
});

// ==============================
// STUDENT SIGNUP API
// ==============================
app.post("/signup", async (req, res) => {
    try {
        const {
            reg_no,
            name,
            year,
            section,
            semester,
            password
        } = req.body;

        if (
            !reg_no || !name || !year || !section ||
            !semester || !password
        ) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const semesterNumber = Number(semester);
        const yearNumber = Number(year);

        if (
            !Number.isInteger(semesterNumber) ||
            semesterNumber < 1 ||
            semesterNumber > 8
        ) {
            return res.status(400).json({
                message: "Semester must be between 1 and 8."
            });
        }

        const checkQuery =
            "SELECT id FROM students WHERE reg_no = ?";

        db.query(checkQuery, [reg_no], async (err, result) => {
            if (err) {
                console.error("Signup check error:", err.message);

                return res.status(500).json({
                    message: "Database error while checking registration number."
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: "Registration Number already exists."
                });
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                const insertQuery = `
                    INSERT INTO students
                    (reg_no, name, year, section, semester, password)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    insertQuery,
                    [
                        reg_no,
                        name,
                        yearNumber,
                        section,
                        semesterNumber,
                        hashedPassword
                    ],
                    (insertErr, insertResult) => {
                        if (insertErr) {
                            console.error(
                                "Signup insert error:",
                                insertErr.message
                            );

                            return res.status(500).json({
                                message: "Could not register student."
                            });
                        }

                        const student = {
                            id: insertResult.insertId,
                            reg_no,
                            name,
                            year: yearNumber,
                            section,
                            semester: semesterNumber
                        };
                        const token = jwt.sign(
                            { id: student.id, reg_no: student.reg_no },
                            SECRET_KEY,
                            { expiresIn: "1h" }
                        );

                        return res.status(201).json({
                            message: "Student Registered Successfully!",
                            token,
                            student
                        });
                    }
                );
            } catch (hashError) {
                console.error("Password hashing error:", hashError.message);

                return res.status(500).json({
                    message: "Could not process password."
                });
            }
        });
    } catch (error) {
        console.error("Signup error:", error.message);

        return res.status(500).json({
            message: "An unexpected error occurred."
        });
    }
});

// ==============================
// STUDENT LOGIN API
// ==============================
app.post("/login", (req, res) => {
    const { reg_no, password } = req.body;

    if (!reg_no || !password) {
        return res.status(400).json({
            message: "Please enter Registration Number and Password."
        });
    }

    const query = `
        SELECT id, reg_no, name, year, section, semester, password
        FROM students
        WHERE reg_no = ?
    `;

    db.query(query, [reg_no], async (err, result) => {
        if (err) {
            console.error("Login database error:", err.message);

            return res.status(500).json({
                message: "Database error while logging in."
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        try {
            const student = result[0];

            const passwordMatches = await bcrypt.compare(
                password,
                student.password
            );

            if (!passwordMatches) {
                return res.status(401).json({
                    message: "Invalid Password."
                });
            }

            const token = jwt.sign(
                {
                    id: student.id,
                    reg_no: student.reg_no
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login Successful",
                token,
                student: {
                    id: student.id,
                    reg_no: student.reg_no,
                    name: student.name,
                    year: student.year,
                    section: student.section,
                    semester: student.semester
                }
            });
        } catch (error) {
            console.error("Login error:", error.message);

            return res.status(500).json({
                message: "An error occurred during login."
            });
        }
    });
});

// ==============================
// ATTENDANCE API - SAVE ATTENDANCE
// ==============================
app.post("/attendance", authenticateToken, (req, res) => {
    const { subject_name, status } = req.body;

    // Never trust a student ID supplied by the browser. Use the verified token.
    const studentId = Number(req.student.id);
    const subjectName =
        typeof subject_name === "string" ? subject_name.trim() : "";

    if (
        !Number.isInteger(studentId) ||
        studentId <= 0 ||
        !subjectName ||
        !["present", "absent"].includes(status)
    ) {
        return res.status(400).json({
            message: "Invalid attendance details."
        });
    }

    const presentCount = status === "present" ? 1 : 0;

    const query = `
        INSERT INTO attendance
            (student_id, subject_name, present_count, total_classes)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE
            present_count = present_count + VALUES(present_count),
            total_classes = total_classes + 1
    `;

    db.query(
        query,
        [studentId, subjectName, presentCount],
        (err) => {
            if (err) {
                console.error("Attendance save error:", err.message);

                return res.status(500).json({
                    message: "Could not save attendance."
                });
            }

            return res.status(200).json({
                message: "Attendance saved successfully."
            });
        }
    );
});

// ==============================
// ATTENDANCE API - GET ATTENDANCE
// ==============================
app.get("/attendance/:student_id", authenticateToken, (req, res) => {
    const requestedStudentId = Number(req.params.student_id);
    const studentId = Number(req.student.id);

    if (requestedStudentId !== studentId) {
        return res.status(403).json({ message: "You can only view your own attendance." });
    }

    if (!Number.isInteger(studentId) || studentId <= 0) {
        return res.status(400).json({
            message: "Invalid student ID."
        });
    }

    const query = `
        SELECT subject_name, present_count, total_classes
        FROM attendance
        WHERE student_id = ?
        ORDER BY subject_name
    `;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error("Attendance retrieval error:", err.message);

            return res.status(500).json({
                message: "Could not retrieve attendance."
            });
        }

        return res.status(200).json(results);
    });
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
