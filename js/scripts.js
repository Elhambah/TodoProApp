const themeSwitcher = document.getElementById("theme-switcher");
const addBtn = document.getElementById("add-btn");
const inputAddt = document.getElementById("addt");
const bodyThem =document.querySelector("body");
const ulElement=document.querySelector("ul");


function main(){
//them switcher

themeSwitcher.addEventListener("click", ()=>{
  bodyThem.classList.toggle("light")
  const themeImg=themeSwitcher.children[0];
  themeImg.setAttribute("src" ,
    themeImg.getAttribute("src")==="./assets/images/icon-sun.svg" 
    ? "./assets/images/icon-moon.svg" 
    : "./assets/images/icon-sun.svg" );
});

createAddElment(JSON.parse(localStorage.getItem("todo")));;

ulElement.addEventListener("dragover",(e)=>{
e.preventDefault();
if( e.target.classList.contains("card") &&
   !e.target.classList.contains("dragging"))
   {
const dragg=document.querySelector(".dragging");
const cardlist=[...ulElement.querySelectorAll(".card")];
const currentIndex=cardlist.indexOf(dragg);
const newIndex=cardlist.indexOf(e.target);
if( currentIndex > newIndex ){
    ulElement.insertBefore(dragg,e.target); 
}
else{
ulElement.insertBefore(dragg,e.target.nextsibiling);

}

}

})

// ul.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains("card") &&
//      !e.target.classList.contains("dragging")) {
//       const draggingCard = document.querySelector(".dragging");
//       const cards = [...ul.querySelectorAll(".card")];
//       const currentPos = cards.indexOf(draggingCard);
//       const newPos = cards.indexOf(e.target);
//       console.log(currentPos, newPos);
//       if (currentPos > newPos) {
//         ul.insertBefore(draggingCard, e.target);
//       } else {
//         ul.insertBefore(draggingCard, e.target.nextSibling)
//       }
//       const todos = JSON.parse(localStorage.getItem("todos"));
//       const removed = todos.splice(currentPos, 1);
//       todos.splice(newPos, 0, removed[0]);
//       localStorage.setItem("todos", JSON.stringify(todos));

//     }
//   });






addBtn.addEventListener("click",()=>{
const item=inputAddt.value.trim();
if(item)
{
    inputAddt.value="";
    const todo=( !localStorage.getItem("todo")
        ?[]
        :JSON.parse(localStorage.getItem("todo")) );

        const currentodo={
            item:item,
            iscompleted:false,
        };
todo.push(currentodo);
localStorage.setItem("todo",JSON.stringify(todo));
}}
);}

function createAddElment(arrayTodos){

  if(!arrayTodos) {return null;} 

  arrayTodos.forEach(todoObject => {
   const card=document.createElement("li");
   const cbContainer=document.createElement("div");
   const cbInput=document.createElement("input");
   const check=document.createElement("span");
   const item=document.createElement("p");
   const clearBtn=document.createElement("button");
   const img=document.createElement("img");

    card.classList.add("card");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    check.classList.add("check");
    item.classList.add("item");
    clearBtn.classList.add("clear");
   
    card.setAttribute("draggable", true);
    cbInput.setAttribute("type","checkbox");
    img.setAttribute("src","./assets/images/icon-cross.svg");
    img.setAttribute("alt","Clear it");
    item.textContent=todoObject.item;
    //append
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    clearBtn.appendChild(img);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(clearBtn);
    document.querySelector(".todos").appendChild(card);

   card.addEventListener("dragstart",()=>{
     card.classList.add("dragging")
   });

   card.addEventListener("dragend",()=>{
    card.classList.remove("dragging")
  });


    
  });

}


document.addEventListener("DOMContentLoaded",main)