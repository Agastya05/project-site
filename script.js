document.addEventListener('DOMContentLoaded', () => {

    // Initialize Feather Icons
    feather.replace();

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
    }

    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        lightIcon.classList.toggle('hidden');
        darkIcon.classList.toggle('hidden');
        
        // Save theme preference
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    // --- Quiz Functionality ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const startScreen = document.getElementById('quiz-start-screen');
        const questionScreen = document.getElementById('quiz-question-screen');
        const endScreen = document.getElementById('quiz-end-screen');

        const startBtn = document.getElementById('start-quiz-btn');
        const restartBtn = document.getElementById('restart-quiz-btn');

        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const questionNumberEl = document.getElementById('question-number');
        const totalQuestionsEl = document.getElementById('total-questions');
        const quizScoreEl = document.getElementById('quiz-score');
        
        const finalScoreEl = document.getElementById('final-score');
        const scoreFeedbackEl = document.getElementById('score-feedback');

        const quizData = [
            { question: "What type of attack involves a malicious actor sending deceptive emails to trick people into revealing sensitive information?", options: ["Ransomware", "Phishing", "DDoS", "Malware"], answer: "Phishing" },
            { question: "What does '2FA' stand for?", options: ["Two-Factor Authentication", "Two-Form Authorization", "Two-File Authentication", "Two-Factor Algorithm"], answer: "Two-Factor Authentication" },
            { question: "Which of the following is the strongest password?", options: ["12345678", "password123", "P@s$w0rd!", "Tr0ub4dor&3"], answer: "Tr0ub4dor&3" },
            { question: "What is the practice of securing a computer network from intruders, whether targeted attackers or opportunistic malware?", options: ["Cryptography", "Network Security", "Ethical Hacking", "Data Encryption"], answer: "Network Security" },
            { question: "A program that appears legitimate but performs some illicit activity when run is called a...", options: ["Virus", "Worm", "Trojan Horse", "Spyware"], answer: "Trojan Horse" },
            { question: "What does VPN stand for?", options: ["Virtual Private Network", "Very Protected Network", "Virtual Public Network", "Verified Private Network"], answer: "Virtual Private Network" },
            { question: "What is 'social engineering' in the context of cybersecurity?", options: ["A type of network architecture", "A secure coding practice", "Manipulating people to divulge confidential information", "A social media security protocol"], answer: "Manipulating people to divulge confidential information" },
            { question: "Which of these is NOT a good practice for email security?", options: ["Using a strong, unique password", "Enabling 2FA", "Clicking links from unknown senders", "Verifying the sender's email address"], answer: "Clicking links from unknown senders" }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let shuffledQuestions = [];

        function startQuiz() {
            shuffledQuestions = quizData.sort(() => Math.random() - 0.5).slice(0, 5); // Select 5 random questions
            currentQuestionIndex = 0;
            score = 0;
            quizScoreEl.textContent = score;
            startScreen.classList.add('hidden');
            endScreen.classList.add('hidden');
            questionScreen.classList.remove('hidden');
            loadQuestion();
        }

        function loadQuestion() {
            const currentQuestion = shuffledQuestions[currentQuestionIndex];
            questionEl.textContent = currentQuestion.question;
            questionNumberEl.textContent = currentQuestionIndex + 1;
            totalQuestionsEl.textContent = shuffledQuestions.length;
            optionsEl.innerHTML = '';

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.addEventListener('click', selectAnswer);
                optionsEl.appendChild(button);
            });
        }

        function selectAnswer(e) {
            const selectedButton = e.target;
            const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

            // Disable all buttons after an answer is selected
            Array.from(optionsEl.children).forEach(button => {
                button.disabled = true;
                if (button.textContent === correctAnswer) {
                    button.classList.add('correct');
                }
            });

            if (selectedButton.textContent === correctAnswer) {
                score++;
                quizScoreEl.textContent = score;
                selectedButton.classList.add('correct');
            } else {
                selectedButton.classList.add('wrong');
            }

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < shuffledQuestions.length) {
                    loadQuestion();
                } else {
                    showEndScreen();
                }
            }, 1200);
        }
        
        function showEndScreen() {
            questionScreen.classList.add('hidden');
            endScreen.classList.remove('hidden');
            finalScoreEl.textContent = `${score} / ${shuffledQuestions.length}`;
            
            const percentage = (score / shuffledQuestions.length) * 100;
            if (percentage === 100) {
                scoreFeedbackEl.textContent = "Perfect score! You're a cybersecurity expert!";
            } else if (percentage >= 60) {
                scoreFeedbackEl.textContent = "Great job! You have a solid understanding of the basics.";
            } else {
                scoreFeedbackEl.textContent = "Good effort! Keep reading our articles to improve your knowledge.";
            }
        }

        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', startQuiz);
    }
});
