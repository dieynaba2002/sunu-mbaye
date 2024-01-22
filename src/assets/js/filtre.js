//filter porfolio
const all = document.querySelectorAll(".portfolioBottomItem");
const apps = document.querySelectorAll(".app");
const webs = document.querySelectorAll(".web");
const cards = document.querySelectorAll(".card");

const btnAll = document.querySelector(".btnAll");
const btnApp = document.querySelector(".btnApp");
const btnCard = document.querySelector(".btnCard");
const btnWeb = document.querySelector(".btnWeb");

function showApp() {
  all.forEach((element) => {
    if (!element.classList.contains("app")) {
      element.classList.add("hide");
    } else {
      element.classList.remove("hide");
    }
  });

  const activeButton = document.querySelector(".active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  btnApp.classList.add("active");
}

function showWeb() {
  all.forEach((element) => {
    if (!element.classList.contains("web")) {
      element.classList.add("hide");
    } else {
      element.classList.remove("hide");
    }
  });

  const activeButton = document.querySelector(".active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  btnWeb.classList.add("active");
}

function showCard() {
  all.forEach((element) => {
    if (!element.classList.contains("card")) {
      element.classList.add("hide");
    } else {
      element.classList.remove("hide");
    }
  });

  const activeButton = document.querySelector(".active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  btnCard.classList.add("active");
}

function showAll() {
  all.forEach((element) => {
    element.classList.remove("hide");
  });
  const activeButton = document.querySelector(".active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  btnAll.classList.add("active");
}

// Écouteurs d'événements pour les boutons de filtrage
btnAll.addEventListener("click", showAll);
btnApp.addEventListener("click", showApp);
btnWeb.addEventListener("click", showWeb);
btnCard.addEventListener("click", showCard);
