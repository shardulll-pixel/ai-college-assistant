/* ================================
   COLLEGE CONTEXT (KNOWLEDGE BASE)
================================ */

const collegeContext = `
College Name: Priyadarshini College of Engineering, Nagpur
University Affiliation: Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)

Attendance Policy:
Students must maintain a minimum of 75% attendance in each subject to be eligible for semester examinations.
Attendance can be checked through the student ERP portal or by contacting the department.
Students with attendance below 75% may be detained unless attendance condonation is approved.
Medical leave is not automatically counted but may be considered upon submission of valid medical certificates.
Attendance condonation applications must be submitted to the Department Office or Academic Section within the deadline.
Attendance updates are allowed only in genuine cases with approval from the concerned faculty and HOD.
Attendance shortage can affect internal assessment marks and exam eligibility.

Lecture Structure:
Each subject generally has 3 to 5 lectures per week as per the prescribed credit structure.

Examinations:
Semester exam schedules are announced on the college website and notice boards.
Hall tickets can be downloaded from the student portal using PRN or roll number.
Examination patterns follow RTMNU guidelines including theory, practicals, and internal assessments.
Mobile phones are strictly prohibited in examinations.
Calculators are allowed only if permitted for a specific exam.
If a student misses an exam, they must immediately contact the Exam Cell.
Applications for supplementary or re-examinations must be submitted within the notified schedule.
Most theory examinations are of 2 to 3 hours duration.
There is no negative marking unless specified in the question paper.

Results and Marks:
Semester results are generally declared within 30 to 45 days after examinations.
Internal assessment marks are available on the student portal or department notice boards.
Passing criteria are as prescribed by RTMNU.
Internal marks are calculated based on tests, assignments, attendance, and practical performance.
Students can apply for revaluation or photocopy of answer sheets through the Exam Cell.
Revaluation results are usually declared within 15 to 30 days.
If marks appear incorrect, students should immediately contact the Exam Cell.
CGPA or GPA is calculated based on credit-weighted grade points.

Academic and Administrative Services:
The academic calendar is available on the college website.
Class timetables are published on the student portal and department notice boards.
Bonafide and leaving certificates can be applied for through the ERP system or Administrative Office.
Personal or academic detail corrections require a written request with valid documents.
Fee payment deadlines are announced on the college website.

Office Locations:
Dean Office is located at ______________________________.
Administrative Office is located at _____________________.
Exam Cell is located at ________________________________.
HOD office for each department is located at ____________.
Department offices are located at ______________________.

Support and Contact:
For academic or examination-related issues, students should contact their Class Coordinator,
Department Office, Academic Section, or Exam Cell.
`;

/* ================================
   SYSTEM PROMPT
================================ */

const systemPrompt = `
You are an AI College Assistant chatbot.

Answer student questions strictly using the provided college information.
If the requested information is not available, politely respond that the information is not currently available.

Rules:
- Do not guess or assume information
- Keep answers clear, concise, and student-friendly
`;

/* ================================
   MAIN FUNCTION (BUTTON CLICK)
================================ */

async function askAI() {
    const input = document.getElementById("userInput").value.trim();
    const output = document.getElementById("answerText");

    if (input === "") {
        output.innerText = "Please enter a question.";
        return;
    }

    output.innerText = "Thinking...";

    // 🔑 PASTE YOUR GEMINI API KEY HERE
    const API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";

    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text:
                            systemPrompt +
                            "\n\nCollege Information:\n" +
                            collegeContext +
                            "\n\nStudent Question:\n" +
                            input
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }
        );

        const data = await response.json();

        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content.parts.length > 0
        ) {
            output.innerText = data.candidates[0].content.parts[0].text;
        } else {
            output.innerText = "Sorry, I could not find the answer.";
        }
    } catch (error) {
        console.error(error);
        output.innerText = "Error connecting to AI. Please try again.";
    }
}
