const themeSwitcher = document.getElementById("theme-switcher")
const addBtn = document.getElementById("add-btn")
const inputAddt = document.getElementById("addt")
const bodyThem =document.querySelector("body")


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

addBtn.addEventListener("click",()=>{
const item=inputAddt.ariaValueMax.trim();
if(item)
{
    inputAddt.value="";
    const todo=( !localStorage.getItem("todo")
        ?[]
        :JSON.parse(localStorage.getItem("todo")) )

        const currentodo={
            item:item,
            iscompleted:false
        }
todo.push(currentodo)
localStorage.setItem("todo",JSON.stringify(todo))

}

}

)

}

document.addEventListener("DOMContentLoaded",main)