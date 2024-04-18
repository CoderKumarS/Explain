
var tl = gsap.timeline();
tl.from('#left', {
    x: -500,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.2
})
tl.from('#right, #right h1', {
    x: 500,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 1
})
tl.to("#right input, #right label, #right div", {
    y: 0,
    opacity: 1,
    delay: 0.5,
    duration: 0.5,
    stagger: 0.2
})

document.querySelector('.profile').addEventListener('click', function () {
    document.querySelector('#profile').click();
})