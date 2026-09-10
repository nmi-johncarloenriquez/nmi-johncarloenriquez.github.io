document.addEventListener("DOMContentLoaded", () => {

    initializeAOS();
    initializeNavbar();
    initializeScrollProgress();
    initializeSmoothScroll();
    initializeActiveNavigation();
    initializeTypingEffect();

    initializeFloatingIcons();
    enhanceFloatingIcons();
    initializeIconParallax();
    observeSkillsSection();
    initializeReducedMotion();

});


/*
==========================================================
AOS
==========================================================
*/

function initializeAOS(){

    AOS.init({

        duration:900,
        easing:'ease-in-out',
        once:false,
        mirror:true

    });

}


/*
==========================================================
NAVBAR
==========================================================
*/

function initializeNavbar(){

    const navbar = document.getElementById("navbar");

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }

    window.addEventListener("scroll", () => {

        if(window.scrollY > 80){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    });

}


/*
==========================================================
SCROLL PROGRESS BAR
==========================================================
*/

function initializeScrollProgress(){

    const progressBar = document.getElementById("progress-bar");

    function updateProgress(){

        const scrollTop = document.documentElement.scrollTop;

        const height =

            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / height) * 100;

        progressBar.style.width = progress + "%";

    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);

}


/*
==========================================================
SMOOTH SCROLL
==========================================================
*/

function initializeSmoothScroll(){

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function(e){

                e.preventDefault();

                const target =
                    document.querySelector(this.getAttribute("href"));

                if(!target) return;

                window.scrollTo({

                    top:
                        target.offsetTop - 70,

                    behavior:"smooth"

                });

            });

        });

}


/*
==========================================================
ACTIVE NAVIGATION
==========================================================
*/

function initializeActiveNavigation(){

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if(window.scrollY >= top &&
               window.scrollY < top + height){

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + currentSection){

                link.classList.add("active");

            }

        });

    });

}


/*
==========================================================
TYPING EFFECT
==========================================================
*/

function initializeTypingEffect(){

    const element = document.getElementById("typing");

    if(!element) return;

    const words = [

        "Full Stack Web Developer",
        "Backend Developer",
        "Frontend Developer",
        "PHP Developer",
        "Laravel Developer",
        "CodeIgniter Developer",
    ];

    let wordIndex = 0;
    let letterIndex = 0;

    let deleting = false;

    function type(){

        const currentWord = words[wordIndex];

        if(!deleting){

            element.textContent =
                currentWord.substring(0, letterIndex);

            letterIndex++;

            if(letterIndex > currentWord.length){

                deleting = true;

                setTimeout(type, 1500);

                return;

            }

        }else{

            element.textContent =
                currentWord.substring(0, letterIndex);

            letterIndex--;

            if(letterIndex < 0){

                deleting = false;

                wordIndex++;

                if(wordIndex >= words.length){

                    wordIndex = 0;

                }

            }

        }

        const speed = deleting ? 45 : 90;

        setTimeout(type, speed);

    }

    type();

}


/*
==========================================================
UTILITY
==========================================================
*/

function throttle(callback, delay){

    let waiting = false;

    return function(){

        if(waiting) return;

        callback.apply(this, arguments);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}

/*
==========================================================
FLOATING TECHNOLOGY ICONS
==========================================================
*/

function initializeFloatingIcons() {

    const container = document.querySelector(".floating-icons");

    if (!container) return;

    container.innerHTML = "";

    // Desktop / Tablet / Mobile icon count
    let iconCount = 40;

    if (window.innerWidth < 992) iconCount = 25;

    if (window.innerWidth < 576) iconCount = 15;

    const icons = [

        "fab fa-php",
        "fab fa-laravel",
        "fab fa-node-js",
        "fab fa-js",
        "fab fa-html5",
        "fab fa-css3-alt",
        "fab fa-bootstrap",
        "fab fa-github",
        "fab fa-git-alt",
        "fab fa-docker",
        "fab fa-aws",

        "fas fa-database",
        "fas fa-server",
        "fas fa-cloud",
        "fas fa-code",
        "fas fa-code-branch",
        "fas fa-terminal",
        "fas fa-laptop-code",
        "fas fa-network-wired",
        "fas fa-cubes",
        "fas fa-gears",
        "fas fa-memory",
        "fas fa-microchip",
        "fas fa-robot",
        "fas fa-brain",
        "fas fa-window-maximize"

    ];

    const sizes = [
        "small",
        "medium",
        "large"
    ];

    for (let i = 0; i < iconCount; i++) {

        const icon = document.createElement("i");

        icon.className =
            "tech-icon " +
            icons[random(0, icons.length - 1)] +
            " " +
            sizes[random(0, sizes.length - 1)];

        icon.style.left = random(0, 100) + "%";

        icon.style.animationDuration =
            random(15, 30) + "s";

        icon.style.animationDelay =
            random(0, 20) + "s";

        icon.style.opacity =
            randomOpacity();

        icon.style.transform =
            "rotate(" + random(0, 360) + "deg)";

        container.appendChild(icon);

    }

}


/*
==========================================================
HELPERS
==========================================================
*/

function random(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

function randomOpacity(){

    return (Math.random() * 0.15 + 0.05).toFixed(2);

}

function randomFloat(min, max){

    return Math.random() * (max - min) + min;

}


/*
==========================================================
REBUILD ICONS
==========================================================
*/

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        initializeFloatingIcons();

    }, 250);

});

