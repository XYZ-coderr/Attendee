/* =====================================================
   SUBJECTS
===================================================== */

const subjectsBySemester = {

    1: [
        "Mathematics I",
        "Physics",
        "Programming in C",
        "Engineering Graphics",
        "Communication Skills"
    ],

    2: [
        "Mathematics II",
        "Chemistry",
        "Data Structures",
        "Digital Electronics",
        "Environmental Studies"
    ],

    3: [
        "Discrete Mathematics",
        "Object Oriented Programming",
        "Database Management System",
        "Computer Organization",
        "Operating System"
    ],

    4: [
        "Computer Networks",
        "Design and Analysis of Algorithms",
        "Software Engineering",
        "Theory of Computation",
        "Web Development"
    ],

    5: [
        "Cyber Security",
        "Cryptography",
        "Network Security",
        "Cloud Computing",
        "Machine Learning"
    ],

    6: [
        "Ethical Hacking",
        "Digital Forensics",
        "Cyber Law",
        "Artificial Intelligence",
        "Information Security"
    ],

    7: [
        "Advanced Cyber Security",
        "Security Operations",
        "Penetration Testing",
        "Incident Response",
        "Major Project I"
    ],

    8: [
        "Major Project II",
        "Cyber Security Management",
        "Security Audit",
        "Research Methodology",
        "Industrial Training"
    ]

};


/* =====================================================
   DEFAULT ATTENDANCE
===================================================== */

const defaultAttendance = {

    "Mathematics I": {
        present: 18,
        total: 20
    },

    "Physics": {
        present: 15,
        total: 20
    },

    "Programming in C": {
        present: 22,
        total: 25
    },

    "Engineering Graphics": {
        present: 17,
        total: 20
    },

    "Communication Skills": {
        present: 19,
        total: 22
    }

};


/* =====================================================
   ROLE SELECTION
===================================================== */

function chooseStudentRole() {
    const chooser = document.getElementById("roleChooser");
    const welcome = document.getElementById("welcomeSection");
    const staff = document.getElementById("staffLoginSection");
    if (chooser) chooser.hidden = true;
    if (staff) staff.hidden = true;
    if (welcome) welcome.style.display = "block";
    document.getElementById("robotMessage").textContent = "Welcome, student. Ready to check your attendance?";
    setRobotState("idle");
}

function chooseStaffRole() {
    const chooser = document.getElementById("roleChooser");
    const welcome = document.getElementById("welcomeSection");
    const staff = document.getElementById("staffLoginSection");
    if (chooser) chooser.hidden = true;
    if (welcome) welcome.style.display = "none";
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("signupForm").classList.remove("active");
    if (staff) staff.hidden = false;
    document.getElementById("robotMessage").textContent = "Staff access only. Please sign in.";
    setRobotState("idle");
}

function backToRoleChooser() {
    const chooser = document.getElementById("roleChooser");
    const welcome = document.getElementById("welcomeSection");
    const staff = document.getElementById("staffLoginSection");
    if (chooser) chooser.hidden = false;
    if (welcome) welcome.style.display = "none";
    if (staff) staff.hidden = true;
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("signupForm").classList.remove("active");
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("signupTab").classList.remove("active");
    document.getElementById("robotMessage").textContent = "Beep boop. Who goes there?";
    setRobotState("idle");
}

/* =====================================================
   SHOW LOGIN
===================================================== */

function showLogin() {

    document
        .getElementById("welcomeSection")
        .style.display = "none";


    document
        .getElementById("loginForm")
        .classList.add("active");


    document
        .getElementById("signupForm")
        .classList.remove("active");


    document
        .getElementById("loginTab")
        .classList.add("active");


    document
        .getElementById("signupTab")
        .classList.remove("active");


    document
        .getElementById("robotMessage")
        .textContent =
        "Beep boop. Enter your registration number.";


    setRobotState("idle");

}


/* =====================================================
   SHOW SIGN UP
===================================================== */

