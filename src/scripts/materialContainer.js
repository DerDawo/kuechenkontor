const materialNavOptions = document.getElementsByClassName("material-nav-container")[0].querySelectorAll("input");
for (const mnO of materialNavOptions) {
  mnO.addEventListener("click", showMaterialContainerDiv)
}

function showMaterialContainerDiv() {
  const materialContainerDivs = document.getElementsByClassName("material-display-container")[0].getElementsByTagName("div")
  const activeMaterialContainerDiv = document.getElementsByClassName("material-display-container")[0].querySelector(`[data-for="${this.id}"]`)

  for (const mcD of materialContainerDivs) {
    if (mcD == activeMaterialContainerDiv) {
      mcD.classList.add("show-data")
    } else {
      mcD.classList.remove("show-data")
    }
  }
}

materialNavOptions[0].click()