/*
==========================================================
SKILLS ICON ENHANCEMENTS
==========================================================
*/

const portfolioColors = [
    "#0A2947",
    "#184D82",
    "#8B5E3C",
    "#D3D4C0"
];

/*
==========================================================
ENHANCE ICONS
==========================================================
*/

function enhanceFloatingIcons() {

    const icons = document.querySelectorAll(".tech-icon");
    const blur = randomFloat(0, 0.5);

    icons.forEach(icon => {

        icon.style.color =
            portfolioColors[random(0, portfolioColors.length - 1)];

        icon.style.filter = `blur(${blur}px)`;

        icon.style.animationTimingFunction = "linear";

        icon.dataset.speed =
            (Math.random() * 0.6 + 0.7).toFixed(2);

    });

}


/*
==========================================================
PARALLAX EFFECT
==========================================================
*/

function initializeIconParallax() {

    const container = document.querySelector(".floating-icons");

    if (!container) return;

    let ticking = false;

    window.addEventListener("scroll", () => {

        if (ticking) return;

        window.requestAnimationFrame(() => {

            const y = window.scrollY * 0.08;

            container.style.transform =
                `translateY(${y}px)`;

            ticking = false;

        });

        ticking = true;

    });

}


/*
==========================================================
PAUSE ICONS WHEN NOT VISIBLE
==========================================================
*/

function observeSkillsSection() {

    const skills = document.getElementById("skills");

    if (!skills) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            const state =
                entry.isIntersecting ? "running" : "paused";

            document.querySelectorAll(".tech-icon")
                .forEach(icon => {

                    icon.style.animationPlayState = state;

                });

        });

    }, {

        threshold: 0.1

    });

    observer.observe(skills);

}


/*
==========================================================
REDUCED MOTION SUPPORT
==========================================================
*/

function initializeReducedMotion() {

    const media = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (!media.matches) return;

    document.querySelectorAll(".tech-icon")
        .forEach(icon => {

            icon.style.animation = "none";

        });

}


/*
==========================================================
REBUILD ICONS
==========================================================
*/

function rebuildFloatingIcons() {

    initializeFloatingIcons();

    enhanceFloatingIcons();

    initializeReducedMotion();

}


/*
==========================================================
WINDOW RESIZE
==========================================================
*/

let floatingResizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(floatingResizeTimer);

    floatingResizeTimer = setTimeout(() => {

        rebuildFloatingIcons();

    }, 250);

});

const skillIcons=[

{
icon:"fab fa-php",
color:"#777BB4"
},

{
icon:"fab fa-laravel",
color:"#FF2D20"
},

{
icon:"fab fa-html5",
color:"#E34F26"
},

{
icon:"fab fa-css3-alt",
color:"#1572B6"
},

{
icon:"fab fa-bootstrap",
color:"#7952B3"
},

{
icon:"fab fa-js",
color:"#F7DF1E"
},

{
icon:"fab fa-node-js",
color:"#68A063"
},

{
icon:"fab fa-git-alt",
color:"#F05032"
},

{
icon:"fab fa-github",
color:"#24292F"
},

{
icon:"fab fa-docker",
color:"#2496ED"
},

{
icon:"fab fa-aws",
color:"#FF9900"
},

{
icon:"fas fa-database",
color:"#00758F"
}

];

const CELL_SIZE = 48;

const BOTTLE_WIDTH = 240;

const BOTTLE_HEIGHT = 310;

const ICONS_PER_ROW =
    Math.floor(BOTTLE_WIDTH / CELL_SIZE);

let currentIndex = 0;

function fillBottle(){

    const container =
        document.querySelector(".icon-container");

    currentIndex = 0;

    skillIcons.forEach((tech,index)=>{

        setTimeout(()=>{

            const icon=document.createElement("i");

            icon.className=
                tech.icon+" skill-icon";

            icon.style.color=tech.color;

            icon.style.transition = "all 1.2s cubic-bezier(.2,.8,.2,1)";

            //---------------------------------
            // Grid Calculation
            //---------------------------------

            const row =
                Math.floor(currentIndex / ICONS_PER_ROW);

            const col =
                currentIndex % ICONS_PER_ROW;

            //---------------------------------

            const x =
                col * CELL_SIZE + 20;

            const y =
                BOTTLE_HEIGHT -
                ((row+1)*CELL_SIZE);

            //---------------------------------

            const offsetX=random(-6,6);

            const offsetY=random(-4,4);

            icon.style.left =
                (x+offsetX)+"px";

            icon.style.top="-80px";

            container.appendChild(icon); 

            requestAnimationFrame(()=>{

                icon.style.top =
                    (y+offsetY)+"px";

            });

            currentIndex++;

        },index*250);

    });

}

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

fillBottle();

observer.disconnect();

}

});

},{
threshold:.5
});

observer.observe(document.querySelector("#skills"));