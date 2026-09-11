(function ($) {
    "use strict";

    /* image top-buttom scroll js */
    var image = document.getElementsByClassName('thumbnail');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });
    
    var image = document.getElementsByClassName('thumbnail2');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)',
        orientation: 'down'
    });
    

})(window.jQuery);


/* progresbar js */
const block = document.querySelectorAll('.block');
window.addEventListener('load', function () {
    block.forEach(item => {
        let numElement = item.querySelector('.num');
        let num = parseInt(numElement.innerText);
        let count = 0;
        let time = 2000 / num;
        let circle = item.querySelector('.circle');
        setInterval(() => {
            if (count == num) {
                clearInterval();
            } else {
                count += 1;
                numElement.innerText = count;
            }
        }, time)
        circle.style.strokeDashoffset
            = 503 - (503 * (num / 100));

    })
});


/* imager scroll animation */
let new_class_name_elements = document.querySelectorAll(".new_img-animet");
new_class_name_elements.forEach((new_class_name_element) => {
    let image = new_class_name_element.querySelector("img");
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: new_class_name_element,
            start: "top 50%",
        }
    });

    tl.set(new_class_name_element, { autoAlpha: 1 });
    tl.from(new_class_name_element, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out
    });
});
