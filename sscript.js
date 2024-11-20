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
                },
                "proposal_comment": "The research proposal addresses an important social issue but needs a clearer methodology.",
                "presentation_comment": "The presentation lacked visual aids but was otherwise persuasive."
            },
            {
                "student_id": "z865aAzA3a",
                "name": "Adnan Hussain Sajeeb",
                "institution": "institution",
                "category": "Junior",
                "year": "1999",
                "research_proposal_title": "Anti-Deepfake Biometrics: Protecting Identity in the Digital World",
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
                },
                "proposal_comment": "Great potential but could use more in-depth exploration of potential countermeasures.",
                "presentation_comment": "Presentation was clear but the video quality was subpar."
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
                },
                "proposal_comment": "A well-researched topic with a strong methodology, but the ethical framework needs more explanation.",
                "presentation_comment": "The presentation was thorough and engaging, with good visuals."
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

        const { name, student_id, institution, category, year, research_proposal_title, research_paper, proposal_comment, presentation_comment } = student;
        const paperScores = research_paper;
        const presentationScores = paperScores.presentation;

        // Calculate final research paper score
        const researchPaperScore = calculateScore(paperScores.research_problem, paperScores.existing_literature, paperScores.research_question, paperScores.methodology, paperScores.research_topic, paperScores.quality_of_writing);

        // Calculate presentation score
        const presentationScore = calculateScore(presentationScores.persuasiveness, presentationScores.video_quality, presentationScores.research_problem, presentationScores.research_question, presentationScores.methodology);

        // Adjust research paper score based on plagiarism percentile
        const plagiarismAdjustedScore = adjustPlagiarismScore(paperScores.plagiarism_check_percentile, researchPaperScore);

        // Calculate the final overall score
        const finalScore = Math.floor(researchPaperScore + presentationScore - plagiarismAdjustedScore);

        container.innerHTML = `
            <h2>Student Report Card: ${name}</h2>
            <p><strong>Student ID:</strong> ${student_id}</p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Category:</strong> ${category} | <strong>Year:</strong> ${year}</p>
            <p><strong>Research Proposal Title:</strong> ${research_proposal_title}</p>
            <h3>Research Paper Score: ${researchPaperScore}</h3>
            <h3>Presentation Score: ${presentationScore}</h3>
            <h3>Plagiarism Adjusted Score: ${plagiarismAdjustedScore}</h3>
            <h3>Final Score: ${finalScore}</h3>
            <h3>Proposal Comment:</h3>
            <p>${proposal_comment}</p>
            <h3>Presentation Comment:</h3>
            <p>${presentation_comment}</p>
        `;
    }

    // Function to calculate score based on the sum of individual criteria
    function calculateScore(...scores) {
        return scores.reduce((acc, score) => acc + score, 0);
    }

    // Function to adjust research paper score based on plagiarism percentile
    function adjustPlagiarismScore(plagiarismPercentile, researchScore) {
        const plagiarismPenalty = (plagiarismPercentile / 100) * 100;  // Penalized amount based on plagiarism percentage
        return researchScore - plagiarismPenalty;
    }
});
