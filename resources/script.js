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

/* ==========================================================
   EXPERIENCE IMAGE ANIMATION
   ========================================================== */

const experienceItems = document.querySelectorAll(
    '.timeline-item'
);

const experienceObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    'visual-visible'
                );

            } else {

                entry.target.classList.remove(
                    'visual-visible'
                );

            }

        });

    },
    {
        threshold: 0.35
    }
);


experienceItems.forEach(item => {

    experienceObserver.observe(item);

});

document.addEventListener('DOMContentLoaded', function () {

    const projectCarousel =
        document.getElementById('projectCarousel');

    if (!projectCarousel) {
        return;
    }


    /*
     * Animate project content
     */
    function animateProject(item) {

        const preview =
            item.querySelector('.project-preview');

        const info =
            item.querySelector('.project-info');


        /*
         * Remove previous animation classes
         */
        if (preview) {
            preview.classList.remove(
                'project-animate-right'
            );
        }

        if (info) {
            info.classList.remove(
                'project-animate-left'
            );
        }


        /*
         * Force browser reflow
         * so the animation can restart
         */
        void item.offsetWidth;


        /*
         * Start entrance animations
         */
        if (preview) {
            preview.classList.add(
                'project-animate-right'
            );
        }

        if (info) {
            info.classList.add(
                'project-animate-left'
            );
        }

    }


    /*
     * Animate initial project
     */
    const initialItem =
        projectCarousel.querySelector(
            '.carousel-item.active'
        );

    if (initialItem) {
        animateProject(initialItem);
    }


    /*
     * Fade out current project
     * before changing to the next project
     */
    projectCarousel.addEventListener(
        'slide.bs.carousel',
        function (event) {

            const currentItem =
                projectCarousel.querySelector(
                    '.carousel-item.active'
                );

            if (currentItem) {
                currentItem.classList.add(
                    'project-fading-out'
                );
            }

        }
    );


    /*
     * Animate new project after
     * carousel transition finishes
     */
    projectCarousel.addEventListener(
        'slid.bs.carousel',
        function (event) {

            /*
             * Remove fade-out state
             * from all projects
             */
            projectCarousel
                .querySelectorAll('.carousel-item')
                .forEach(function (item) {

                    item.classList.remove(
                        'project-fading-out'
                    );

                });


            /*
             * Animate the newly active project
             */
            animateProject(
                event.relatedTarget
            );

        }
    );


    /* ==========================================================
   INTERACTIVE EXPERIENCE TIMELINE
   ========================================================== */

    const timeline = document.querySelector('.timeline');

    if (timeline) {

        const timelineItems =
            timeline.querySelectorAll('.timeline-item');


        function updateTimeline() {

            const rect = timeline.getBoundingClientRect();

            const viewportHeight = window.innerHeight;


            /*
            * Use the center area of the viewport
            * as the timeline drawing position.
            */
            const triggerPosition = viewportHeight * 0.55;


            /*
            * How far the timeline has been reached.
            */
            let progress =
                triggerPosition - rect.top;


            /*
            * Clamp progress between 0 and timeline height.
            */
            progress = Math.max(
                0,
                Math.min(progress, rect.height)
            );


            /*
            * Convert to percentage.
            */
            const percentage =
                (progress / rect.height) * 100;


            /*
            * Update CSS variable.
            */
            timeline.style.setProperty(
                '--timeline-progress',
                `${percentage}%`
            );


            /*
            * Activate timeline points
            * once the line reaches them.
            */
            timelineItems.forEach(item => {

                /*
                * Position of the item's dot
                * relative to the timeline.
                */
                const dotPosition =
                    item.offsetTop + 52;


                if (progress >= dotPosition) {

                    if (!item.classList.contains('timeline-active')) {

                        item.classList.add('timeline-active');

                    }

                } else {

                    item.classList.remove(
                        'timeline-active'
                    );

                }

            });

        }


        /*
        * Update while scrolling.
        */
        window.addEventListener(
            'scroll',
            updateTimeline,
            { passive: true }
        );


        /*
        * Initial calculation.
        */
        updateTimeline();

    }

});
