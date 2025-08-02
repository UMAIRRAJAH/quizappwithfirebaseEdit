// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgnfLuUfuHxdED8T2pSLmLksaONI68C-Y",
  authDomain: "quizappwithfirebase-7708c.firebaseapp.com",
  projectId: "quizappwithfirebase-7708c",
  storageBucket: "quizappwithfirebase-7708c.appspot.com",
  messagingSenderId: "690414317015",
  appId: "1:690414317015:web:6dac79609657352c5c2f92",
  measurementId: "G-SRG9BJTX6X",
  databaseURL: "https:quizappwithfirebase-7708c-default-rtdb.firebaseio.com" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// ✅ DOM Elements
var questionInput = document.getElementById("questionInput");
var option = document.getElementById("option");
var optionsParent = document.getElementById("optionsParent");
var answerParent = document.getElementById("answerParent");
var correctAnswerEle = document.getElementById("correctAnswer");

// ✅ Quiz Variables
var options = [];
var correctAnswer;

// ✅ Render options
function renderOption() {
  optionsParent.innerHTML = "";
  for (var i = 0; i < options.length; i++) {
    optionsParent.innerHTML += `
      <li onclick="setCorrectAnswer('${options[i]}')" class='p-2 g-3 bg-light rounded-pill mb-2'>
        ${options[i]}
      </li>`;
  }
}

// ✅ Set correct answer
window.setCorrectAnswer = function (a) {
  correctAnswer = a;
  correctAnswerEle.innerHTML = `Correct: ${correctAnswer}`;
};

// ✅ Add option
window.addOption = function () {
  if (option.value.trim() === "") {
    alert("Please enter an option");
    return;
  }
  options.push(option.value);
  option.value = "";
  renderOption();
};

// ✅ Submit question
window.submitQuestion = function () {
  if (!questionInput.value.trim()) {
    alert("Please enter a question.");
    return;
  }

  if (options.length < 2) {
    alert("Please add at least two options.");
    return;
  }

  if (!correctAnswer) {
    alert("Please select the correct answer.");
    return;
  }

  var obj = {
    question: questionInput.value.trim(),
    options: options,
    correctAnswer: correctAnswer
  };

  obj.id = push(ref(db, 'questions/')).key;
  const reference = ref(db, `questions/${obj.id}`);
  set(reference, obj);

  console.log("Question submitted:", obj);

  // ✅ Reset form
  questionInput.value = "";
  option.value = "";
  options = [];
  correctAnswer = null;
  correctAnswerEle.innerHTML = "Correct Answer";
  renderOption();
};
