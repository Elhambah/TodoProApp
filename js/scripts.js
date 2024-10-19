const themeSwitcher = document.getElementById("theme-switcher");
const addBtn = document.getElementById("add-btn");
const inputAddt = document.getElementById("addt");
const bodyThem = document.querySelector("body");
const ulElement = document.querySelector("ul");
const itemCount = document.querySelector("#items-left");
const filter = document.querySelector(".filter");
const btnFilter=document.querySelector("#clear-completed");



function main() {
  //them switcher

  themeSwitcher.addEventListener("click", () => {
    bodyThem.classList.toggle("light");
    const themeImg = themeSwitcher.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg"
    );
  });

  createAddElment(JSON.parse(localStorage.getItem("todo")));

  ulElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("card") &&
      !e.target.classList.contains("dragging")
    ) {
      const dragg = document.querySelector(".dragging");
      const cardlist = [...ulElement.querySelectorAll(".card")];
      const currentIndex = cardlist.indexOf(dragg);
      const newIndex = cardlist.indexOf(e.target);
      if (currentIndex > newIndex) {
        ulElement.insertBefore(dragg, e.target);
      } else {
        ulElement.insertBefore(dragg, e.target.nextsibiling);
      }
      const todo = JSON.parse(localStorage.getItem("todo"));
      const currentUl = todo.splice(currentIndex, 1);
      todo.splice(newIndex, 0, currentUl[0]);
      localStorage.setItem("todo", JSON.stringify(todo));
    }
  });

  addBtn.addEventListener("click", () => {
    console.log("1");
    const item = inputAddt.value.trim();
    if (item) {
      console.log("2");
      inputAddt.value = "";
      const todo = !localStorage.getItem("todo")
        ? []
        : JSON.parse(localStorage.getItem("todo"));

      const currentodo = {
        item: item,
        iscompleted: false,
      };
      todo.push(currentodo);
      localStorage.setItem("todo", JSON.stringify(todo));
      createAddElment([currentodo]);
      console.log("2");
    }
  });

  inputAddt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      addBtn.click();
    }
  });

  filter.addEventListener('click',(e) => {
    const id = e.target.id;
 
    if(id){
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className=`todos ${id}`;
    }

  });

  btnFilter.addEventListener("click",()=>{
var deleteIndex=[];
document.querySelectorAll(".card.checked").forEach((card)=>
  {
deleteIndex.push([...document.querySelectorAll(".todos .card")].indexOf(card));
card.classList.add("fall");
card.addEventListener('animationend', () => {
  card.remove();
});
  });

removeMultiChose(deleteIndex);

  });

}

function removeTodo(index) {
  const todo = JSON.parse(localStorage.getItem("todo"));
  todo.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo));
}



function removeMultiChose(indexes){
 console.log(11);
  var todo = JSON.parse(localStorage.getItem("todo"));
  todo= todo.filter((t,index)=>{
    console.log(12);
    return !indexes.includes(index);

});
localStorage.setItem("todo",JSON.stringify(todo))

}

function statToda(index, iscompleted) {
  const todo = JSON.parse(localStorage.getItem("todo"));
  todo[index].iscompleted = iscompleted;
  localStorage.setItem("todo", JSON.stringify(todo));
}

function createAddElment(arrayTodos) {

  if (!arrayTodos) {
    return null;
  }

  arrayTodos.forEach((todoObject) => {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const clearBtn = document.createElement("button");
    const img = document.createElement("img");

    card.classList.add("card");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    check.classList.add("check");
    item.classList.add("item");
    clearBtn.classList.add("clear");

    card.setAttribute("draggable", true);
    cbInput.setAttribute("type", "checkbox");
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear it");
    item.textContent = todoObject.item;
    if (todoObject.iscompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }

    //append
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    clearBtn.appendChild(img);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(clearBtn);
    document.querySelector(".todos").appendChild(card);

    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    cbInput.addEventListener("click", (e) => {
      const currentCard = cbInput.parentElement.parentElement;
      const checkBoxc = cbInput.checked;
      const indexCurrentCard = [
        ...document.querySelectorAll(".todos .card"),
      ].indexOf(currentCard);
      statToda(indexCurrentCard, checkBoxc);
      checkBoxc
        ? currentCard.classList.add("checked")
        : currentCard.classList.remove("checked");
      itemCount.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });

    clearBtn.addEventListener("click", (e) => {
      const currentCard = clearBtn.parentElement;
      currentCard.classList.add("fall");
      const indextCurrentCard = [
        ...document.querySelectorAll(".todos card "),
      ].indexOf(currentCard);

      removeTodo(indextCurrentCard);
      currentCard.addEventListener("animationend", () => {
        setTimeout(() => {
          currentCard.remove();
          itemCount.textContent = document.querySelectorAll(
            ".todos .card:not(.checked)"
          ).length;
        }, 100);
      });

      itemCount.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });
  });
  itemCount.textContent = document.querySelectorAll(
    ".todos .card:not(.checked)"
  ).length;
}

document.addEventListener("DOMContentLoaded", main);
