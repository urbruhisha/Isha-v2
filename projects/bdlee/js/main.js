/* ==================================================
   BADA LEE
   MAIN JS
================================================== */


/* ==================================================
   REGISTER GSAP
================================================== */

gsap.registerPlugin(ScrollTrigger);



/* ==================================================
   HERO OPENING
================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.add("is-loaded");

        /* Refresh after videos/images settle */
        ScrollTrigger.refresh();

    }, 300);

});



/* ==================================================
   HERO — SCROLL CHOREOGRAPHY
================================================== */

const heroTimeline = gsap.timeline({

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "+=1800",

        scrub: 1.2,

        pin: true

    }

});


/* BADA MOVES LEFT */

heroTimeline.to(
    ".title-bada",
    {
        xPercent: -8,
        opacity: 0.9,
        ease: "none"
    },
    0
);


/* LEE MOVES RIGHT */

heroTimeline.to(
    ".title-lee",
    {
        xPercent: 8,
        opacity: 0.9,
        ease: "none"
    },
    0
);


/* VIDEO SHRINKS */

heroTimeline.to(
    ".hero-video",
    {
        scale: 0.78,

        filter:
            "grayscale(90%) contrast(1.2) brightness(0.38)",

        ease: "none"
    },
    0
);


/* DARKNESS CLOSES AROUND VIDEO */

heroTimeline.to(
    ".hero-overlay",
    {
        backgroundColor: "rgba(0, 0, 0, 0.42)",

        ease: "none"
    },
    0
);


/* SMALL HERO INFO DISAPPEARS */

heroTimeline.to(
    ".hero-info",
    {
        opacity: 0,
        y: 30,

        ease: "none"
    },
    0.1
);


/* HEADER QUIETS DOWN */

heroTimeline.to(
    ".hero-header",
    {
        opacity: 0.35,

        ease: "none"
    },
    0.15
);



/* ==================================================
   01 — INTRODUCTION
================================================== */


/* INTRO LABEL */

gsap.from(".intro-label", {

    scrollTrigger: {

        trigger: ".intro",

        start: "top 75%"

    },

    opacity: 0,

    y: 20,

    duration: 0.8,

    ease: "power2.out"

});


/* TITLE DRIFTS */

gsap.fromTo(
    ".intro-title h2",

    {
        x: "5vw"
    },

    {
        x: "-3vw",

        scrollTrigger: {

            trigger: ".intro",

            start: "top bottom",

            end: "bottom top",

            scrub: 1.5

        },

        ease: "none"
    }
);


/* COPY */

gsap.from(".intro-copy", {

    scrollTrigger: {

        trigger: ".intro-copy",

        start: "top 85%"

    },

    opacity: 0,

    y: 50,

    duration: 1.2,

    ease: "power3.out"

});


/* META */

gsap.from(".intro-meta span", {

    scrollTrigger: {

        trigger: ".intro-meta",

        start: "top 90%"

    },

    opacity: 0,

    y: 12,

    stagger: 0.12,

    duration: 0.7,

    ease: "power2.out"

});



/* ==================================================
   02 — PROFILE
================================================== */


/* LABEL */

gsap.from(".profile-label", {

    scrollTrigger: {

        trigger: ".profile",

        start: "top 75%"

    },

    opacity: 0,

    y: 20,

    duration: 0.8,

    ease: "power2.out"

});


/* IMAGE PARALLAX */

gsap.fromTo(
    ".profile-image",

    {
        yPercent: -8
    },

    {
        yPercent: 8,

        scrollTrigger: {

            trigger: ".profile-image-wrap",

            start: "top bottom",

            end: "bottom top",

            scrub: 1.3

        },

        ease: "none"
    }
);


/* BADA */

gsap.from(".profile-name span:first-child", {

    scrollTrigger: {

        trigger: ".profile-name",

        start: "top 85%"

    },

    opacity: 0,

    x: -100,

    duration: 1,

    ease: "power3.out"

});


/* LEE */

gsap.from(".profile-name span:last-child", {

    scrollTrigger: {

        trigger: ".profile-name",

        start: "top 85%"

    },

    opacity: 0,

    x: 100,

    duration: 1,

    ease: "power3.out"

});


/* DETAILS */

gsap.from(".profile-detail", {

    scrollTrigger: {

        trigger: ".profile-details",

        start: "top 85%"

    },

    opacity: 0,

    y: 20,

    stagger: 0.12,

    duration: 0.7,

    ease: "power2.out"

});


