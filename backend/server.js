
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

        req.auth = decoded;
        next();
    });
}

function requireStaff(req, res, next) {
    if (!req.auth || req.auth.user_type !== "staff" || !["admin", "faculty"].includes(req.auth.role)) {
        return res.status(403).json({ message: "Only authorized faculty or admin can perform this action." });
    }
    next();
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
                            { id: student.id, reg_no: student.reg_no, user_type: "student" },
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
                    reg_no: student.reg_no,
                    user_type: "student"
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
// ONE-TIME ADMIN SETUP
// Add ADMIN_SETUP_KEY to backend/.env before using this route.
// This route works only while no admin account exists.
// ==============================
app.post("/staff/setup-admin", async (req, res) => {
    const { setup_key, username, password } = req.body;
    if (!process.env.ADMIN_SETUP_KEY || setup_key !== process.env.ADMIN_SETUP_KEY) {
        return res.status(403).json({ message: "Invalid setup key." });
    }
    if (!username || !password || String(password).length < 8) {
        return res.status(400).json({ message: "Username and a password of at least 8 characters are required." });
    }
    db.query("SELECT id FROM staff_users WHERE role = 'admin' LIMIT 1", async (checkErr, rows) => {
        if (checkErr) return res.status(500).json({ message: "Could not check admin setup. Run the SQL migration first." });
        if (rows.length) return res.status(409).json({ message: "An admin already exists; setup is closed." });
        try {
            const passwordHash = await bcrypt.hash(password, 12);
            db.query("INSERT INTO staff_users (username, password_hash, role) VALUES (?, ?, 'admin')", [String(username).trim(), passwordHash], (insertErr, result) => {
                if (insertErr) {
                    console.error("Admin setup error:", insertErr.message);
                    return res.status(500).json({ message: "Could not create admin. The username may already exist." });
                }
                return res.status(201).json({ message: "Admin account created. Log in using /staff/login.", id: result.insertId });
            });
        } catch (error) {
            return res.status(500).json({ message: "Could not create admin account." });
        }
    });
});

// ==============================
// STAFF LOGIN (ADMIN / FACULTY)
// ==============================
app.post("/staff/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password are required." });
    db.query("SELECT id, username, password_hash, role FROM staff_users WHERE username = ?", [String(username).trim()], async (err, rows) => {
        if (err) {
            console.error("Staff login error:", err.message);
            return res.status(500).json({ message: "Could not log in staff account. Run the SQL migration first." });
        }
        if (!rows.length) return res.status(401).json({ message: "Invalid username or password." });
        try {
            const staff = rows[0];
            const valid = await bcrypt.compare(password, staff.password_hash);
            if (!valid) return res.status(401).json({ message: "Invalid username or password." });
            const token = jwt.sign({ id: staff.id, username: staff.username, role: staff.role, user_type: "staff" }, SECRET_KEY, { expiresIn: "8h" });
            return res.json({ message: "Staff login successful.", token, staff: { id: staff.id, username: staff.username, role: staff.role } });
        } catch (error) {
            return res.status(500).json({ message: "An error occurred during staff login." });
        }
    });
});

// ADMIN ONLY: create a faculty account.
app.post("/staff/faculty", authenticateToken, requireStaff, (req, res) => {
    if (req.auth.role !== "admin") return res.status(403).json({ message: "Only admins can create faculty accounts." });
    const { username, password } = req.body;
    if (!username || !password || String(password).length < 8) return res.status(400).json({ message: "Username and a password of at least 8 characters are required." });
    bcrypt.hash(password, 12).then((passwordHash) => {
        db.query("INSERT INTO staff_users (username, password_hash, role) VALUES (?, ?, 'faculty')", [String(username).trim(), passwordHash], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "That username already exists." });
                console.error("Faculty creation error:", err.message);
                return res.status(500).json({ message: "Could not create faculty account." });
            }
            return res.status(201).json({ message: "Faculty account created.", id: result.insertId, username: String(username).trim(), role: "faculty" });
        });
    }).catch(() => res.status(500).json({ message: "Could not create faculty account." }));
});

// STAFF: list students so faculty can select the correct student ID.
app.get("/students", authenticateToken, requireStaff, (req, res) => {
    db.query("SELECT id, reg_no, name, year, section, semester FROM students ORDER BY name", (err, rows) => {
        if (err) return res.status(500).json({ message: "Could not retrieve students." });
        return res.json(rows);
    });
});

