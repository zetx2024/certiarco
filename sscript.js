document.addEventListener("DOMContentLoaded", function () {
    const studentsData = {
        "students": [
            {
                "student_id": "z822790z6A",
                "name": "Afia Anjum Aboni",
                "institution": "institution",
                "category": "Junior",
                "year": "1999",
                "research_proposal_title": "The Relevance of Class Disparity in the Implementation of Climate-Related Policies; an Investigation into the Different Socioeconomic Classes of Dhaka",
                "research_paper": {
                    "research_problem": 17,
                    "existing_literature": 7,
                    "research_question": 20,
                    "methodology": 18,
                    "research_topic": 12,
                    "quality_of_writing": 4,
                    "plagiarism_check_percentile": 3,
                    "presentation": {
                        "persuasiveness": 12,
                        "video_quality": 16,
                        "research_problem": 4,
                        "research_question": 10,
                        "methodology": 12
                    }
                }
            },
            {
                "student_id": "z865aAzA3a",
                "name": "Adnan Hussain Sajeeb",
                "institution": "institution",
                "category": "Junior",
                "year": "1999",
                "research_proposal_title": "Anti-Deepfake Biometrics:\r\nProtecting Identity in the Digital World",
                "research_paper": {
                    "research_problem": 18,
                    "existing_literature": 8,
                    "research_question": 22,
                    "methodology": 19,
                    "research_topic": 14,
                    "quality_of_writing": 4,
                    "plagiarism_check_percentile": 0,
                    "presentation": {
                        "persuasiveness": 13,
                        "video_quality": 5,
                        "research_problem": 14,
                        "research_question": 11,
                        "methodology": 7
                    }
                }
            },
            {
                "student_id": "917570z9zZ",
                "name": "Xeon Nasif",
                "institution": "institution",
                "category": "Junior",
                "year": "1999",
                "research_proposal_title": "The Alteration of Lecture-Based Pedagogy Through Generative AI and a Proposed Ethical Framework for AI Detection Tools: A Mixed-Methods Study from the Perspectives of Students and Teachers in Secondary and Higher Secondary Education in Urban Bangladesh",
                "research_paper": {
                    "research_problem": 18,
                    "existing_literature": 7,
                    "research_question": 16,
                    "methodology": 19,
                    "research_topic": 13,
                    "quality_of_writing": 4,
                    "plagiarism_check_percentile": 16,
                    "presentation": {
                        "persuasiveness": 12,
                        "video_quality": 17,
                        "research_problem": 18,
                        "research_question": 16,
                        "methodology": 17
                    }
                }
            }
        ]
    };

    // Search function for students
    document.getElementById("search-btn").addEventListener("click", function () {
        const searchTerm = document.getElementById("student-search").value.toLowerCase();
        const student = studentsData.students.find(s => 
            s.name.toLowerCase().includes(searchTerm) || 
            s.student_id.toLowerCase().includes(searchTerm)
        );
        
        if (student) {
            generateScorecard(student);
        } else {
            alert("Student not found!");
        }
    });

    // Function to generate scorecard on the page
    function generateScorecard(student) {
        const container = document.getElementById("student-details");
        container.innerHTML = '';  // Clear previous content

        const { name, student_id, institution, category, year, research_proposal_title, research_paper } = student;
        const paperScores = research_paper;
        const presentationScores = paperScores.presentation;

        // Calculate final research paper score
        const researchPaperScore = calculateScore(paperScores.research_problem, paperScores.existing_literature, paperScores.research_question, paperScores.methodology, paperScores.research_topic, paperScores.quality_of_writing, paperScores.plagiarism_check_percentile);

        // Calculate presentation score
        const presentationScore = calculateScore(presentationScores.persuasiveness, presentationScores.video_quality, presentationScores.research_problem, presentationScores.research_question, presentationScores.methodology);

        // Adjust research paper score based on plagiarism percentile
        const plagiarismAdjustedScore = adjustPlagiarismScore(paperScores.plagiarism_check_percentile, researchPaperScore);

        // Calculate the final overall score
        const finalScore = plagiarismAdjustedScore + presentationScore;
        const scaledFinalScore = (finalScore / 200) * 100;

        // Create the HTML for the scorecard
        const scorecard = document.createElement("div");
        scorecard.classList.add("scorecard");

        scorecard.innerHTML = `
            <h2>Scorecard for ${name}</h2>
            <p><strong>Year:</strong> ${year}</p>
            <p><strong>Student ID:</strong> ${student_id}</p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Research Proposal Title:</strong> ${research_proposal_title}</p>
            
            <h3>Research Paper Evaluation</h3>
            <table>
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Marks Obtained</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Research Problem</td>
                        <td>${paperScores.research_problem} / 20</td>
                    </tr>
                    <tr>
                        <td>Existing Literature</td>
                        <td>${paperScores.existing_literature} / 10</td>
                    </tr>
                    <tr>
                        <td>Research Question</td>
                        <td>${paperScores.research_question} / 25</td>
                    </tr>
                    <tr>
                        <td>Methodology</td>
                        <td>${paperScores.methodology} / 25</td>
                    </tr>
                    <tr>
                        <td>Research Topic</td>
                        <td>${paperScores.research_topic} / 15</td>
                    </tr>
                    <tr>
                        <td>Quality of Writing</td>
                        <td>${paperScores.quality_of_writing} / 5</td>
                    </tr>
                    <tr>
                        <td>Plagiarism Check</td>
                        <td>${paperScores.plagiarism_check_percentile} / 5</td>
                    </tr>
                </tbody>
            </table>

            <h3>Presentation Evaluation</h3>
            <table>
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Marks Obtained</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Persuasiveness</td>
                        <td>${presentationScores.persuasiveness} / 20</td>
                    </tr>
                    <tr>
                        <td>Video Quality</td>
                        <td>${presentationScores.video_quality} / 20</td>
                    </tr>
                    <tr>
                        <td>Research Problem</td>
                        <td>${presentationScores.research_problem} / 20</td>
                    </tr>
                    <tr>
                        <td>Research Question</td>
                        <td>${presentationScores.research_question} / 20</td>
                    </tr>
                    <tr>
                        <td>Methodology</td>
                        <td>${presentationScores.methodology} / 20</td>
                    </tr>
                </tbody>
            </table>

            <h3>Total Score</h3>
            <p><strong>Research Paper Score: </strong>${researchPaperScore} / 100</p>
            <p><strong>Presentation Score: </strong>${presentationScore} / 100</p>
            <p><strong>Plagiarism Adjusted Score: </strong>${plagiarismAdjustedScore} / 100</p>
            <p><strong>Final Score: </strong>${scaledFinalScore.toFixed(2)}%</p>
        `;

        container.appendChild(scorecard);
    }

    // Calculate total score for a set of criteria
    function calculateScore(...scores) {
        return scores.reduce((acc, score) => acc + score, 0);
    }

    // Adjust plagiarism penalty using exponential logic
    function adjustPlagiarismScore(plagiarismPercentile, researchScore) {
        let penalty = 0;
        if (plagiarismPercentile <= 7) {
            penalty = researchScore * Math.exp(-0.1 * plagiarismPercentile);  // High penalty
        } else if (plagiarismPercentile <= 20) {
            penalty = 0;  // No penalty
        } else if (plagiarismPercentile <= 30) {
            penalty = researchScore * 0.1;  // Moderate penalty
        } else {
            penalty = researchScore * 0.3;  // Significant penalty
        }
        return researchScore - penalty;
    }
});
