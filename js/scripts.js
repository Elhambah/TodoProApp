const themeSwitcher = document.getElementById("theme-switcher");
const addBtn = document.getElementById("add-btn");
const inputAddt = document.getElementById("addt");
const bodyThem =document.querySelector("body");


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
    
  });

}


document.addEventListener("DOMContentLoaded",main)