function showSignup() {

    document
        .getElementById("welcomeSection")
        .style.display = "none";


    document
        .getElementById("loginForm")
        .classList.remove("active");


    document
        .getElementById("signupForm")
        .classList.add("active");


    document
        .getElementById("loginTab")
        .classList.remove("active");


    document
        .getElementById("signupTab")
        .classList.add("active");


    document
        .getElementById("robotMessage")
        .textContent =
        "Beep boop. Who goes there?";


    setRobotState("idle");

}


/* =====================================================
   BACK
===================================================== */

function backToWelcome() {

    document
        .getElementById("welcomeSection")
        .style.display = "block";


    document
        .getElementById("loginForm")
        .classList.remove("active");


    document
        .getElementById("signupForm")
        .classList.remove("active");


    document
        .getElementById("loginTab")
        .classList.remove("active");


    document
        .getElementById("signupTab")
        .classList.remove("active");


    document
        .getElementById("robotMessage")
        .textContent =
        "Beep boop. Who goes there?";


    setRobotState("idle");

}


/* =====================================================
   ROBOT STATE
===================================================== */

function setRobotState(state) {

    const robot =
        document.getElementById("robot");


    robot.classList.remove(
        "typing",
        "password-mode",
        "strong",
        "success",
        "error"
    );


    if (state !== "idle") {

        robot.classList.add(state);

    }

}


/* =====================================================
   NAME INTERACTION
===================================================== */

document
    .getElementById("signupName")
    .addEventListener(
        "input",
        function() {

            const name =
                this.value.trim();


            if (!name) {

                document
                    .getElementById(
                        "robotMessage"
                    )
                    .textContent =
                    "Beep boop. Who goes there?";

                setRobotState("idle");

                return;

            }


            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                `Access granted. Welcome, ${name}.`;


            setRobotState("success");

        }
    );


/* =====================================================
   SIGNUP REGISTRATION NUMBER
===================================================== */

document
    .getElementById("signupRegNo")
    .addEventListener(
        "input",
        function() {

            if (
                this.value.trim()
            ) {

                document
                    .getElementById(
                        "robotMessage"
                    )
                    .textContent =
                    "Nice. Registration number received.";

                setRobotState("typing");

            }

        }
    );


/* =====================================================
   LOGIN REGISTRATION NUMBER
===================================================== */

document
    .getElementById("loginRegNo")
    .addEventListener(
        "input",
        function() {

            const value =
                this.value.trim();


            if (!value) {

                document
                    .getElementById(
                        "robotMessage"
                    )
                    .textContent =
                    "Beep boop. Enter your registration number.";

                setRobotState("idle");

                return;

            }


            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                "Got it. Now enter your password.";


            setRobotState("typing");

        }
    );


/* =====================================================
   LOGIN PASSWORD
===================================================== */

document
    .getElementById("loginPassword")
    .addEventListener(
        "focus",
        function() {

            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                "A secret? Say no more. 🤫";


            setRobotState(
                "password-mode"
            );

        }
    );


document
    .getElementById("loginPassword")
    .addEventListener(
        "input",
        function() {

            if (!this.value) {

                document
                    .getElementById(
                        "robotMessage"
                    )
                    .textContent =
                    "A secret? Say no more. 🤫";

                return;

            }


            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                "Password hidden. Looking good.";


            setRobotState(
                "password-mode"
            );

        }
    );


/* =====================================================
   SIGNUP PASSWORD
===================================================== */

document
    .getElementById("signupPassword")
    .addEventListener(
        "focus",
        function() {

            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                "A secret? Say no more. 🤫";


            setRobotState(
                "password-mode"
            );

        }
    );


document
    .getElementById("signupPassword")
    .addEventListener(
        "input",
        checkPassword
    );


/* =====================================================
   PASSWORD CHECK
===================================================== */

