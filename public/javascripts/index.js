function animation() {
    var tl = gsap.timeline();
    document.addEventListener('DOMContentLoaded', function () {
        tl.from('#container', {
            duration: 1,
            scale: 0,
            opacity: 0
        })
        var tag = (document.querySelector("#container").offsetWidth > 1000) ? '#left' : '#right';
        tl.from(tag, {
            x: -500,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.inOut'
        })
        tl.from('#right h1, #right p', {
            duration: 0.5,
            scaleY: 0,
            ease: 'expo.inOut',
            delay: 0.5,
            stagger: 0.2
        });
        tl.from('#right .input', {
            opacity: 0,
            y: 40,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.2,
            delay: 0.2
        });
    });
}
animation();
const specialButtons = document.querySelectorAll('.specialButton');
specialButtons.forEach(function (button) {
    const link = button.querySelector('a');
    button.addEventListener('click', function (event) {
        link.click();
    });
});
const success = document.querySelector('.error');
if(success.textContent === 'Password reset successfully') {
    success.style.backgroundColor= "rgba(0, 255, 0, 0.2)";
    success.style.border= "1px solid #70b870";
    success.style.color= "green";
}
if (success) {
    setTimeout(function () {
        gsap.to(success, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scaleY: 0,
            onComplete: function () {
                success.style.display = 'none';
            }
        });
    }, 6000);
}