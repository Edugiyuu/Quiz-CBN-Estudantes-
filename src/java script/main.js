const questions = [

{
emoji:"🔐",
question:"Qual é a melhor prática para criar senhas seguras?",
answers:[
"Usar a mesma senha em todos os sites",
"Criar senhas com letras, números e símbolos",
"Usar apenas nome e nascimento",
"Senhas curtas são melhores"
],
correct:1
},

{
emoji:"📧",
question:"O que fazer ao receber um email suspeito?",
answers:[
"Clicar nos links",
"Responder imediatamente",
"Verificar remetente e não clicar",
"Encaminhar para amigos"
],
correct:2
},

{
emoji:"🌐",
question:"O que é ser um cidadão digital responsável?",
answers:[
"Compartilhar tudo online",
"Respeitar pessoas e proteger privacidade",
"Nunca usar internet",
"Aceitar qualquer amizade"
],
correct:1
},

{
emoji:"🎵",
question:"Como identificar um site seguro?",
answers:[
"Pela cor",
"Pelo cadeado HTTPS",
"Sites famosos são seguros",
"Não dá pra saber"
],
correct:1
},

{
emoji:"📱",
question:"Qual atitude ajuda na segurança online?",
answers:[
"Compartilhar senhas",
"Desativar antivírus",
"Atualizar apps e sistemas",
"Usar Wi-Fi público"
],
correct:2
}

];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function loadQuestion(){

  nextBtn.classList.add("hidden");

  const q = questions[currentQuestion];

  document.getElementById("emoji").innerText = q.emoji;

  questionEl.innerText = q.question;

  document.getElementById("question-number").innerText =
  `${currentQuestion + 1}/${questions.length}`;

  document.getElementById("tag-number").innerText =
  currentQuestion + 1;

  document.getElementById("progress-bar").style.width =
  `${(currentQuestion / questions.length) * 100}%`;

  answersEl.innerHTML = "";

  const letters = ["A","B","C","D"];

  q.answers.forEach((answer,index)=>{

    const btn = document.createElement("button");

    btn.classList.add("answer");

    btn.innerHTML = `
      <div class="letter">${letters[index]}</div>
      <div class="answer-text">${answer}</div>
    `;

    btn.onclick = ()=> selectAnswer(btn,index);

    answersEl.appendChild(btn);

  });

}

function selectAnswer(button,index){

  const correct = questions[currentQuestion].correct;

  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(btn => btn.disabled = true);

  /* CORRETO */

  if(index === correct){

    button.classList.add("correct");

    correctSound.currentTime = 0;
    correctSound.play();

    button.innerHTML += `
      <div class="result-icon" style="color:#00ff88;">
        ✔
      </div>
    `;

    score++;

  }

  /* ERRADO */

  else{

    button.classList.add("wrong");

    wrongSound.currentTime = 0;
    wrongSound.play();

    button.innerHTML += `
      <div class="result-icon" style="color:#ff5f7a;">
        ✖
      </div>
    `;

    buttons[correct].classList.add("correct");

    buttons[correct].innerHTML += `
      <div class="result-icon" style="color:#00ff88;">
        ✔
      </div>
    `;

  }

  document.getElementById("score").innerText = score;

  nextBtn.classList.remove("hidden");

}

nextBtn.addEventListener("click", ()=>{

  currentQuestion++;

  if(currentQuestion < questions.length){

    loadQuestion();

  }else{

    showResult();

  }

});

function showResult(){

  document.getElementById("quiz-content").classList.add("hidden");

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("progress-bar").style.width = "100%";

  document.getElementById("final-score").innerText =
  `${score}/${questions.length}`;

  let msg = "";

  if(score === 5){
    msg = "🔥 Excelente!";
  }
  else if(score >= 3){
    msg = "💪 Muito bem!";
  }
  else{
    msg = "🚀 Continue praticando!";
  }

  document.getElementById("message").innerText = msg;

}

function restartQuiz(){

  currentQuestion = 0;
  score = 0;

  document.getElementById("result").classList.add("hidden");

  document.getElementById("quiz-content").classList.remove("hidden");

  document.getElementById("score").innerText = "0";

  loadQuestion();

}

loadQuestion();