function checkPassword() {

    const password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;


    const lengthOK =
        password.length >= 8;


    const upperOK =
        /[A-Z]/.test(password);


    const numberOK =
        /[0-9]/.test(password);


    const specialOK =
        /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];']/
            .test(password);


    updateRule(
        "ruleLength",
        lengthOK,
        "At least 8 characters"
    );


    updateRule(
        "ruleUpper",
        upperOK,
        "One uppercase letter (A-Z)"
    );


    updateRule(
        "ruleNumber",
        numberOK,
        "One number (0-9)"
    );


    updateRule(
        "ruleSpecial",
        specialOK,
        "One special character (!@#$%^&*)"
    );


    let score = 0;


    if (lengthOK) score++;

    if (upperOK) score++;

    if (numberOK) score++;

    if (specialOK) score++;


    const strengthText =
        document
            .getElementById(
                "strengthText"
            );


    const strengthFill =
        document
            .getElementById(
                "strengthFill"
            );


    if (!password) {

        strengthText.textContent =
            "Not entered";

        strengthText.style.color =
            "#777";

        strengthFill.style.width =
            "0%";

        document
            .getElementById(
                "robotMessage"
            )
            .textContent =
            "Create a strong password.";


        setRobotState("idle");

    }


    else if (score <= 2) {

        strengthText.textContent =
            "Weak";

        strengthText.style.color =
            "#dc2626";

        strengthFill.style.width =
            "25%";

        strengthFill.style.background =
            "#dc2626";


        document
            .getElementById(
                "robotMessage"
            )
            .textContent =
            "Password needs more protection.";


        setRobotState(
            "password-mode"
        );

    }


    else if (score === 3) {

        strengthText.textContent =
            "Medium";

        strengthText.style.color =
            "#d97706";

        strengthFill.style.width =
            "70%";

        strengthFill.style.background =
            "#d97706";


        document
            .getElementById(
                "robotMessage"
            )
            .textContent =
            "Almost there. Add the missing requirement.";


        setRobotState(
            "password-mode"
        );

    }


    else {

        strengthText.textContent =
            "Strong ✓";

        strengthText.style.color =
            "#15803d";

        strengthFill.style.width =
            "100%";

        strengthFill.style.background =
            "#15803d";


        document
            .getElementById(
                "robotMessage"
            )
            .textContent =
            "Strong password. Nice! ✓";


        setRobotState("strong");

    }


    checkSignupButton();

}


/* =====================================================
   UPDATE PASSWORD RULE
===================================================== */

function updateRule(
    id,
    valid,
    text
) {

    const rule =
        document
            .getElementById(id);


    if (valid) {

        rule.classList.add(
            "valid"
        );

        rule.textContent =
            "✓ " + text;

    }

    else {

        rule.classList.remove(
            "valid"
        );

        rule.textContent =
            "○ " + text;

    }

}


/* =====================================================
   CONFIRM PASSWORD
===================================================== */

document
    .getElementById("confirmPassword")
    .addEventListener(
        "input",
        checkSignupButton
    );


function checkSignupButton() {

    const password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;


    const confirmPassword =
        document
            .getElementById(
                "confirmPassword"
            )
            .value;


    const strongPassword =

        password.length >= 8 &&

        /[A-Z]/.test(password) &&

        /[0-9]/.test(password) &&

        /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];']/
            .test(password);


    const passwordsMatch =

        password.length > 0 &&

        password === confirmPassword;


    const message =
        document
            .getElementById(
                "confirmMessage"
            );


    if (!confirmPassword) {

        message.textContent = "";

    }

    else if (passwordsMatch) {

        message.textContent =
            "Passwords match ✓";

        message.style.color =
            "#15803d";

    }

    else {

        message.textContent =
            "Passwords do not match.";

        message.style.color =
            "#dc2626";

    }


    document
        .getElementById(
            "signupButton"
        )
        .disabled =
        !(
            strongPassword &&
            passwordsMatch
        );

}


/* =====================================================
   PASSWORD VISIBILITY
===================================================== */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (
        input.type === "password"
    ) {

        input.type = "text";

        button.textContent = "🙈";

    }

    else {

        input.type = "password";

        button.textContent = "👁";

    }

}


