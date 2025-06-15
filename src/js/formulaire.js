const startBtn = document.getElementById("startform");

startBtn.addEventListener("click", () => {
  const image = document.getElementById("formImage");
  const formSection = document.getElementById("formSection");
  const startBtn = document.getElementById("startform");
  const formu = document.getElementById("formu");
  image.style.display = "none";
  formSection.style.display = "none";
  startBtn.style.display = "none";
  formu.style.display="flex";
})