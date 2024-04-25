function animation() {
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
        duration: 0.5,
        scale: 0,
        opacity: 0,
        stagger: {
            amount: 1
        }
    })
}
function navbarWorking() {
    document.addEventListener('DOMContentLoaded', function () {
        const navbarToggler = document.getElementById('navbarToggler');
        const navbarNav = document.getElementById('navbarNav');

        navbarToggler.addEventListener('click', function () {
            navbarNav.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        const groups = document.querySelectorAll('.group');

        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                groups.forEach(function (group) {
                    if (group.classList.contains(target)) {
                        group.classList.add('active');
                    } else {
                        group.classList.remove('active');
                    }
                });
            });
        });
    });

}
function clickEvent() {
    document.querySelector("#pic .img").addEventListener("click", function () {
        document.getElementById("image").click();
    });
    document.querySelector("#picUpload input").addEventListener("change", function () {
        document.getElementById("picUpload").submit();
    });
}
function submitContact(){
    const contactValue = document.getElementById('contactInput').value;
    let clutter = "";
    axios.put(`/contact/${contactValue}`).then(function (data) {
        clutter = "";
        clutter += `<div class="form-group">
                        <input class="input" type="text" name="contact" value="${data.data}">
                        <label for="contact">Contact: </label>
                    </div>`;
        skillValue.value = "";
        document.querySelector('.contact-group').appendChild = clutter;
    });
}
function submitSkill(){
    const skillValue = document.getElementById('skillInput').value;
    let clutter = "";
    axios.put(`/skill/${skillValue}`).then(function (data) {
        clutter = "";
        data.data.forEach(function (elem) {
            clutter += `<div class="form-group">
                            <input class="input" type="text" name="skill" value="${elem.skill}">
                            <label for="skill">Skill: </label>
                        </div>`;
        });
        skillValue.value = "";
        document.querySelector('.skill-group').appendChild = clutter;
    });
}
function submitLanguage(){
    const langValue = document.getElementById('languageInput').value;
    let clutter = "";
    axios.put(`/language/${langValue}`).then(function (data) {
        clutter = "";
        data.data.forEach(function (elem) {
            clutter += `<div class="form-group">
                            <input class="input" type="text" name="language" value="${elem.language}">
                            <label for="language">Language: </label>
                        </div>`;
        });
        skillValue.value = "";
        document.querySelector('.language-group').appendChild = clutter;
    });
}
clickEvent();
navbarWorking();
animation();