/* =====================================================
   LOGIN AND SIGNUP (BACKEND API)
===================================================== */

const API_BASE_URL = "http://localhost:5000";

function normalizeStudent(apiStudent) {
    return {
        id: apiStudent.id,
        regNo: apiStudent.reg_no,
        name: apiStudent.name,
        year: String(apiStudent.year),
        section: apiStudent.section,
        semester: String(apiStudent.semester)
    };
}

function createAttendanceForSemester(semester) {
    const subjects = subjectsBySemester[Number(semester)] || [];
    const attendance = {};

    // Attendance now comes from MySQL, so new subjects start at zero.
    subjects.forEach(function (subject) {
        attendance[subject] = { present: 0, total: 0 };
    });

    return attendance;
}

// Get this student's attendance from MySQL and convert it to the format
// already used by the dashboard.
async function loadAttendanceFromServer(student) {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
        `${API_BASE_URL}/attendance/${encodeURIComponent(student.id)}`,
        {
            headers: { "Authorization": `Bearer ${token || ""}` }
        }
    );
    const rows = await response.json();

    if (!response.ok) {
        throw new Error(rows.message || "Could not load attendance.");
    }

    const attendance = createAttendanceForSemester(student.semester);

    rows.forEach(function (row) {
        if (Object.prototype.hasOwnProperty.call(attendance, row.subject_name)) {
            attendance[row.subject_name] = {
                present: Number(row.present_count),
                total: Number(row.total_classes)
            };
        }
    });

    return attendance;
}

// LOGIN: check the student through the backend, not localStorage passwords.
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const regNo = document.getElementById("loginRegNo").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "Signing in...";
    message.style.color = "#777";

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reg_no: regNo, password: password })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message || "Login failed. Please try again.";
            message.style.color = "#dc2626";
            document.getElementById("robotMessage").textContent = data.message || "Access denied. Check your details.";
            setRobotState("error");
            return;
        }

        // Store the token before requesting protected attendance data.
        localStorage.setItem("authToken", data.token);
        const student = normalizeStudent(data.student);
        const attendance = await loadAttendanceFromServer(student);

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("student", JSON.stringify(student));
        localStorage.setItem("attendance", JSON.stringify(attendance));
        localStorage.setItem("attendance_" + student.regNo, JSON.stringify(attendance));

        message.textContent = "Access granted ✓";
        message.style.color = "#15803d";
        document.getElementById("robotMessage").textContent = `Access granted. Welcome, ${student.name}.`;
        setRobotState("success");

        setTimeout(function () {
            showDashboard();
        }, 900);
    } catch (error) {
        message.textContent = "Cannot connect to the server. Make sure the backend is running.";
        message.style.color = "#dc2626";
        document.getElementById("robotMessage").textContent = "Server connection failed. Please try again.";
        setRobotState("error");
        console.error("Login request failed:", error);
    }
});

