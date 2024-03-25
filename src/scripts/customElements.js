class PrettyInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const prettyInput = this;
    // Standardtype
    const type =
      this.getAttribute("type") != "text" ? this.getAttribute("type") : "text";
    const labelContent =
      this.getAttribute("label") == "" ? "" : this.getAttribute("label");
    const placeholderContent =
      this.getAttribute("placeholdedr") == ""
        ? ""
        : this.getAttribute("placeholder");

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create the div
    const div = document.createElement("div");
    div.setAttribute("class", "customInput");

    // Create Input
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("class", "customInputField");
    input.setAttribute("placeholder", placeholderContent);

    const textArea = document.createElement("textarea");
    textArea.setAttribute("class", "customInputField");
    textArea.setAttribute("placeholder", placeholderContent);

    // Create Label
    const label = document.createElement("label");
    label.setAttribute("class", "customInputLabel");
    label.innerHTML = `${labelContent}`;

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
  
        .customInput{
          font-family: "Roboto Condensed", sans-serif;
          padding: 10px;
          border: 1px solid black;
          border-radius: 0;
          position: relative;
          background-color: white;
          
        }
  
        .customInput > .customInputField{
        font-family: "Roboto Condensed", sans-serif;
          margin: 0;
          padding: 0;
          width: calc(100% - 20px);
          border: 0;
          position: absolute;
          top: 10px;
          left: 10px;
          outline: 0;
          font-size: 14px;
        }
  
        .customInput > .customInputLabel{
        font-family: "Roboto Condensed", sans-serif;
          z-index: 1;
          position: absolute;
          top: -4px;
          left: 5px;
          padding: 0 5px;
          background-color: white;
          font-size: 10px;
          opacity: 0;
          transition: 0.2s;
        }
        
        textArea{
        font-family: "Roboto Condensed", sans-serif;
          box-sizing: border-box;
          resize: none;
          font-size: 14px;
        }
  
        .customInput > .customInputField:not(:placeholder-shown) ~ .customInputLabel{
  
          opacity: 1;
          top: -8px;
        }
  
        .customInput > .customInputField:focus ~ .customInputLabel{
          opacity: 1;
          top: -8px;
        }
      `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(div);

    let divHeight = 0;
    let divWidth = 0;

    if (type == "textarea") {
      div.appendChild(textArea);
      divHeight = textArea.offsetHeight;
      divWidth = textArea.offsetWidth;
    } else {
      div.appendChild(input);
      divHeight = input.offsetHeight;
      divWidth = input.offsetWidth;
    }

    //div.style.width = divWidth + "px";
    div.style.height = divHeight + "px";
    div.appendChild(label);

    textArea.addEventListener("change", setDataToParent);
    textArea.addEventListener("input", setDataToParent);
    input.addEventListener("change", setDataToParent);
    input.addEventListener("input", setDataToParent);
    function setDataToParent() {
      prettyInput.setAttribute("value", this.value);
    }
  }
}
customElements.define("pretty-input", PrettyInput);

class PrettyButton extends HTMLElement {
  constructor() {
    super();
  }

  disable() {
    this.setAttribute("disabled", "true")
  }

  enable() {
    this.setAttribute("disabled", "false")
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    //Generate an ID
    const id = Date.now();
    // Create a Wrapper Div
    const div = document.createElement("div");
    div.setAttribute("class", "pretty-button-div");
    // Create a label
    const label = document.createElement("label");
    label.setAttribute("for", `pretty-button-${id}`);
    label.setAttribute("class", "pretty-button-label");
    label.innerHTML = this.getAttribute("value");
    // Create a Button
    const button = document.createElement("button");
    button.setAttribute("id", `pretty-button-${id}`);
    button.setAttribute("class", `pretty-button-button`);
    // Create style
    const style = document.createElement("style");
    style.textContent = `
        .pretty-button-div{
          width: calc(100% - 2px);
          margin: 0;
          display: flex;
          padding: 10px 0;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
          cursor: pointer;
          background-image: linear-gradient(black,black);
          background-repeat: no-repeat;
          background-size: 0 100%;
          transition: 0.4s;
        }
        
        .pretty-button-div:hover{
          background-size: 100% 100%;
         }
        
         .pretty-button-label{
          cursor: pointer;
          transition: 0.4s;
         }
        
        .pretty-button-div:hover > .pretty-button-label{
          color: white;
         } 
  
         .pretty-button-button{
          display: none;
         }
      `;

    shadow.appendChild(style);
    shadow.appendChild(div);
    div.appendChild(label);
    div.appendChild(button);
  }
}
customElements.define("pretty-button", PrettyButton);

class SimpleCaptcha extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const simpleCaptcha = this;
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    // Create the Calculation, which you ask to check for
    const numbers = "0123456789";
    const operations = ["+", "&#10006;"];
    const first = Number(
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    );
    const second = Number(
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    );
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const calculation = `${first} ${operation} ${second} = `;
    let result = 0;
    if (operation == "+") {
      result = first + second;
    }
    if (operation == "&#10006;") {
      result = first * second;
    }
    // Create a Label
    const label_info = document.createElement("label");
    label_info.innerHTML = `Bestätigen Sie, dass Sie kein Roboter sind: `;
    const label_calculation = document.createElement("label");
    label_calculation.innerHTML = `${calculation}`;
    // Create a Input
    const input = document.createElement("input");
    input.setAttribute("id", "simple-captcha");
    input.setAttribute("placeholder", " ");
    input.setAttribute("type", "number");
    input.setAttribute("min", "-999");
    input.setAttribute("max", "-999");
    input.setAttribute("pattern", result);
    input.setAttribute("data-right", false);
    input.addEventListener("input", checkDataResult);
    input.addEventListener("change", checkDataResult);
    function checkDataResult() {

      if (this.value == this.getAttribute("pattern")) {
        this.setAttribute("data-right", true);
        simpleCaptcha.setAttribute("checked", true);
      } else {
        this.setAttribute("data-right", false);
        simpleCaptcha.setAttribute("checked", false);
      }
    }
    const style = document.createElement("style");
    style.textContent = `
        #simple-captcha{
          border: 1px solid black;
          outline: none;
          width: 40px;
          text-align: center;
        }
  
        #simple-captcha::-webkit-outer-spin-button,
        #simple-captcha::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
  
        #simple-captcha {
            -moz-appearance:textfield;
        }
        
        #simple-captcha[data-right="true"]{
          background-color: #00800080;
        }
        
        #simple-captcha[data-right="false"]{
          background-color: #FF000080;
        }
        
        #simple-captcha:placeholder-shown{
          background-color: #FFFFFF;
        }
        
        @media only screen and (max-width: 480px){
          label:first-of-type{
            grid-column: 1 / 3; 
          }
      
          label:nth-of-type(2){
            text-align: end; 
          }
        }
        
      `;
    this.appendChild(shadow);
    shadow.appendChild(style);
    shadow.appendChild(label_info);
    shadow.appendChild(label_calculation);
    shadow.appendChild(input);
  }
}
customElements.define("simple-captcha", SimpleCaptcha);

class SimpleTermsOfService extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const simpleTermsOfService = this;

    const linkToTermsOfService =
      this.getAttribute("terms-link") == ""
        ? ""
        : this.getAttribute("terms-link");

    if (linkToTermsOfService == "") {
      console.error("No Link set for the Terms Of Service!");
      return;
    }

    const linkToDSGVO =
      this.getAttribute("dsgvo-link") == ""
        ? ""
        : this.getAttribute("dsgvo-link");

    if (linkToDSGVO == "") {
      console.warn("No Link set for the DSGVO!");
    }

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    // Create Checkbox
    let id = Date.now();
    const input = document.createElement("input");
    input.setAttribute("id", `termsOfServiceInput-${id}`);
    input.setAttribute("type", "checkbox");
    input.addEventListener("click", toggleTerms);
    function toggleTerms() {
      if (this.checked == true) {
        simpleTermsOfService.setAttribute("checked", true);
      } else {
        simpleTermsOfService.setAttribute("checked", false);
      }
    }
    // Create Label
    const label = document.createElement("label");
    label.setAttribute("for", input.getAttribute("id"));
    label.innerHTML = `Ich bin mit den <a href="${linkToTermsOfService}">ABG</a> und der <a href="${linkToDSGVO}">DSGVO</a> einverstanden.`;

    const style = document.createElement("style");
    style.textContent = `
        label{
          text-align: center;
        }    
      `;
    this.appendChild(shadow);
    shadow.appendChild(style);
    shadow.appendChild(input);
    shadow.appendChild(label);
  }
}
customElements.define("simple-terms-of-service", SimpleTermsOfService);

class SimpleContactForm extends HTMLElement {
  constructor() {
    super();
    this.value = null;
  }

  connectedCallback() {
    const simpleContactForm = this;
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    // The ID is a Time Stamp
    const ID = Date.now()
    // Create the Wrapper Div
    const div = document.createElement("div");
    div.setAttribute("class", "contact-form");
    // Create the Pretty-Inputs
    const surname = document.createElement("pretty-input");
    surname.setAttribute("placeholder", "Nachname");
    surname.setAttribute("label", "Nachname");
    surname.setAttribute("id", `surname-pI-${ID}`);
    surname.setAttribute("data-type", `surname`);
    const firstname = document.createElement("pretty-input");
    firstname.setAttribute("placeholder", "Vorname");
    firstname.setAttribute("label", "Vorname");
    firstname.setAttribute("id", `firstname-pI-${ID}`);
    firstname.setAttribute("data-type", `firstname`);
    const email = document.createElement("pretty-input");
    email.setAttribute("placeholder", "Email");
    email.setAttribute("label", "Email");
    email.setAttribute("id", `email-pI-${ID}`);
    email.setAttribute("data-type", `email`);
    const personalMessage = document.createElement("pretty-input");
    personalMessage.setAttribute(
      "placeholder",
      "Bitte geben Sie hier Ihre persönliche Mitteilung ein."
    );
    personalMessage.setAttribute("label", "Persönliche Mitteilung.");
    personalMessage.setAttribute("type", "textarea");
    personalMessage.setAttribute("id", `personalMassage-pI-${ID}`);
    personalMessage.setAttribute("data-type", `personalMessage`);
    const simpleCaptcha = document.createElement("simple-captcha");
    simpleCaptcha.setAttribute("id", `captcha-${ID}`);
    simpleCaptcha.setAttribute("data-type", `captcha`);
    const simpleTermsOfService = document.createElement("simple-terms-of-service");
    simpleTermsOfService.setAttribute("id", `termsOfService-${ID}`);
    simpleTermsOfService.setAttribute("data-type", `terms`);
    simpleTermsOfService.setAttribute("terms-link", this.getAttribute("terms-link"));
    simpleTermsOfService.setAttribute("dsgvo-link", this.getAttribute("dsgvo-link"));
    const sendRequest = document.createElement("pretty-button");
    sendRequest.setAttribute("id", `send-request-${ID}`);
    sendRequest.setAttribute("value", "Anfrage absenden");
    sendRequest.disable();
    sendRequest.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission
      this.handleSubmit();
    });

    surname.addEventListener("input", setDataToParent);
    firstname.addEventListener("input", setDataToParent);
    email.addEventListener("input", setDataToParent);
    personalMessage.addEventListener("input", setDataToParent);
    simpleCaptcha.addEventListener("input", setDataToParent);
    simpleTermsOfService.addEventListener("input", setDataToParent);
    surname.addEventListener("change", setDataToParent);
    firstname.addEventListener("change", setDataToParent);
    email.addEventListener("change", setDataToParent);
    personalMessage.addEventListener("change", setDataToParent);
    simpleCaptcha.addEventListener("change", setDataToParent);
    simpleTermsOfService.addEventListener("change", setDataToParent);

    function setDataToParent() {
      let DATA;

      if (simpleContactForm.getAttribute("data") != null) {
        DATA = JSON.parse(simpleContactForm.getAttribute("data"))
      } else {
        DATA = {
          surname: "",
          firstname: "",
          email: "",
          personalMessage: "",
          captchaRight: "",
          termsChecked: "",
        };
      }

      const dataType = this.getAttribute("data-type")

      if (dataType == "surname") {
        DATA.surname = this.getAttribute("value")
      }
      if (dataType == "firstname") {
        DATA.firstname = this.getAttribute("value")
      }
      if (dataType == "email") {
        DATA.email = this.getAttribute("value")
      }
      if (dataType == "personalMessage") {
        DATA.personalMessage = this.getAttribute("value")
      }
      if (dataType == "captcha") {
        DATA.captchaRight = this.getAttribute("checked")
      }
      if (dataType == "terms") {
        DATA.termsChecked = this.getAttribute("checked")
      }

      sendRequest.disable()
      if (DATA.captchaRight === "true" && DATA.termsChecked === "true") {
        sendRequest.enable()
      }

      simpleContactForm.value = DATA
      simpleContactForm.setAttribute("data", JSON.stringify(DATA))

    }

    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
     
        .contact-form{
          font-family: "Roboto Condensed", sans-serif;
          display:grid;
          grid-template-columns: calc(50% - 10px) calc(50% - 10px);
          gap: 20px;
          margin: 20px;
        }
        
        @media only screen and (max-width: 480px){
          #surname-pI-${ID}{
            grid-column: 1 / 3;  
          }
          
          #firstname-pI-${ID}{
            grid-column: 1 / 3;  
          }
          
          #captcha-${ID}{
            display: grid !important;
            grid-template-columns: auto auto; 
          }
          
          #captcha-${ID} > label:first-of-type{
            grid-column: 1 / 3; 
          }
        }
        
        #email-pI-${ID}{
        font-family: "Roboto Condensed", sans-serif;
          grid-column: 1 / 3;  
        }
  
        #personalMassage-pI-${ID}{
        font-family: "Roboto Condensed", sans-serif;
          grid-column: 1 / 3;
        }
  
        #captcha-${ID}{
        font-family: "Roboto Condensed", sans-serif;
          grid-column: 1 / 3;
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 0 10px;
          justify-content: center;
        }
  
        #termsOfService-${ID}{
        font-family: "Roboto Condensed", sans-serif;
          grid-column: 1 / 3;
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 0 10px;
          justify-content: center;
        }
  
        #send-request-${ID}{
        font-family: "Roboto Condensed", sans-serif;
          grid-column: 1 / 3;
        }
        
        #send-request-${ID}[disabled="true"]{
          pointer-events: none;
          opacity: 0.5;
        }
      `;
    this.appendChild(shadow);
    shadow.appendChild(style);
    shadow.appendChild(div);
    div.appendChild(surname);
    div.appendChild(firstname);
    div.appendChild(email);
    div.appendChild(personalMessage);
    div.appendChild(simpleCaptcha);
    div.appendChild(simpleTermsOfService);
    div.appendChild(sendRequest);
  }

  handleSubmit() {
    this.dispatchEvent(new CustomEvent('simpleContactFormSubmitted'));
  }
}
customElements.define("simple-contact-form", SimpleContactForm);