/* COPY */

gsap.from(".profile-copy p", {

    scrollTrigger: {

        trigger: ".profile-copy",

        start: "top 85%"

    },

    opacity: 0,

    y: 25,

    stagger: 0.15,

    duration: 0.8,

    ease: "power2.out"

});



/* ==================================================
   03 — SELECTED WORKS
================================================== */


/* LABEL */

gsap.from(".works-label", {

    scrollTrigger: {

        trigger: ".works",

        start: "top 75%"

    },

    opacity: 0,

    y: 20,

    duration: 0.8,

    ease: "power2.out"

});


/* TITLE */

gsap.from(".works-header h2", {

    scrollTrigger: {

        trigger: ".works-header",

        start: "top 80%"

    },

    opacity: 0,

    x: -80,

    duration: 1.1,

    ease: "power3.out"

});


/* DESCRIPTION */

gsap.from(".works-header p", {

    scrollTrigger: {

        trigger: ".works-header",

        start: "top 80%"

    },

    opacity: 0,

    y: 40,

    duration: 1,

    ease: "power3.out"

});


/* WORK ROWS */

gsap.from(".work-item", {

    scrollTrigger: {

        trigger: ".works-list",

        start: "top 85%"

    },

    opacity: 0,

    y: 30,

    stagger: 0.12,

    duration: 0.8,

    ease: "power2.out"

});



/* ==================================================
   WORKS — HOVER PREVIEW
================================================== */

const workItems =
    document.querySelectorAll(".work-item");

const workPreview =
    document.querySelector(".work-preview");

const workPreviewImage =
    document.querySelector(".work-preview-image");


let previewX = 0;
let previewY = 0;

let currentX = 0;
let currentY = 0;



/* ==================================================
   PREVIEW MOUSE POSITION
================================================== */

if (workPreview) {

    document.addEventListener("mousemove", (event) => {

        const previewWidth =
            workPreview.offsetWidth;

        const previewHeight =
            workPreview.offsetHeight;

        const gap = 30;


        let x =
            event.clientX +
            previewWidth / 2 +
            gap;

        let y =
            event.clientY;


        /* FLIP LEFT IF NEEDED */

        if (
            event.clientX +
            previewWidth +
            gap >
            window.innerWidth
        ) {

            x =
                event.clientX -
                previewWidth / 2 -
                gap;

        }


        /* KEEP INSIDE TOP */

        if (
            y -
            previewHeight / 2 <
            20
        ) {

            y =
                previewHeight / 2 +
                20;

        }


        /* KEEP INSIDE BOTTOM */

        if (
            y +
            previewHeight / 2 >
            window.innerHeight - 20
        ) {

            y =
                window.innerHeight -
                previewHeight / 2 -
                20;

        }


        previewX = x;
        previewY = y;

    });

}



/* ==================================================
   PREVIEW SMOOTH FOLLOW
================================================== */

function movePreview() {

    if (!workPreview) {
        return;
    }


    currentX +=
        (previewX - currentX) *
        0.12;

    currentY +=
        (previewY - currentY) *
        0.12;


    workPreview.style.left =
        `${currentX}px`;

    workPreview.style.top =
        `${currentY}px`;


    requestAnimationFrame(
        movePreview
    );

}


if (workPreview) {

    movePreview();

}



/* ==================================================
   WORK ITEM HOVER
================================================== */

workItems.forEach((item) => {

    item.addEventListener(
        "mouseenter",
        () => {

            if (
                !workPreview ||
                !workPreviewImage
            ) {
                return;
            }


            const preview =
                item.dataset.preview;


            if (!preview) {
                return;
            }


            workPreviewImage.src =
                preview;


            workPreview.classList.add(
                "is-visible"
            );

        }
    );


    item.addEventListener(
        "mouseleave",
        () => {

            if (!workPreview) {
                return;
            }


            workPreview.classList.remove(
                "is-visible"
            );

        }
    );

});



/* ==================================================
   04 — MOTION STUDY
================================================== */

const motionSection =
    document.querySelector(".motion");

const motionCounts =
    document.querySelectorAll(
        ".motion-count-item"
    );



/* ==================================================
   COUNT HELPER
================================================== */

function setMotionCount(index) {

    motionCounts.forEach(
        (count, i) => {

            count.classList.toggle(
                "is-active",
                i === index
            );

        }
    );

}



/* ==================================================
   MOTION TIMELINE
================================================== */

