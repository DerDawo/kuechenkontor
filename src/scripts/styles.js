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