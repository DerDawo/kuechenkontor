function changeNav() {
    const navElement = document.querySelector("nav");
    const navAnchors = document.querySelectorAll("nav > a");

    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (scrollTop > 100) {
        navElement.style.backgroundColor = "var(--white)";
        navElement.style.boxShadow = "0 0 .5em rgba(0, 0, 0, .5)";
        for (const n of navAnchors) {
            n.style.color = "var(--black)"
        }
    } else {
        navElement.style.backgroundColor = "var(--transparent)";
        navElement.style.boxShadow = "unset";
        for (const n of navAnchors) {
            n.style.color = "var(--white)"
        }
    }
}

window.addEventListener("scroll", changeNav, false);