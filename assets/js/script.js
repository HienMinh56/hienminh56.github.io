// typing
var typed = new Typed('.typing', {
    strings: ["Web Developer", "Web Designer", "University Student", "Dreamer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
})

// aside menu
const nav = document.querySelector(".nav"),
    navList = document.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener('click', function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this)
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const taget = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + taget).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener('click', function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

$('body').keydown(function(e) {
    if(e.which==123 || (e.ctrlKey && e.shiftKey && (e.which == 73 || e.which == 75 || e.which == 67 || e.which == 74))){
        e.preventDefault();
        showForm();
    }
});

function showForm() {
    var form = document.createElement('div');
    form.style.position = 'fixed';
    form.style.top = '50%';
    form.style.left = '50%';
    form.style.transform = 'translate(-50%, -50%)';
    form.style.background = '#f8f9fa';
    form.style.border = '1px solid #ced4da';
    form.style.padding = '20px';
    form.style.zIndex = '10000';
    form.innerHTML = 'DevTools is disabled on this website!';
    document.body.appendChild(form);

    setTimeout(function() {
        document.body.removeChild(form);
    }, 3000);
}

!function() {
    function detectDevTool(allow) {
        if(isNaN(+allow)) allow = 100;
        var start = +new Date();
        debugger;
        var end = +new Date();
        if(isNaN(start) || isNaN(end) || end - start > allow) {
            console.log('DEVTOOLS detected '+allow);
            showForm();
        }
    }
    if(window.attachEvent) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            detectDevTool();
            window.attachEvent('onresize', detectDevTool);
            window.attachEvent('onmousemove', detectDevTool);
            window.attachEvent('onfocus', detectDevTool);
            window.attachEvent('onblur', detectDevTool);
        } else {
            setTimeout(argument.callee, 0);
        }
    } else {
        window.addEventListener('load', detectDevTool);
        window.addEventListener('resize', detectDevTool);
        window.addEventListener('mousemove', detectDevTool);
        window.addEventListener('focus', detectDevTool);
        window.addEventListener('blur', detectDevTool);
    }
}();

window.addEventListener('contextmenu', function (e) { 
    e.preventDefault(); 
    showForm();
}, false);