// SIGNUP: register through the backend, which hashes the password in the database.
document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const regNo = document.getElementById("signupRegNo").value.trim();
    const name = document.getElementById("signupName").value.trim();
    const year = document.getElementById("signupYear").value;
    const section = document.getElementById("signupSection").value;
    const semester = document.getElementById("signupSemester").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");

    const strongPassword = password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];']/.test(password);

    if (!strongPassword) {
        message.textContent = "Please create a strong password.";
        message.style.color = "#dc2626";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "#dc2626";
        return;
    }

    if (!regNo || !name || !year || !section || !semester) {
        message.textContent = "Please fill all fields.";
        message.style.color = "#dc2626";
        return;
    }

    message.textContent = "Creating your account...";
    message.style.color = "#777";

    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reg_no: regNo,
                name: name,
                year: Number(year),
                section: section,
                semester: Number(semester),
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message || "Registration failed. Please try again.";
            message.style.color = "#dc2626";
            document.getElementById("robotMessage").textContent = data.message || "Could not create your account.";
            setRobotState("error");
            return;
        }

        // Signup now returns a JWT too; store it before loading protected attendance.
        localStorage.setItem("authToken", data.token);
        const student = normalizeStudent(data.student);
        const attendance = await loadAttendanceFromServer(student);

        // Save profile/session and attendance only after successful server registration.
        // Never save the user's plaintext password in localStorage.
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("student", JSON.stringify(student));
        localStorage.setItem("attendance", JSON.stringify(attendance));
        localStorage.setItem("attendance_" + student.regNo, JSON.stringify(attendance));

        message.textContent = "Account created successfully ✓";
        message.style.color = "#15803d";
        document.getElementById("robotMessage").textContent = `Access granted. Welcome, ${student.name}.`;
        setRobotState("success");

        setTimeout(function () {
            showDashboard();
        }, 900);
    } catch (error) {
        message.textContent = "Cannot connect to the server. Make sure the backend is running.";
        message.style.color = "#dc2626";
        document.getElementById("robotMessage").textContent = "Server connection failed. Please try again.";
        setRobotState("error");
        console.error("Signup request failed:", error);
    }
});


/* =====================================================
   SHOW DASHBOARD
===================================================== */

function showDashboard() {

    document
        .getElementById(
            "authPage"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "messPage"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "dashboardPage"
        )
        .classList.remove(
            "hidden"
        );


    loadDashboard();

}


/* =====================================================
   LOAD DASHBOARD
===================================================== */

function loadDashboard() {

    const studentData =
        localStorage.getItem(
            "student"
        );


    if (!studentData) return;


    const student =
        JSON.parse(
            studentData
        );


    document
        .getElementById(
            "studentName"
        )
        .textContent =
        student.name;


    document
        .getElementById(
            "studentReg"
        )
        .textContent =
        student.regNo;


    document
        .getElementById(
            "studentYear"
        )
        .textContent =
        student.year;


    document
        .getElementById(
            "studentSection"
        )
        .textContent =
        student.section;


    document
        .getElementById(
            "studentSemester"
        )
        .textContent =
        student.semester;


    loadSubjects();

}


/* =====================================================
   LOAD SUBJECTS
===================================================== */

function loadSubjects() {

    const student =
        JSON.parse(
            localStorage.getItem(
                "student"
            )
        );


    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendance"
            )
        );


    const subjectList =
        document
            .getElementById(
                "subjectList"
            );


    subjectList.innerHTML = "";


    const subjects =
        subjectsBySemester[
            student.semester
        ];


    subjects.forEach(
        function(subject) {


            const data =
                attendance[subject];


            const percentage =
                calculatePercentage(
                    data.present,
                    data.total
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "subject-card";


            card.onclick =
                function() {

                    openModal(
                        subject
                    );

                };


            card.innerHTML = `

                <div>

                    <div class="subject-name">

                        ${subject}

                    </div>

                    <div class="subject-details">

                        ${data.present}
                        /
                        ${data.total}

                        classes attended

                    </div>

                </div>

                <div
                    class="subject-percentage"
                    style="
                        color:
                        ${getAttendanceColor(
                            percentage
                        )}
                    "
                >

                    ${percentage}%

                </div>

            `;


            subjectList.appendChild(
                card
            );

        }
    );


    updateOverallAttendance();

}


/* =====================================================
   PERCENTAGE
===================================================== */

function calculatePercentage(
    present,
    total
) {

    if (total === 0) return 0;


    return Math.round(
        (present / total) * 100
    );

}


/* =====================================================
   ATTENDANCE COLOR
===================================================== */

function getAttendanceColor(
    percentage
) {

    if (percentage >= 75)
        return "#22c55e";


    if (percentage >= 65)
        return "#eab308";


    return "#ef4444";

}


/* =====================================================
   OVERALL
===================================================== */