// ==============================
// STAFF ONLY: RECORD OR CORRECT ONE CLASS
// One class per student, subject, and date. Cancelled classes are excluded from totals.
// ==============================
app.post("/attendance", authenticateToken, requireStaff, (req, res) => {
    const studentId = Number(req.body.student_id);
    const subjectName = typeof req.body.subject_name === "string" ? req.body.subject_name.trim() : "";
    const classDate = typeof req.body.class_date === "string" ? req.body.class_date : "";
    const status = typeof req.body.status === "string" ? req.body.status.toLowerCase() : "";
    if (!Number.isInteger(studentId) || studentId <= 0 || !subjectName || !/^\d{4}-\d{2}-\d{2}$/.test(classDate) || !["present", "absent", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Provide a valid student_id, subject_name, class_date (YYYY-MM-DD), and status (present, absent, or cancelled)." });
    }
    const findExisting = "SELECT id, status FROM attendance_history WHERE student_id = ? AND subject_name = ? AND class_date = ?";
    db.query(findExisting, [studentId, subjectName, classDate], (findErr, oldRows) => {
        if (findErr) {
            console.error("Attendance history lookup error:", findErr.message);
            return res.status(500).json({ message: "Could not access attendance history. Run the SQL migration first." });
        }
        const oldStatus = oldRows.length ? oldRows[0].status : null;
        const oldCounted = oldStatus && oldStatus !== "cancelled" ? 1 : 0;
        const newCounted = status !== "cancelled" ? 1 : 0;
        const oldPresent = oldStatus === "present" ? 1 : 0;
        const newPresent = status === "present" ? 1 : 0;
        const totalDelta = newCounted - oldCounted;
        const presentDelta = newPresent - oldPresent;
        const saveHistory = () => {
            const historySql = `INSERT INTO attendance_history (student_id, subject_name, class_date, status, marked_by)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by = VALUES(marked_by), updated_at = CURRENT_TIMESTAMP`;
            db.query(historySql, [studentId, subjectName, classDate, status, req.auth.id], (historyErr) => {
                if (historyErr) {
                    console.error("Attendance history save error:", historyErr.message);
                    return res.status(500).json({ message: "Could not save class attendance." });
                }
                return res.json({ message: oldRows.length ? "Attendance record updated." : "Attendance recorded.", student_id: studentId, subject_name: subjectName, class_date: classDate, status });
            });
        };
        if (totalDelta === 0 && presentDelta === 0) return saveHistory();
        const aggregateSql = `INSERT INTO attendance (student_id, subject_name, present_count, total_classes)
            VALUES (?, ?, GREATEST(0, ?), GREATEST(0, ?))
            ON DUPLICATE KEY UPDATE present_count = GREATEST(0, present_count + ?), total_classes = GREATEST(0, total_classes + ?)`;
        // For a new class, insert its deltas. For a correction, update existing totals by the difference.
        const params = oldRows.length
            ? [studentId, subjectName, Math.max(0, presentDelta), Math.max(0, totalDelta), presentDelta, totalDelta]
            : [studentId, subjectName, Math.max(0, newPresent), Math.max(0, newCounted), presentDelta, totalDelta];
        db.query(aggregateSql, params, (aggErr) => {
            if (aggErr) {
                console.error("Attendance aggregate update error:", aggErr.message);
                return res.status(500).json({ message: "Could not update attendance totals." });
            }
            saveHistory();
        });
    });
});

// STUDENT: view own subject totals. STAFF: may view any student's totals.
app.get("/attendance/:student_id", authenticateToken, (req, res) => {
    const requestedStudentId = Number(req.params.student_id);
    if (!Number.isInteger(requestedStudentId) || requestedStudentId <= 0) return res.status(400).json({ message: "Invalid student ID." });
    if (req.auth.user_type !== "staff" && requestedStudentId !== Number(req.auth.id)) return res.status(403).json({ message: "You can only view your own attendance." });
    if (req.auth.user_type === "staff" && !["admin", "faculty"].includes(req.auth.role)) return res.status(403).json({ message: "Not authorized." });
    db.query("SELECT subject_name, present_count, total_classes FROM attendance WHERE student_id = ? ORDER BY subject_name", [requestedStudentId], (err, rows) => {
        if (err) return res.status(500).json({ message: "Could not retrieve attendance." });
        return res.json(rows);
    });
});

// STUDENT: view own date-wise history. STAFF: view any student's history.
app.get("/attendance/:student_id/history", authenticateToken, (req, res) => {
    const requestedStudentId = Number(req.params.student_id);
    if (!Number.isInteger(requestedStudentId) || requestedStudentId <= 0) return res.status(400).json({ message: "Invalid student ID." });
    if (req.auth.user_type !== "staff" && requestedStudentId !== Number(req.auth.id)) return res.status(403).json({ message: "You can only view your own attendance history." });
    if (req.auth.user_type === "staff" && !["admin", "faculty"].includes(req.auth.role)) return res.status(403).json({ message: "Not authorized." });
    const query = `SELECT h.id, h.subject_name, DATE_FORMAT(h.class_date, '%Y-%m-%d') AS class_date, h.status, s.name AS marked_by_name
        FROM attendance_history h LEFT JOIN staff_users s ON s.id = h.marked_by
        WHERE h.student_id = ? ORDER BY h.class_date DESC, h.subject_name ASC`;
    db.query(query, [requestedStudentId], (err, rows) => {
        if (err) return res.status(500).json({ message: "Could not retrieve attendance history." });
        return res.json(rows);
    });
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
