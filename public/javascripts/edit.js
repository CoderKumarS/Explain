var tl = gsap.timeline();
tl.from(".container", {
    opacity: 0,
    delay: 0.5,
    duration: 1,
    stagger: {
        amount: 1
    },
    y: -150, ease: "power2.out"
});
tl.from(".container div", {
    duration: 0.5,
    x: -50,
    opacity: 0,
    stagger: 0.2
})
tl.from(".container button", {
    duration: 1,
    scale: 0,
    opacity: 0,
    delay: 0.2
})
document.querySelector("#pic img").addEventListener("click", function () {
    document.getElementById("image").click();
});
document.querySelector("#picUpload input").addEventListener("change", function () {
    document.getElementById("picUpload").submit();
});