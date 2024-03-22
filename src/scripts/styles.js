window.addEventListener("scroll", fadeInOnScroll, false);

const materialNavOptions = document.getElementsByClassName("material-nav-container")[0].querySelectorAll("input");
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

materialNavOptions[0].click()

function fadeInOnScroll(){
    const pageTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const pageBottom = pageTop + window.innerHeight;
    const fade_ins = document.getElementsByClassName("fade-in");
  
    for (var i = 0; i < fade_ins.length; i++) {
      const fade_in = fade_ins[i];
      if (fade_in.offsetTop < pageBottom) {
        fade_in.classList.add("visible");
      } 
      else {
        fade_in.classList.remove("visible");
      }
    }
}