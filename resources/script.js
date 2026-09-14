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
