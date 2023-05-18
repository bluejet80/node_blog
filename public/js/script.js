const allButtons = document.querySelectorAll(".searchBtn");
const searchBar = document.querySelector(".searchBar");
const searchInput = document.getElementById("searchInput");
const closeBtn = document.getElementById("searchClose");

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function () {
    searchBar.style.visibility = "visible";
    searchBar.classList.add("open");
    this.setAttribute("aria-expanded", "true");
    searchInput.focus();
  });
}

closeBtn.addEventListener("click", function () {
  searchBar.classList.remove("open");
  searchBar.style.visibility = "hidden";
  allButtons.forEach((el) => el.setAttribute("aria-expanded", "false"));
});
