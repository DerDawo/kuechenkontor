window.addEventListener("scroll", fadeInOnScroll, false);
window.addEventListener("load", fadeInOnLoad, false);

function fadeInOnScroll() {
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

function fadeInOnLoad() {
  const fade_ins = document.getElementsByClassName("fade-in-load");

  for (var i = 0; i < fade_ins.length; i++) {
    const fade_in = fade_ins[i];
    fade_in.classList.add("visible");
  }
}