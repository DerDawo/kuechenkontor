const nav = document.querySelector("nav")

let scrollTop = 0

function changeNav() {
    scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    console.log(scrollTop)

    if (scrollTop > 100) {
        hoverNav()
    } else {
        unhoverNav()
    }
}

window.addEventListener("scroll", changeNav, false);

nav.addEventListener("mouseover",hoverNav)
nav.addEventListener("mouseleave",unhoverNav)

function hoverNav(){
    nav.classList.add("hover")
}
function unhoverNav(){
    if(scrollTop > 100) return
    nav.classList.remove("hover")
}

const materialNavOptions = document.getElementsByClassName("material-nav-container")[0].querySelectorAll("input");
console.log(materialNavOptions)
for(const mnO of materialNavOptions){
    mnO.addEventListener("click",showMaterialContainerDiv)
}

function showMaterialContainerDiv(){
    const materialContainerDivs = document.getElementsByClassName("material-display-container")[0].getElementsByTagName("div")
    const activeMaterialContainerDiv = document.getElementsByClassName("material-display-container")[0].querySelector(`[data-for="${this.id}"]`)

    for(const mcD of materialContainerDivs){
        if(mcD == activeMaterialContainerDiv){
            mcD.classList.add("show-data")
        } else {
            mcD.classList.remove("show-data")
        }
    }
    
}