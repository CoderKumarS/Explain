gsap.to(".sideNav1 li",{
    delay:0.5,
    duration:1,
    y:0,
    opacity:1,
    stagger:0.2
})
gsap.to('.sideNav1', {
    y: 0,
    duration: 0.5,
    delay:0.1,
    opacity: 1
});
gsap.from('.sideNav2', {
    x: -1000,
    duration: 2
});
gsap.from('.Chat', {
    x: 2000,
    duration: 2
});