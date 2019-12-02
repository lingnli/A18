const navTitle = document.querySelector(".title");

//navbar 特效
navTitle.addEventListener("mouseover", e => {
  console.log(e);
  navTitle.innerHTML += `<i class="dollars fas fa-search-dollar"></i>`;
});

navTitle.addEventListener("mouseout", e => {
  console.log(navTitle.childNodes[1]);
  navTitle.childNodes[1].remove();
});