function updateOverallAttendance() {

    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendance"
            )
        );


    let totalPresent = 0;

    let totalClasses = 0;


    Object.values(
        attendance
    ).forEach(
        function(data) {

            totalPresent +=
                data.present;

            totalClasses +=
                data.total;

        }
    );


    const percentage =
        calculatePercentage(
            totalPresent,
            totalClasses
        );


    document
        .getElementById(
            "overallPercentage"
        )
        .textContent =
        percentage + "%";


    document
        .getElementById(
            "overallCircle"
        )
        .style.borderColor =
        getAttendanceColor(
            percentage
        );


    const message =
        document
            .getElementById(
                "overallMessage"
            );


    if (percentage >= 75) {

        message.textContent =
            "Your attendance is good.";

    }

    else if (percentage >= 65) {

        message.textContent =
            "Your attendance is getting low.";

    }

    else {

        message.textContent =
            "Your attendance is below the required level.";

    }

}


/* =====================================================
   ATTENDANCE MODAL
===================================================== */

let currentSubject = null;


function openModal(subject) {

    currentSubject =
        subject;


    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendance"
            )
        );


    const data =
        attendance[subject];


    const percentage =
        calculatePercentage(
            data.present,
            data.total
        );


    document
        .getElementById(
            "modalSubject"
        )
        .textContent =
        subject;


    document
        .getElementById(
            "modalPresent"
        )
        .textContent =
        data.present;


    document
        .getElementById(
            "modalTotal"
        )
        .textContent =
        data.total;


    document
        .getElementById(
            "modalPercentage"
        )
        .textContent =
        percentage + "%";


    document
        .getElementById(
            "modalCircle"
        )
        .style.borderColor =
        getAttendanceColor(
            percentage
        );


    document
        .getElementById(
            "modalNeeded"
        )
        .textContent =
        calculateClassesNeeded(
            data.present,
            data.total
        );


    document
        .getElementById(
            "attendanceModal"
        )
        .style.display =
        "flex";

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    document
        .getElementById(
            "attendanceModal"
        )
        .style.display =
        "none";

}


/* =====================================================
   MARK ATTENDANCE
===================================================== */

async function markAttendance(status) {
    alert("Attendance can only be marked by authorized faculty or admin. Your attendance records are read-only here.");
}


/* =====================================================
   CLASSES NEEDED FOR 75%
===================================================== */

function calculateClassesNeeded(
    present,
    total
) {

    if (total === 0) return 0;


    if (
        (present / total) * 100 >= 75
    ) {

        return 0;

    }


    let needed = 0;


    while (
        (
            (present + needed) /
            (total + needed)
        ) * 100 < 75
    ) {

        needed++;

    }


    return needed;

}


/* =====================================================
   MESS
===================================================== */

function showMess() {

    document
        .getElementById(
            "dashboardPage"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "authPage"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "messPage"
        )
        .classList.remove(
            "hidden"
        );

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "student"
    );

    localStorage.removeItem("authToken");


    localStorage.removeItem(
        "attendance"
    );


    document
        .getElementById(
            "dashboardPage"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "messPage"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "authPage"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "loginForm"
        )
        .reset();


    document
        .getElementById(
            "signupForm"
        )
        .reset();


    document
        .getElementById(
            "strengthText"
        )
        .textContent =
        "Not entered";


    document
        .getElementById(
            "strengthFill"
        )
        .style.width =
        "0%";


    document
        .getElementById(
            "confirmMessage"
        )
        .textContent = "";


    document
        .getElementById(
            "signupButton"
        )
        .disabled =
        true;


    backToWelcome();

}


/* =====================================================
   CLOSE MODAL ON OUTSIDE CLICK
===================================================== */

window.onclick =
    function(event) {

        const modal =
            document.getElementById(
                "attendanceModal"
            );


        if (
            event.target === modal
        ) {

            closeModal();

        }

    };
    