/**
 window.addEventListener("load",function(){
     document.getElementById("simpleContactFormHere").addEventListener("simpleContactFormSubmitted",function(){
         console.log("HELLO")
         console.log(document.getElementById("simpleContactFormHere").value)
      })
  })
  *  */


class SimpleNavigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const ID = Date.now();

    const mobileButton = `<a data-type="mobile-button" id="open-menu-${ID}"><i class="fa-solid fa-bars"></i></a>`;
    const closeButton = `<a data-type="close-button" id="close-menu-${ID}">&#x2716;</a>`;
    const mobileNavMenu = `
      <div class="mobileNavMenu" id="nav-menu-${ID}">
        ${closeButton}
        ${this.innerHTML}
      </div>
      `

    this.innerHTML += mobileButton
    this.innerHTML += mobileNavMenu

    const simpleNavInnerHTML = this.innerHTML

    const style = document.createElement("style");
    style.textContent = `
        a[data-type="logo"] > img {
          height: 1.6rem;
          background-color: white;
          padding: 5px;
        }
      
        .mobileNavMenu > a[data-type="logo"] > img {
          height: 2rem;
          padding: 5px;
          margin-top: unset;
        }

        a[data-type="link"]{
          cursor: pointer;
        }
        
        a {
          color: var(--white);
          font-family: "Roboto", sans-serif;
          text-transform: uppercase;
          font-size: 1.6rem;
          text-decoration: none;
          background-image: linear-gradient(var(--underline-color), var(--underline-color));
          background-position: 0 100%;
          background-size: 0% 3px;
          background-repeat: no-repeat;
          transition: 0.2s;
          padding-bottom: 5px;
        }
  
        a[data-type="link"]:hover {
            color: black;
            background-size: 100% 3px;
        }
        
        a.hoveredNav {
            color: black;
        }
        
        a[data-type="logo"] {
            margin-right: auto;
        }
   
        a[data-type="mobile-button"] {
          display: none;
          position: absolute;
          right: var(--page-padding);
          text-align:center;
          padding:5px;
        }
              
        .mobileNavMenu{
          position: fixed;
          top: 0;
          left: 0;
          width: 100dvw;
          height: 100dvh;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateX(100%);
          transition: 0.3s;
          z-index: 9999;
        }
        
        .mobileNavMenu.openNavMenu{
          transform: translateX(0);
        }
        
        .mobileNavMenu > a:nth-of-type(2){
          border-top: 1px solid black;
        }
        
        .mobileNavMenu > a{
          width: 100%;
          color: var(--black);
          text-align: center;
          border-bottom: 1px solid black;
          padding: 20px 0;
        }
        
        a[data-type="close-button"]{
          position: fixed;
          top: 0;
          right: 0;
          border: none;
          width: 80px;
          height: 0;
          padding: 40px 0 40px 0;
          line-height: 0;
          cursor:pointer;
        }
        
        @media only screen and (max-width: 768px){
          a[data-type="mobile-button"]{
            display: unset;
          }
          
          a[data-type="link"]{
            display: none;
          }
          
          .mobileNavMenu > a[data-type="link"]{
            display: unset;
          }

          a[data-type="logo"] {
            margin-right: unset;
          }
        }
        
      `

    this.innerHTML = ``
    shadow.appendChild(style);
    shadow.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />`;
    shadow.innerHTML += simpleNavInnerHTML;

    shadow.getElementById(`open-menu-${ID}`).addEventListener("click", openMenu);
    shadow.getElementById(`close-menu-${ID}`).addEventListener("click", closeMenu);

    function openMenu() {
      shadow.getElementById(`nav-menu-${ID}`).classList.add("openNavMenu")
    }

    function closeMenu() {
      shadow.getElementById(`nav-menu-${ID}`).classList.remove("openNavMenu")
    }

    const nav = this
    let scrollTop = 0
    function changeNav() {
      scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > 100) {
        hoverNav()
      } else {
        unhoverNav()
      }
    }

    window.addEventListener("scroll", changeNav, false);
    nav.addEventListener("mouseover", hoverNav)
    nav.addEventListener("mouseleave", unhoverNav)

    function hoverNav() {
      nav.classList.add("hover")
      for (const c of shadow.querySelectorAll(`a[data-type="link"]`)) {
        c.classList.add("hoveredNav")
      }
      for (const c of shadow.querySelectorAll(`a[data-type="mobile-button"]`)) {
        c.classList.add("hoveredNav")
      }
    }
    function unhoverNav() {
      if (scrollTop > 100) return
      nav.classList.remove("hover")
      for (const c of shadow.querySelectorAll(`a[data-type="link"]`)) {
        c.classList.remove("hoveredNav")
      }
      for (const c of shadow.querySelectorAll(`a[data-type="mobile-button"]`)) {
        c.classList.remove("hoveredNav")
      }
    }

  }


}
customElements.define("simple-nav", SimpleNavigation);

class SimpleSequence extends HTMLElement{
  constructor(){
    super();
  }
  
  connectedCallback(){
    const shadow = this.attachShadow({ mode: "open" });
    
    const links = this.getElementsByTagName("link")[0];

    const progress = this.getElementsByTagName("progress")[0];
    progress.setAttribute("min",0);
    progress.setAttribute("max",100);
    
    const sequenceItemsHTMLCollection = this.getElementsByClassName("sequence-item");
    let sequenceItemsHTMLString = "";
    
    let i = 0;
    while (i < sequenceItemsHTMLCollection.length) {
      sequenceItemsHTMLString += sequenceItemsHTMLCollection[i].outerHTML
      i++;
    }
    
    const sequenceItemContainer = document.createElement("div");
    sequenceItemContainer.setAttribute("class","sequence-item-container")
    sequenceItemContainer.innerHTML = sequenceItemsHTMLString
        
    const style = document.createElement("style");
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

    progress, progress[value] {
      /* Reset the default appearance */
      -webkit-appearance: none;
       appearance: none;

      width: 250px;
      height: 20px;
    }

      progress, progress[value]{
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100vw - (100vw - 100%));
        height: 10px;
        border: none;
        background-color: transparent;
        z-index: 100000;
      }
      
      progress[value]::-webkit-progress-bar {
        background-color: var(--progress-color);
      }
      
      progress[value]::-moz-progress-bar { 
        background-color: var(--progress-color);
      }
            
      .sequence-item-container{
        font-family: "Roboto Condensed", sans-serif;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
        gap: 40px;
      }
      
      .sequence-item-header{
        font-size: 2rem;
        justify-self: center;
        display: flex;
        gap: 20px;
        align-items: center;
      }

      .sequence-item{
        border-radius: 10px;
        padding: 20px;
        background-color: white;
        margin: 5px 10px;
        background-color: #f7f7f7;
        display: grid;
        gap: 20px;
        justify-content: center;
      }
      
      .sequence-item-picture, .sequence-item-text{
        grid-column: 1 / 3;
      }

      .sequence-item-picture{
        display: flex;
        justify-content: center;
      }

      .sequence-item-text{
        max-width: 800px;
        justify-self: center;
        line-height: 3rem;
  font-size: 1.4rem;
      }
      
      .sequence-item-picture > img{
        aspect-ratio: 8 / 5;
        width: 100%;
        object-fit: cover;
        max-width: 500px; 
      }

      @media only screen and (max-width: 480px){
        .sequence-item-picture > img{
          max-width: 100%; 
        }
      }

    `
    
    
    this.innerHTML = ""
    this.appendChild(shadow);
    shadow.appendChild(links)
    shadow.appendChild(style);
    shadow.appendChild(progress);
    shadow.innerHTML += `
      ${sequenceItemContainer.outerHTML}
    `
    
    window.addEventListener("scroll",setProgressBarSize);
    function setProgressBarSize(){
      var h = document.documentElement, 
          b = document.body,
          st = 'scrollTop',
          sh = 'scrollHeight';

      var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
      
      shadow.querySelector("progress").setAttribute("value",percent)
    }

  } 
  
}
customElements.define("simple-sequence", SimpleSequence);