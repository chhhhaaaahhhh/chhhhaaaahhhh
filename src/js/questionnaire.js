let questionsJson = {};
let userReponses = ""; //stocke les réponses de l'user

document.addEventListener("DOMContentLoaded", async () => { //récupère le contenu du json
  try {
    const response = await fetch("./questions.json");
    questionsJson = await response.json();
  } catch (error) {
    console.error(error);
  }
});

let currentQuestionIndex = -1; //suit l'état des questions

const displayQuestion = async () => { //présente les questions les unes après les autres
  currentQuestionIndex += 1;
  const container = document.getElementById("questcontainer");
  container.innerHTML = "";

  if (currentQuestionIndex < questionsJson.questionnaire.length) {
    const question = questionsJson.questionnaire[currentQuestionIndex];

    const questionBlock = document.createElement("div"); //affiche les questions+réponses
    questionBlock.classList.add("mb-4");
    questionBlock.innerHTML = `
  <h3 class="text-lg font-bold">${currentQuestionIndex + 1}. ${question.qlabel}</h3>
  <div id="reponses${question.qid}" style="display: flex; flex-direction: column; align-items: center;">
    ${question.reponses
      .map(
        (reponse) =>
          `<button class="btn m-1" onclick="handleAnswer(${reponse.rid})" data-value="${reponse.rid}">${reponse.rlabel}</button>`
      )
      .join("")}
  </div>
`;
    container.appendChild(questionBlock);
  } else { //quand le questionnaire est fini
    const container = document.getElementById("questcontainer");
    try {
      const response = await fetch(`./${userReponses}.html`); //test si l'user a bien répondu

      if (response.status === 200) {
        const url = `./${userReponses}.html`; //dirige vers la page de formulaire
        window.open(url, "_self");
      } else { //dit à l'user qu'il a mal répondu
        container.innerHTML = `
        <h1 class="text-3xl font-bold text-primary">Quiz terminé</h1>
        <p class="text-lg text-red-500">Désolé, vous n'avez pas répondu correctement.</p>
      `;
      };
    } catch (error) {
      console.error(error);
    };
  }
};

const handleAnswer = (value) => { //ajoute les réponses de l'user à userReponses
  userReponses += value;
  displayQuestion();
};

const startButton = document.getElementById("startquest"); //commencer le questionnaire

startButton.addEventListener("click", () => { //arrangement de la page au lancement du questionnaire
  const image = document.getElementById("quizImage");
  const contactSection = document.getElementById("contactSection");
  const startButton = document.getElementById("startquest");
  image.style.display = "none";
  contactSection.style.display = "none";
  startButton.style.display = "none";
  const questContainer = document.getElementById("questcontainer");
  questContainer.style.display = "flex";
  displayQuestion();
});

const bruteforceButton = document.getElementById("bruteforceButton");

bruteforceButton.addEventListener("click", async () => {
  console.log("bouton bruteforce cliqué");
  bruteforceButton.innerHTML = `<p class="text-lg font-LCD">Bruteforce en cours...</p>`;
  const container = document.getElementById("questcontainer");
  container.innerHTML = `<h1 class="text-3xl font-bold text-primary">Essai de bruteforce en cours...</h1>`;

  let allCombinations = [];
  let questionnaire = questionsJson.questionnaire;


  const generateCombinations = (currentCombination, index) => {
    if (index === questionnaire.length) {
      allCombinations.push(currentCombination);
      return;
    }

    questionnaire[index].reponses.forEach((reponse) => {
      generateCombinations([...currentCombination, reponse.rid], index + 1);
    });
  };

  generateCombinations([], 0);

  //essaie chaque combinaison
  for (const combination of allCombinations) {
    userReponses = combination.join("");
    try {
      const response = await fetch(`./${userReponses}.html`);
      if (response.status === 200) {
        const url = `./${userReponses}.html`;
        window.open(url, "_self"); //accède à la page de formulaire
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //cas d'erreur
  container.innerHTML = `<h1 class="text-3xl font-bold text-primary">Échec</h1> 
    <p class="text-lg text-red-500">Aucune combinaison correcte n'a été trouvée.</p>`;
});