
(function(window, document) {

  // Removed animation reliance on GSAP, just vanilla JS remains.
  // Perhaps factory this to allow alternative filters too?
  
  const dataAttr = "data-filter";
  const cls = "-clicked";
  const filters = document.querySelectorAll("[" + dataAttr + "]");
  let i = filters.length;
  
  // Dimensions of ripple image displacement map (512px square),
  // Plus a little to overshoot perhaps.
  // A higher value is required to accomodate diagonals.
  const span = 512;

  // Increment dimensions on each animation loop, 
  // consider as animation speed, best: 1 - 8
  const step = 2;

  // Scale from 0 - 30 - not so large that you can tell the map edges
  const maxScale = 30;


  function ripple_filter (feImage, feDisplacementMap, size, x, y) {

    feImage.setAttribute("width", size);
    feImage.setAttribute("height", size);
    feImage.setAttribute("x", x - (size / 2));
    feImage.setAttribute("y", y - (size / 2));
    feDisplacementMap.setAttribute("scale", maxScale - (size / 20));

    if (size < span) {
      requestAnimationFrame(
        function() {
          ripple_filter (feImage, feDisplacementMap, size + step, x, y);
        }
      );
    }

  }

  function removeStyles (filter) {

    // remove visually active filters
    const btnOns = document.querySelectorAll("[style*='#" + filter.id + "']");
    let i = btnOns.length;
    while (i--) {
      
      // removes the visual ripple effect 
      // but doesn't stop the filters values changing
      btnOns[i].removeAttribute("style");
    }

  }
  
  function classAnimation(btn) {
    // A separate CSS animation controlled via class
    btn.classList.add(cls);
    setTimeout(function () {
      requestAnimationFrame(
        function () {
          btn.classList.remove(cls);
        }
      );
    }, 300);
  }

  function displace_this (e) {

    const btn = e.target;
    
    // Defined here to save refactoring in each animation loop
    const filtername = btn.getAttribute(dataAttr);
    const filter = document.getElementById(filtername);

    if (filter) {

      removeStyles(filter);
      
      //console.log(btn.width)
      
      // Use object centre if click-point is out of range (keyboard-friendly)
      const offsetX = e.offsetX >= 0 ? e.offsetX : btn.offsetWidth / 2;
      const offsetY = e.offsetY >= 0 ? e.offsetY : btn.offsetHeight / 2;
      
      const feImage = filter.querySelector("feImage");
      const feDisplacementMap = filter.querySelector("feDisplacementMap");

      if (feImage && feDisplacementMap) {
        btn.style.filter = "url('#" + filter.id + "')";
        ripple_filter(feImage, feDisplacementMap, 0, offsetX, offsetY);
      }
      
      classAnimation(btn);
    }
  }

  while (i--) {
    filters[i].addEventListener("click", displace_this, false);
  }

}(window, document));