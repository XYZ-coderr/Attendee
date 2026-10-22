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
   LOGIN
===================================================== */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const regNo =
                document
                    .getElementById(
                        "loginRegNo"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const message =
                document
                    .getElementById(
                        "loginMessage"
                    );


            const studentData =
                localStorage.getItem(
                    "student_" + regNo
                );


            if (!studentData) {

                message.textContent =
                    "Registration number not found.";

                message.style.color =
                    "#dc2626";


                document
                    .getElementById(
                        "robotMessage"
                    )
                    .textContent =
                    "Access denied. Student not found.";


                setRobotState("error");

                return;

            }


            const student =
                JSON.parse(
                    studentData
                );


            if (
                student.password !==
                password
            ) {

                message.textContent =
                    "Incorrect password.";

                message.style.color =
                    "#dc2626";


                document
                    .getElementById(
                        "robotMessage"
                    )
                    .textContent =
                    "Access denied. Check your password.";


                setRobotState("error");

                return;

            }


            message.textContent =
                "Access granted ✓";

            message.style.color =
                "#15803d";


            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                `Access granted. Welcome, ${student.name}.`;


            setRobotState("success");


            localStorage.setItem(
                "student",
                JSON.stringify(student)
            );


            const attendanceData =
                localStorage.getItem(
                    "attendance_" +
                    regNo
                );


            if (attendanceData) {

                localStorage.setItem(
                    "attendance",
                    attendanceData
                );

            }


            setTimeout(
                function() {

                    showDashboard();

                },
                900
            );

        }
    );


/* =====================================================
   SIGN UP
===================================================== */

document
    .getElementById("signupForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const regNo =
                document
                    .getElementById(
                        "signupRegNo"
                    )
                    .value
                    .trim();


            const name =
                document
                    .getElementById(
                        "signupName"
                    )
                    .value
                    .trim();


            const year =
                document
                    .getElementById(
                        "signupYear"
                    )
                    .value;


            const section =
                document
                    .getElementById(
                        "signupSection"
                    )
                    .value;


            const semester =
                document
                    .getElementById(
                        "signupSemester"
                    )
                    .value;


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


            const message =
                document
                    .getElementById(
                        "signupMessage"
                    );


            const strongPassword =

                password.length >= 8 &&

                /[A-Z]/.test(password) &&

                /[0-9]/.test(password) &&

                /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];']/
                    .test(password);


            if (!strongPassword) {

                message.textContent =
                    "Please create a strong password.";

                message.style.color =
                    "#dc2626";

                return;

            }


            if (
                password !==
                confirmPassword
            ) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color =
                    "#dc2626";

                return;

            }


            const existingStudent =
                localStorage.getItem(
                    "student_" + regNo
                );


            if (existingStudent) {

                message.textContent =
                    "Registration number already exists.";

                message.style.color =
                    "#dc2626";

                return;

            }


            const student = {

                regNo: regNo,

                name: name,

                year: year,

                section: section,

                semester: semester,

                password: password

            };


            localStorage.setItem(

                "student_" + regNo,

                JSON.stringify(student)

            );


            const subjects =
                subjectsBySemester[
                    semester
                ];


            let attendance = {};


            subjects.forEach(
                function(subject) {

                    if (
                        defaultAttendance[
                            subject
                        ]
                    ) {

                        attendance[subject] = {
                            ...defaultAttendance[
                                subject
                            ]
                        };

                    }

                    else {

                        attendance[subject] = {
                            present: 0,
                            total: 0
                        };

                    }

                }
            );


            localStorage.setItem(

                "attendance_" + regNo,

                JSON.stringify(
                    attendance
                )

            );


            localStorage.setItem(

                "student",

                JSON.stringify(student)

            );


            localStorage.setItem(

                "attendance",

                JSON.stringify(attendance)

            );


            message.textContent =
                "Account created successfully ✓";

            message.style.color =
                "#15803d";


            document
                .getElementById(
                    "robotMessage"
                )
                .textContent =
                `Access granted. Welcome, ${name}.`;


            setRobotState("success");


            setTimeout(
                function() {

                    showDashboard();

                },
                900
            );

        }
    );


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

function markAttendance(status) {

    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendance"
            )
        );


    const data =
        attendance[currentSubject];


    if (status === "present") {

        data.present++;

        data.total++;

    }

    else if (status === "absent") {

        data.total++;

    }


    attendance[currentSubject] =
        data;


    localStorage.setItem(
        "attendance",
        JSON.stringify(
            attendance
        )
    );


    const student =
        JSON.parse(
            localStorage.getItem(
                "student"
            )
        );


    localStorage.setItem(

        "attendance_" +
        student.regNo,

        JSON.stringify(
            attendance
        )

    );


    closeModal();

    loadSubjects();

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