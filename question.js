

// 예시 문제.txt 기반 문제
const quizData = [
    {
        question: "1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?",
        options: [
            "곰, 솜 - 자음",
            "종, 공 - 자음",
            "돌, 돈 - 모음",
            "산, 선 - 모음",
            "밥, 법 - 모음"
        ],
        answer: 2
    },
    {
        question: "2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?",
        options: [
            "음운의 종류에는 자음과 모음이 있다.",
            "말의 뜻을 구별해 주는 소리의 단위이다.",
            "모음은 공기가 그대로 흘러나오는 소리이다.",
            "자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.",
            "음운에 따라 소리 낼 때의 느낌이 달라질 수 있다."
        ],
        answer: 3
    },
    {
        question: "3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?",
        options: [
            "음운",
            "음절",
            "단어",
            "문장",
            "형태소"
        ],
        answer: 0
    },
    {
        question: "4. ‘돌’의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
        options: [
            "솔",
            "달",
            "덕",
            "돈",
            "독"
        ],
        answer: 2
    },
    {
        question: "5. 음운에 대한 설명으로 알맞지 않은 것은?",
        options: [
            "단어의 음운을 바꾸어 쓰면 의미가 달라진다.",
            "우리말의 음운은 자음과 모음으로 이루어진다.",
            "자음은 공기가 방해를 받으며 나오는 소리이다.",
            "말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.",
            "모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다."
        ],
        answer: 4
    },
    {
        question: "1. 단어에 사용된 음운의 개수가 잘못 연결된 것은?",
        options: [
            "누나 - 4개",
            "까꿍 - 6개",
            "동생 - 6개",
            "외삼촌 - 7개",
            "할머니 - 7개"
        ],
        answer: 2
    },
    {
        question: "2. 다음 중 국어의 자음에 대한 설명으로 적절하지 않은 것은?",
        options: [
            "자음의 개수는 모두 19개이다.",
            "모음을 만나야 소리 낼 수 있다.",
            "공기가 방해를 받으며 나오는 소리이다.",
            "입안의 공명 현상을 거쳐서 나온다는 특징이 있다.",
            "말의 뜻을 구별해 주는 소리의 가장 작은 단위에 속한다."
        ],
        answer: 4
    }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-button');

function loadQuiz() {
    const quiz = quizData[currentQuiz];
    questionEl.innerHTML = '';
    // 1번, 2번 문제에 그림 추가 (문제 순서 기준)
    if (currentQuiz === 0) { // 1번 문제 (index 0)
        const img = document.createElement('img');
        img.src = 'images/01.png';
        img.alt = '문제1 그림';
        img.style.maxWidth = '100%';
        img.style.display = 'block';
        img.style.margin = '0 auto 16px auto';
        questionEl.appendChild(img);
    }
    if (currentQuiz === 1) { // 2번 문제 (index 1)
        const img = document.createElement('img');
        img.src = 'images/02.png';
        img.alt = '문제2 그림';
        img.style.maxWidth = '100%';
        img.style.display = 'block';
        img.style.margin = '0 auto 16px auto';
        questionEl.appendChild(img);
    }
    // 문제 텍스트
    const qText = document.createElement('div');
    qText.textContent = quiz.question;
    questionEl.appendChild(qText);
    optionsEl.innerHTML = '';
    quiz.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectOption(idx);
        optionsEl.appendChild(btn);
    });
    nextBtn.style.display = 'none';
}

function selectOption(selectedIdx) {
    const quiz = quizData[currentQuiz];
    Array.from(optionsEl.children).forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === quiz.answer) {
            btn.style.background = '#a7f3d0';
        }
        if (idx === selectedIdx && idx !== quiz.answer) {
            btn.style.background = '#fca5a5';
        }
    });
    if (selectedIdx === quiz.answer) {
        score++;
    }
    nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreEl.textContent = `총 점수: ${score} / ${quizData.length}`;
}

restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuiz();
});

// 첫 문제 로드
loadQuiz();

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
});

function showResults() {
    questionContainer.innerHTML = `<h2>Your final score is: ${score} out of ${questions.length}</h2>`;
    nextButton.classList.add('hidden');
}