if (motionSection) {

    const motionTimeline =
        gsap.timeline({

            scrollTrigger: {

                trigger: motionSection,

                start: "top top",

                end: "bottom bottom",

                scrub: 1.2,

                onUpdate: (self) => {

                    const progress =
                        self.progress;


                    if (progress < 0.25) {

                        setMotionCount(0);

                    }

                    else if (
                        progress < 0.50
                    ) {

                        setMotionCount(1);

                    }

                    else if (
                        progress < 0.75
                    ) {

                        setMotionCount(2);

                    }

                    else {

                        setMotionCount(3);

                    }

                }

            }

        });



    /* ==================================================
       VIDEO ENTERS
    ================================================== */

    motionTimeline.fromTo(
        ".motion-video-wrap",

        {
            scale: 0.78,
            opacity: 0.4
        },

        {
            scale: 1,
            opacity: 1,

            duration: 1,

            ease: "none"
        },

        0
    );



    /* ==================================================
       05 — CONTROL
    ================================================== */

    motionTimeline.fromTo(
        ".motion-control",

        {
            x: "-70vw",
            opacity: 0
        },

        {
            x: "8vw",
            opacity: 1,

            duration: 0.8,

            ease: "power3.out"
        },

        0
    );


    motionTimeline.to(
        ".motion-control",

        {
            x: "65vw",
            opacity: 0,

            duration: 0.7,

            ease: "power2.in"
        },

        0.9
    );



    /* ==================================================
       06 — GROOVE
    ================================================== */

    motionTimeline.fromTo(
        ".motion-groove",

        {
            x: "70vw",
            opacity: 0
        },

        {
            x: "-8vw",
            opacity: 1,

            duration: 0.8,

            ease: "power3.out"
        },

        1.5
    );


    motionTimeline.to(
        ".motion-groove",

        {
            x: "-65vw",
            opacity: 0,

            duration: 0.7,

            ease: "power2.in"
        },

        2.4
    );



    /* ==================================================
       07 — MUSICALITY
    ================================================== */

    motionTimeline.fromTo(
        ".motion-musicality",

        {
            x: "-80vw",
            opacity: 0
        },

        {
            x: "5vw",
            opacity: 1,

            duration: 0.8,

            ease: "power3.out"
        },

        3
    );


    motionTimeline.to(
        ".motion-musicality",

        {
            x: "70vw",
            opacity: 0,

            duration: 0.7,

            ease: "power2.in"
        },

        3.9
    );



    /* ==================================================
       08 — PRECISION
    ================================================== */

    motionTimeline.fromTo(
        ".motion-precision",

        {
            opacity: 0,
            scale: 1.5
        },

        {
            opacity: 1,
            scale: 1,

            duration: 0.4,

            ease: "power4.out"
        },

        4.7
    );



    /* ==================================================
       VIDEO PUSH
    ================================================== */

    motionTimeline.fromTo(
        ".motion-video",

        {
            scale: 1.08
        },

        {
            scale: 1,

            duration: 5,

            ease: "none"
        },

        0
    );


    /* DEFAULT COUNT */

    setMotionCount(0);

}



/* ==================================================
   FINAL REFRESH
================================================== */

window.addEventListener(
    "load",
    () => {

        ScrollTrigger.refresh();

    }
);

/* ==================================================
   FOOTER — MOTION
================================================== */

gsap.from(".footer-label", {

    scrollTrigger: {
        trigger: ".site-footer",
        start: "top 80%"
    },

    opacity: 0,
    y: 20,

    duration: 0.8,
    ease: "power2.out"

});


gsap.from(".footer-title span:first-child", {

    scrollTrigger: {
        trigger: ".footer-title",
        start: "top 85%"
    },

    opacity: 0,
    x: -120,

    duration: 1.1,
    ease: "power3.out"

});


gsap.from(".footer-title span:last-child", {

    scrollTrigger: {
        trigger: ".footer-title",
        start: "top 85%"
    },

    opacity: 0,
    x: 120,

    duration: 1.1,
    ease: "power3.out"

});


gsap.from(".footer-line", {

    scrollTrigger: {
        trigger: ".footer-line",
        start: "top 90%"
    },

    scaleX: 0,

    transformOrigin: "left center",

    duration: 1.1,
    ease: "power3.out"

});


gsap.from(".footer-bottom > *", {

    scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 95%"
    },

    opacity: 0,
    y: 12,

    stagger: 0.12,

    duration: 0.7,
    ease: "power2.out"

});