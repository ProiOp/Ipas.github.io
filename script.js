
/* =================================
   HUMAN BODY EXPLORER
   JAVASCRIPT
================================= */


/* ================================
   NAVIGATION
================================ */

const pages = document.querySelectorAll(".page");

const navigationButtons = document.querySelectorAll(
    "[data-page]"
);

function openPage(pageName) {

    const currentPage = document.querySelector(".page.active");

    if (currentPage && currentPage.id === pageName) {
        return;
    }

    if (currentPage) {

        currentPage.classList.add("closing");

        setTimeout(() => {

            currentPage.classList.remove("active");
            currentPage.classList.remove("closing");

            showNewPage(pageName);

        }, 180);

    } else {

        showNewPage(pageName);

    }

}


function showNewPage(pageName) {

    pages.forEach(page => {

        page.classList.remove("active");

        if (page.id === pageName) {
            page.classList.add("active");
        }

    });

    navigationButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navigationButtons.forEach(button => {

    button.addEventListener("click", () => {

        openPage(button.dataset.page);

    });

});


/* Tombol navigasi dari isi halaman */

document.querySelectorAll("[data-go]").forEach(button => {

    button.addEventListener("click", () => {

        openPage(button.dataset.go);

    });

});



/* ================================
   MATERIAL TABS
================================ */

const materialTabs = document.querySelectorAll(
    ".material-tab"
);

const materialContents = document.querySelectorAll(
    ".material-content"
);


materialTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.material;

        materialTabs.forEach(item => {
            item.classList.remove("active");
        });

        materialContents.forEach(content => {
            content.classList.remove("active");
        });

        tab.classList.add("active");

        document.getElementById(target)
            .classList.add("active");

    });

});



/* ================================
   ANATOMY IMAGE MODAL
================================ */

const imageModal = document.getElementById(
    "image-modal"
);

const modalImage = document.getElementById(
    "modal-image"
);

const modalTitle = document.getElementById(
    "modal-title"
);

const closeModal = document.getElementById(
    "close-modal"
);


document.querySelectorAll(".anatomy-card").forEach(card => {

    card.addEventListener("click", () => {

        const image = card.querySelector("img");

        const title = card.querySelector("h3");

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        modalTitle.textContent = title.textContent;

        imageModal.classList.add("show");

    });

});


/* Tutup modal */

closeModal.addEventListener("click", () => {

    imageModal.classList.remove("show");

});


/* Klik area gelap untuk menutup */

imageModal.addEventListener("click", event => {

    if (event.target === imageModal) {

        imageModal.classList.remove("show");

    }

});


/* Tutup dengan tombol ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        imageModal.classList.remove("show");

    }

});



/* ================================
   QUIZ DATABASE
================================ */

const questions = [

    {
        question:
            "Bagian sistem saraf yang menjadi pusat pengolahan informasi adalah...",

        answers: [
            "Otot",
            "Otak",
            "Tulang",
            "Sendi"
        ],

        correct: 1,

        explanation:
            "Otak merupakan pusat pengolahan informasi dan koordinasi tubuh."
    },

    {
        question:
            "Struktur yang menghubungkan otak dengan tubuh dan menjadi pusat beberapa gerak refleks adalah...",

        answers: [
            "Tulang rusuk",
            "Otot",
            "Sumsum tulang belakang",
            "Tendon"
        ],

        correct: 2,

        explanation:
            "Sumsum tulang belakang menghantarkan impuls saraf dan mengoordinasikan beberapa gerak refleks."
    },

    {
        question:
            "Manakah yang termasuk alat gerak aktif?",

        answers: [
            "Tulang",
            "Sendi",
            "Tengkorak",
            "Otot"
        ],

        correct: 3,

        explanation:
            "Otot merupakan alat gerak aktif karena dapat berkontraksi dan relaksasi."
    },

    {
        question:
            "Apa fungsi utama tendon?",

        answers: [
            "Menghubungkan otot dengan tulang",
            "Menghubungkan dua tulang",
            "Melindungi otak",
            "Menerima rangsangan"
        ],

        correct: 0,

        explanation:
            "Tendon merupakan jaringan ikat kuat yang menghubungkan otot dengan tulang."
    },

    {
        question:
            "Gerakan menarik tangan dari benda panas termasuk...", 

        answers: [
            "Gerak sadar",
            "Gerak refleks",
            "Gerak lambat",
            "Gerak pasif"
        ],

        correct: 1,

        explanation:
            "Gerak refleks berlangsung cepat dan otomatis melalui jalur refleks yang melibatkan sumsum tulang belakang."
    }

];



/* ================================
   QUIZ VARIABLES
================================ */

let currentQuestion = 0;

let score = 0;

let answered = false;


const questionNumber = document.getElementById(
    "question-number"
);

const questionText = document.getElementById(
    "question-text"
);

const answerContainer = document.getElementById(
    "answer-container"
);

const feedback = document.getElementById(
    "feedback"
);

const nextButton = document.getElementById(
    "next-button"
);

const currentScore = document.getElementById(
    "current-score"
);

const progressBar = document.getElementById(
    "quiz-progress-bar"
);

const quizContainer = document.getElementById(
    "quiz-container"
);

const resultContainer = document.getElementById(
    "result-container"
);



/* ================================
   DISPLAY QUESTION
================================ */

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `SOAL ${currentQuestion + 1} / ${questions.length}`;

    questionText.textContent =
        question.question;

    currentScore.textContent =
        `SKOR: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    answerContainer.innerHTML = "";

    feedback.classList.remove("show");

    feedback.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Lihat Hasil →"
        : "Pertanyaan Berikutnya →";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-option";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {

            selectAnswer(index, button);

        });

        answerContainer.appendChild(button);

    });

}



/* ================================
   CHECK ANSWER
================================ */

function selectAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];

    const correctIndex = question.correct;

    const isCorrect =
        selectedIndex === correctIndex;


    if (isCorrect) {

        score++;

        selectedButton.classList.add("correct");

        feedback.textContent =
            "Benar! " + question.explanation;

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "Belum tepat. " + question.explanation;

    }


    /* Tampilkan jawaban yang benar */

    const allButtons = document.querySelectorAll(
        ".answer-option"
    );

    allButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === correctIndex) {

            button.classList.add("correct");

        }

    });


    feedback.classList.add("show");

    currentScore.textContent =
        `SKOR: ${score}`;

    nextButton.disabled = false;

}



/* ================================
   NEXT QUESTION
================================ */

nextButton.addEventListener("click", () => {

    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});



/* ================================
   SHOW FINAL RESULT
================================ */

function showResult() {

    quizContainer.classList.add("hidden");

    resultContainer.classList.remove("hidden");

    const finalScore = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById(
        "final-score"
    ).textContent = finalScore;


    let message = "";

    if (finalScore >= 80) {

        message =
            "Sangat baik! Kamu memahami materi sistem saraf dan sistem gerak.";

    } else if (finalScore >= 60) {

        message =
            "Bagus! Terus tingkatkan pemahamanmu.";

    } else {

        message =
            "Tetap semangat! Pelajari kembali materi dan coba lagi.";

    }


    document.getElementById(
        "result-message"
    ).textContent = message;

    progressBar.style.width = "100%";

}



/* ================================
   RESTART QUIZ
================================ */

document.getElementById(
    "restart-button"
).addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    answered = false;

    quizContainer.classList.remove("hidden");

    resultContainer.classList.add("hidden");

    loadQuestion();

});



/* ================================
   INITIALIZE
================================ */

loadQuestion();

console.log(
    "Human Body Explorer berhasil dijalankan."
);
