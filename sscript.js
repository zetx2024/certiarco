document.addEventListener("DOMContentLoaded", function() {
    const studentsData = {
        "students": [
            {
                "student_id": "S001",
                "name": "John Doe",
                "institution": "XYZ University",
                "category": "Senior",
                "research_proposal_title": "AI for Medical Diagnostics",
                "research_paper": {
                    "research_problem": 85,
                    "existing_literature": 90,
                    "research_question": 80,
                    "methodology": 95,
                    "research_topic": 70,
                    "quality_of_writing": 75,
                    "plagiarism_check_percentile": 95,
                    "presentation": {
                        "persuasiveness": 80,
                        "video_quality": 70,
                        "research_problem": 85,
                        "research_question": 90,
                        "methodology": 75
                    }
                }
            },
            {
                "student_id": "S002",
                "name": "Jane Smith",
                "institution": "ABC College",
                "category": "Junior",
                "research_proposal_title": "Quantum Computing and Cryptography",
                "research_paper": {
                    "research_problem": 88,
                    "existing_literature": 85,
                    "research_question": 90,
                    "methodology": 93,
                    "research_topic": 77,
                    "quality_of_writing": 82,
                    "plagiarism_check_percentile": 97,
                    "presentation": {
                        "persuasiveness": 85,
                        "video_quality": 78,
                        "research_problem": 88,
                        "research_question": 91,
                        "methodology": 80
                    }
                }
            }
            // Add other students data...
        ]
    };

    // Calculate Weighted Score for each criterion
    function calculateWeightedScore(score, weight) {
        return (score * weight) / 100;
    }

    // Generate scorecard for a student
    function generateScorecard(student) {
        const container = document.getElementById("student-details");
        container.innerHTML = '';  // Clear previous content

        // Create scorecard div for the student
        const scorecard = document.createElement("div");
        scorecard.classList.add("scorecard");

        const { name, student_id, institution, category, research_proposal_title, research_paper } = student;
        const paperScores = research_paper;
        const presentationScores = paperScores.presentation;

        // Calculate final scores
        const totalScore = [
            { score: paperScores.research_problem, weight: 20 },
            { score: paperScores.existing_literature, weight: 10 },
            { score: paperScores.research_question, weight: 25 },
            { score: paperScores.methodology, weight: 25 },
            { score: paperScores.research_topic, weight: 15 },
            { score: paperScores.quality_of_writing, weight: 5 },
            { score: paperScores.plagiarism_check_percentile, weight: 5 }
        ].reduce((acc, { score, weight }) => acc + calculateWeightedScore(score, weight), 0);

        const presentationTotalScore = [
            { score: presentationScores.persuasiveness, weight: 20 },
            { score: presentationScores.video_quality, weight: 20 },
            { score: presentationScores.research_problem, weight: 20 },
            { score: presentationScores.research_question, weight: 20 },
            { score: presentationScores.methodology, weight: 20 }
        ].reduce((acc, { score, weight }) => acc + calculateWeightedScore(score, weight), 0);

        const finalTotalScore = totalScore + presentationTotalScore;
        const scaledFinalScore = (finalTotalScore / 250) * 100;

        // Create the HTML for the scorecard
        scorecard.innerHTML = `
            <h2>Scorecard for ${name}</h2>
            <p><strong>Student ID:</strong> ${student_id}</p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Research Proposal Title:</strong> ${research_proposal_title}</p>
            
            <h3>Research Paper Evaluation</h3>
            <table>
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Score</th>
                        <th>Weight</th>
                        <th>Weighted Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Research Problem</td>
                        <td>${paperScores.research_problem}</td>
                        <td>20%</td>
                        <td>${calculateWeightedScore(paperScores.research_problem, 20).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Existing Literature</td>
                        <td>${paperScores.existing_literature}</td>
                        <td>10%</td>
                        <td>${calculateWeightedScore(paperScores.existing_literature, 10).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Research Question</td>
                        <td>${paperScores.research_question}</td>
                        <td>25%</td>
                        <td>${calculateWeightedScore(paperScores.research_question, 25).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Methodology</td>
                        <td>${paperScores.methodology}</td>
                        <td>25%</td>
                        <td>${calculateWeightedScore(paperScores.methodology, 25).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Research Topic</td>
                        <td>${paperScores.research_topic}</td>
                        <td>15%</td>
                        <td>${calculateWeightedScore(paperScores.research_topic, 15).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Quality of Writing</td>
                        <td>${paperScores.quality_of_writing}</td>
                        <td>5%</td>
                        <td>${calculateWeightedScore(paperScores.quality_of_writing, 5).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Plagiarism Check</td>
                        <td>${paperScores.plagiarism_check_percentile}</td>
                        <td>5%</td>
                        <td>${calculateWeightedScore(paperScores.plagiarism_check_percentile, 5).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Presentation Evaluation</h3>
            <table>
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Score</th>
                        <th>Weight</th>
                        <th>Weighted Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Persuasiveness</td>
                        <td>${presentationScores.persuasiveness}</td>
                        <td>20%</td>
                        <td>${calculateWeightedScore(presentationScores.persuasiveness, 20).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Video Quality</td>
                        <td>${presentationScores.video_quality}</td>
                        <td>20%</td>
                        <td>${calculateWeightedScore(presentationScores.video_quality, 20).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Research Problem</td>
                        <td>${presentationScores.research_problem}</td>
                        <td>20%</td>
                        <td>${calculateWeightedScore(presentationScores.research_problem, 20).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Research Question</td>
                        <td>${presentationScores.research_question}</td>
                        <td>20%</td>
                        <td>${calculateWeightedScore(presentationScores.research_question, 20).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Methodology</td>
                        <td>${presentationScores.methodology}</td>
                        <td>20%</td>
                        <td>${calculateWeightedScore(presentationScores.methodology, 20).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Total Score: ${finalTotalScore.toFixed(2)} / 250</h3>
            <h3>Scaled Score: ${scaledFinalScore.toFixed(2)} / 100</h3>
        `;

        // Show the download button for this student
        const downloadButton = document.getElementById("download-pdf");
        downloadButton.style.display = "block";
        
        // Download PDF when button is clicked
        downloadButton.addEventListener("click", function() {
            downloadPDF(student, finalTotalScore, scaledFinalScore);
        });
    }

    // Search function for students
    document.getElementById("search-btn").addEventListener("click", function() {
        const searchTerm = document.getElementById("student-search").value.toLowerCase();
        const student = studentsData.students.find(s => s.name.toLowerCase().includes(searchTerm) || s.student_id.toLowerCase().includes(searchTerm));
        
        if (student) {
            generateScorecard(student);
        } else {
            alert("Student not found!");
        }
    });

    // Function to generate PDF with logo on the left side
    function downloadPDF(student, finalTotalScore, scaledFinalScore) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add logo to PDF
        doc.addImage('logo.png', 'PNG', 10, 10, 50, 50); // Adjust the position and size of the logo
        
        // Add text to the PDF
        doc.text(`Scorecard for ${student.name}`, 70, 20);
        doc.text(`Student ID: ${student.student_id}`, 70, 30);
        doc.text(`Institution: ${student.institution}`, 70, 40);
        doc.text(`Category: ${student.category}`, 70, 50);
        doc.text(`Research Proposal Title: ${student.research_proposal_title}`, 70, 60);
        
        // Add the scorecard content and tables...
        doc.text(`Total Score: ${finalTotalScore.toFixed(2)} / 250`, 70, 180);
        doc.text(`Scaled Score: ${scaledFinalScore.toFixed(2)} / 100`, 70, 190);
        
        // Save the PDF
        doc.save(`${student.student_id}_scorecard.pdf`);
    }
});
