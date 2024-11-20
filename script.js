// الأسئلة والإجابات
const questions = [
    { 
        question: "لمس الأجزاء المكشوفة من الدوائر الكهربائية يؤدي إلى صدمة كهربائية", 
        answers: ["صح", "خطأ"], 
        correct: "صح" 
    },
    { 
        question: "وحدة قياس الشحنة الكهربائية هي", 
        answers: ["الأمبير", "الفولت", "الكولوم"], 
        correct: "الكولوم" 
    },
    { 
        question: "وحدة قياس القوة الدافعة الكهربائية هي", 
        answers: ["الأوم", "الفولت", "الوات"], 
        correct: "الفولت" 
    },
    { 
        question: "يجب أن تكون كافة الأجھزة الكھربائیة مؤرضة", 
        answers: ["صح", "خطأ"], 
        correct: "صح" 
    },
    { 
        question: "يجب أن یكون الاضاءة كافیة فى مكان العمل", 
        answers: ["صح", "خطأ"], 
        correct: "صح" 
    },
    { 
        question: "یجب توفیر التھویة المناسبة داخل أماكن العمل سواء كانت طبیعیة أو صناعیة", 
        answers: ["صح", "خطأ"], 
        correct: "صح" 
    },
    { 
        question: "عند الانتھاء من العمل أو التدریب على أي جھاز أو دائرة كھربائیة يجب عدم فصل المصدر الرئیسي للطاقة الكھربائیة", 
        answers: ["صح", "خطأ"], 
        correct: "خطأ" 
    },
    { 
        question: "مراعاة صیانة الأجھزة الخاصة بالشفط والتحقق من سلامتھا", 
        answers: ["صح", "خطأ"], 
        correct: "صح" 
    }
    
    // أضف بقية الأسئلة هنا
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// خلط الأسئلة
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    shuffledQuestions.sort(() => Math.random() - 0.5);
}

// تحميل السؤال الأول عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
    shuffleQuestions(); // خلط الأسئلة عند تحميل الصفحة
    loadQuestion();
});

function loadQuestion() {
    const questionContainer = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers");

    // تحديث نص السؤال
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    // تحديث خيارات الإجابة
    answersContainer.innerHTML = ""; // مسح الخيارات القديمة
    currentQuestion.answers.forEach(answer => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="answer" value="${answer}"> ${answer}`;
        answersContainer.appendChild(label);
    });

    // إظهار أو إخفاء الأزرار حسب السؤال
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
}

function nextQuestion() {
    // التحقق من اختيار المستخدم للإجابة
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("يرجى اختيار إجابة قبل الانتقال للسؤال التالي.");
        return;
    }

    // حفظ الإجابة
    userAnswers.push(selectedAnswer.value);

    // الانتقال للسؤال التالي
    currentQuestionIndex++;
    loadQuestion();
}

function submitQuiz() {
    // حفظ الإجابة الأخيرة
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers.push(selectedAnswer.value);
    }

    // حساب النتيجة
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === shuffledQuestions[index].correct) {
            score++;
        }
    });

    // عرض النتيجة
    const resultContainer = document.getElementById("result");
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `لقد حصلت على <strong>${score}/${questions.length}</strong>`;
    if (score === questions.length) {
        resultContainer.innerHTML += "  <br>رائع! إجاباتك كلها صحيحة!<br> مع تحيات أستاذ علاء فريد واسرة الكهرباء";
    } else {
        resultContainer.innerHTML += "<br>يمكنك تحسين أدائك في المرة القادمة.";
    }

    // إخفاء السؤال والأزرار
    document.getElementById("quiz-container").style.display = "none";
}
