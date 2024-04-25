function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,

        // for tablet smooth
        tablet: { smooth: true },

        // for mobile
        smartphone: { smooth: true }
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
function loadingAnimation() {
    var tl = gsap.timeline()
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("#nav", {
        opacity: 0,
        delay: -0.2,
        y: -50
    })
    tl.from("#page1 div h1, #page1 div p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: {
            amount: 0.5
        },
        y: 150
    })
}
function scrollAnimation() {
    gsap.to("section h2", {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        y: 0,
        scrollTrigger: {
            trigger: "section h2",
            scroller: "#main",
            start: "top 90%",
            end: "top 90%",
            scrub: true
        }
    })
    gsap.to("section div div", {
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#features",
            scroller: "#main",
            start: "top 70%",
            end: "top 70%",
            scrub: true
        },
        stagger: {
            amount: 0.5
        }
    });
}
function zommingAnimation() {
    var rightElems = document.querySelectorAll("#features div")
    rightElems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem, {
                scale: 1.1,
                duration: 0.1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem, {
                scale: 1,
                duration: 0.1
            })
        })
    })
}
function cursorAnimation() {
    let elem = document.querySelector("#page1")
    elem.addEventListener("mouseenter", function () {
        gsap.to(elem.childNodes[3], {
            opacity: 1,
            scale: 1
        })
    })
    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.childNodes[3], {
            opacity: 0,
            scale: 0
        })
    })
    elem.addEventListener("mousemove", function (dets) {

        gsap.to(elem.childNodes[3], {
            x: dets.x - elem.getBoundingClientRect().x - 240,
            y: dets.y - elem.getBoundingClientRect().y - 506
        })
    })
}
function darkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.querySelectorAll("section");

    themeToggle.addEventListener('click', function () {
        body.forEach(bd => {
            bd.classList.toggle('bg-white');
            if(bd.classList.contains('text-white')){
                bd.classList.add('text-gray-900');
                bd.classList.remove('text-white');
            }else{
                bd.classList.add('text-white');
                bd.classList.remove('text-gray-900');
            }
        });
    });
}
locomotiveAnimation();
loadingAnimation();
scrollAnimation();
zommingAnimation();
cursorAnimation();
darkMode();