/* =====================================================
   FACULTY / ADMIN LOGIN AND DASHBOARD
===================================================== */
(function () {
    const API_BASE = "http://localhost:5000";
    const byId = (id) => document.getElementById(id);

    function showStaffMessage(text, isError = false) {
        const node = byId("staffDashboardMessage");
        if (!node) return;
        node.textContent = text;
        node.classList.toggle("error", isError);
    }

    function getStaffToken() {
        return localStorage.getItem("staffToken");
    }

    async function staffRequest(path, options = {}) {
        const response = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getStaffToken()}`,
                ...(options.headers || {})
            }
        });
        const text = await response.text();
        let data = {};
        if (text) {
            try { data = JSON.parse(text); }
            catch { throw new Error("The server returned an unexpected response. Check that the backend is running on port 5000."); }
        }
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("staffToken");
                localStorage.removeItem("staffUser");
            }
            throw new Error(data.message || `Request failed (${response.status}).`);
        }
        return data;
    }

    function initials(name) {
        return String(name || "A").trim().slice(0, 1).toUpperCase();
    }

    function showStaffDashboard(staff) {
        const authPage = byId("authPage");
        const dashboard = byId("staffDashboard");
        if (authPage) authPage.hidden = true;
        if (dashboard) dashboard.hidden = false;

        const username = staff.username || "Staff";
        const role = String(staff.role || "staff");
        const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
        if (byId("staffDisplayName")) byId("staffDisplayName").textContent = username;
        if (byId("staffDisplayRole")) byId("staffDisplayRole").textContent = roleLabel;
        if (byId("staffRoleStat")) byId("staffRoleStat").textContent = roleLabel;
        if (byId("staffWelcomeName")) byId("staffWelcomeName").textContent = `, ${username}`;
        if (byId("staffAvatar")) byId("staffAvatar").textContent = initials(username);
        if (byId("staffTopAvatar")) byId("staffTopAvatar").textContent = initials(username);
        loadStaffStudents();
    }

    async function loadStaffStudents() {
        const body = byId("staffStudentsBody");
        if (!body) return;
        body.innerHTML = '<tr><td colspan="5">Loading students…</td></tr>';
        showStaffMessage("");
        try {
            const students = await staffRequest("/students");
            if (!Array.isArray(students)) throw new Error("Student list response was not valid.");
            byId("staffStudentCount").textContent = students.length;
            if (students.length === 0) {
                body.innerHTML = '<tr><td colspan="5">No students are registered yet.</td></tr>';
                return;
            }
            body.innerHTML = "";
            students.forEach((student) => {
                const row = document.createElement("tr");
                row.dataset.search = `${student.name || ""} ${student.reg_no || ""}`.toLowerCase();
                const nameCell = document.createElement("td");
                nameCell.innerHTML = `<div class="staff-student-name"><span class="staff-student-avatar">${escapeHtml(initials(student.name))}</span><span><strong>${escapeHtml(student.name || "Unnamed student")}</strong><small>Student</small></span></div>`;
                const regCell = document.createElement("td");
                regCell.textContent = student.reg_no || "—";
                const yearCell = document.createElement("td");
                yearCell.textContent = `${student.year || "—"} / ${student.section || "—"}`;
                const semCell = document.createElement("td");
                semCell.textContent = student.semester || "—";
                const actionCell = document.createElement("td");
                const markButton = document.createElement("button");
                markButton.type = "button";
                markButton.className = "staff-mark-button";
                markButton.textContent = "Mark attendance";
                markButton.addEventListener("click", () => openMarkAttendance(student));
                actionCell.appendChild(markButton);
                row.append(nameCell, regCell, yearCell, semCell, actionCell);
                body.appendChild(row);
            });
        } catch (error) {
            body.innerHTML = '<tr><td colspan="5">Could not load student data.</td></tr>';
            showStaffMessage(error.message, true);
        }
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[char]);
    }

    function openMarkAttendance(student) {
        const subject = window.prompt(`Subject name for ${student.name} (${student.reg_no}):`);
        if (subject === null) return;
        if (!subject.trim()) {
            showStaffMessage("Enter a subject name before marking attendance.", true);
            return;
        }
        const date = window.prompt("Class date (YYYY-MM-DD):", new Date().toISOString().slice(0, 10));
        if (date === null) return;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            showStaffMessage("Enter the date in YYYY-MM-DD format.", true);
            return;
        }
        const status = window.prompt("Enter status: present, absent, or cancelled", "present");
        if (status === null) return;
        const normalizedStatus = status.trim().toLowerCase();
        if (!["present", "absent", "cancelled"].includes(normalizedStatus)) {
            showStaffMessage("Status must be present, absent, or cancelled.", true);
            return;
        }
        staffRequest("/attendance", {
            method: "POST",
            body: JSON.stringify({
                student_id: Number(student.id),
                subject_name: subject.trim(),
                class_date: date,
                status: normalizedStatus
            })
        }).then((result) => {
            showStaffMessage(result.message || `Attendance saved as ${normalizedStatus}.`);
            if (byId("staffHistoryCount")) byId("staffHistoryCount").textContent = "Updated";
        }).catch((error) => showStaffMessage(error.message, true));
    }

    function logoutStaff() {
        localStorage.removeItem("staffToken");
        localStorage.removeItem("staffUser");
        if (byId("staffDashboard")) byId("staffDashboard").hidden = true;
        if (byId("authPage")) byId("authPage").hidden = false;
        backToRoleChooser();
        if (byId("staffLoginForm")) byId("staffLoginForm").reset();
        if (byId("staffLoginMessage")) byId("staffLoginMessage").textContent = "";
    }

    document.addEventListener("DOMContentLoaded", function () {
        const staffForm = byId("staffLoginForm");
        if (staffForm) {
            staffForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                const username = byId("staffUsername").value.trim();
                const password = byId("staffPassword").value;
                const message = byId("staffLoginMessage");
                const button = staffForm.querySelector('button[type="submit"]');
                message.textContent = "Signing in…";
                message.classList.remove("error", "success");
                if (button) button.disabled = true;
                try {
                    const response = await fetch(`${API_BASE}/staff/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password })
                    });
                    const text = await response.text();
                    let data;
                    try { data = JSON.parse(text); }
                    catch { throw new Error("The backend returned HTML instead of JSON. Confirm the API is running at http://localhost:5000 and the route is /staff/login."); }
                    if (!response.ok) throw new Error(data.message || "Staff login failed.");
                    if (!data.token) throw new Error("Login response did not include an authentication token.");
                    localStorage.setItem("staffToken", data.token);
                    localStorage.setItem("staffUser", JSON.stringify(data.staff || { username, role: "staff" }));
                    message.textContent = "Login successful. Opening dashboard…";
                    message.classList.add("success");
                    showStaffDashboard(data.staff || { username, role: "staff" });
                } catch (error) {
                    message.textContent = error.message || "Unable to log in.";
                    message.classList.add("error");
                } finally {
                    if (button) button.disabled = false;
                }
            });
        }

        if (byId("staffLogoutButton")) byId("staffLogoutButton").addEventListener("click", logoutStaff);
        if (byId("refreshStaffDashboard")) byId("refreshStaffDashboard").addEventListener("click", loadStaffStudents);
        if (byId("staffStudentSearch")) byId("staffStudentSearch").addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            document.querySelectorAll("#staffStudentsBody tr[data-search]").forEach((row) => {
                row.hidden = !row.dataset.search.includes(query);
            });
        });
        document.querySelectorAll("[data-staff-view]").forEach((button) => button.addEventListener("click", function () {
            document.querySelectorAll("[data-staff-view]").forEach((item) => item.classList.toggle("active", item === button));
            const isStudents = button.dataset.staffView === "students";
            byId("staffPageTitle").textContent = isStudents ? "Students" : "Overview";
            byId("staffTableTitle").textContent = isStudents ? "All students" : "Students";
        }));

        const token = getStaffToken();
        const savedStaff = localStorage.getItem("staffUser");
        if (token && savedStaff) {
            try { showStaffDashboard(JSON.parse(savedStaff)); }
            catch { logoutStaff(); }
        }
    });
})();
