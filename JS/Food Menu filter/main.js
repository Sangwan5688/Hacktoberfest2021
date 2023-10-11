let btns = document.querySelectorAll(".btn");
let boxMenu = document.querySelectorAll(".box-menu");
btns = Array.from(btns);
let ac = document.querySelectorAll(".active");
btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    let filter = e.target.dataset.filter;
    boxMenu.forEach((item) => {
      item.classList.remove("active");
      if (item.classList.contains(filter)) {
        item.classList.add("active");
      }
    });
  });
});
