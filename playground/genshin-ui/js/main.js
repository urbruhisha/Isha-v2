/* =========================================
   CELESTIAL HERO INTERACTIONS
========================================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

const ringOne = document.querySelector(".ring-one");
const ringTwo = document.querySelector(".ring-two");
const ringThree = document.querySelector(".ring-three");

const glowOne = document.querySelector(".glow-one");
const glowTwo = document.querySelector(".glow-two");

const stars = document.querySelectorAll(".star");


/* =========================================
   MOUSE PARALLAX
========================================= */

if (hero) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (mouseX - centerX) / centerX;
        const moveY = (mouseY - centerY) / centerY;


        /* title/content */

        if (heroContent) {
            heroContent.style.transform =
                `translate(${moveX * 6}px, ${moveY * 6}px)`;
        }


        /* glowing background */

        if (glowOne) {
            glowOne.style.marginLeft = `${moveX * 18}px`;
            glowOne.style.marginTop = `${moveY * 18}px`;
        }

        if (glowTwo) {
            glowTwo.style.marginLeft = `${moveX * -14}px`;
            glowTwo.style.marginTop = `${moveY * -14}px`;
        }


        /* rings */

        if (ringOne) {
            ringOne.style.marginLeft = `${moveX * 8}px`;
            ringOne.style.marginTop = `${moveY * 8}px`;
        }

        if (ringTwo) {
            ringTwo.style.marginLeft = `${moveX * -10}px`;
            ringTwo.style.marginTop = `${moveY * -10}px`;
        }

        if (ringThree) {
            ringThree.style.marginLeft = `${moveX * 14}px`;
            ringThree.style.marginTop = `${moveY * 5}px`;
        }


        /* stars */

        stars.forEach((star, index) => {

            const depth = (index + 1) * 4;

            star.style.marginLeft =
                `${moveX * depth}px`;

            star.style.marginTop =
                `${moveY * depth}px`;

        });

    });



    /* reset when mouse leaves */

    hero.addEventListener("mouseleave", () => {

        if (heroContent) {
            heroContent.style.transform =
                "translate(0, 0)";
        }

        if (glowOne) {
            glowOne.style.marginLeft = "0px";
            glowOne.style.marginTop = "0px";
        }

        if (glowTwo) {
            glowTwo.style.marginLeft = "0px";
            glowTwo.style.marginTop = "0px";
        }

        if (ringOne) {
            ringOne.style.marginLeft = "0px";
            ringOne.style.marginTop = "0px";
        }

        if (ringTwo) {
            ringTwo.style.marginLeft = "0px";
            ringTwo.style.marginTop = "0px";
        }

        if (ringThree) {
            ringThree.style.marginLeft = "0px";
            ringThree.style.marginTop = "0px";
        }

        stars.forEach((star) => {
            star.style.marginLeft = "0px";
            star.style.marginTop = "0px";
        });

    });

}


/* =========================================
   HERO SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {

    if (!hero) return;

    const scrollY = window.scrollY;

    const heroHeight = hero.offsetHeight;

    const progress = Math.min(
        scrollY / heroHeight,
        1
    );


    /* fade hero */

    hero.style.opacity =
        1 - progress * 0.75;


    /* move content upward */

    if (heroContent) {

        heroContent.style.top =
            `${scrollY * 0.18}px`;

    }


    /* rings drift slightly */

    if (ringOne) {
        ringOne.style.top =
            `calc(50% + ${scrollY * 0.08}px)`;
    }

    if (ringTwo) {
        ringTwo.style.top =
            `calc(50% + ${scrollY * 0.05}px)`;
    }

    if (ringThree) {
        ringThree.style.top =
            `calc(52% + ${scrollY * 0.12}px)`;
    }

});


/* =========================================
   SMOOTH ENTER ARCHIVE BUTTON
========================================= */

const enterArchive =
    document.querySelector(".hero-enter");

if (enterArchive) {

    enterArchive.addEventListener("click", (event) => {

        const targetID =
            enterArchive.getAttribute("href");

        const target =
            document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* =========================================
   READY
========================================= */

console.log("Celestial Archive initialized ✦");

/* =========================================
   SCROLL REVEAL SYSTEM
========================================= */

const revealItems = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});


/* =========================================
   ARCHIVIST SKILL STAGGER
========================================= */

const skillTags =
    document.querySelectorAll(".skill-list span");

skillTags.forEach((skill, index) => {

    skill.style.setProperty(
        "--delay",
        `${index * 90}ms`
    );

});


/* =========================================
   ARCHIVIST ROLE STAGGER
========================================= */

const roleItems =
    document.querySelectorAll(".archivist-roles .reveal");

roleItems.forEach((role, index) => {

    role.style.setProperty(
        "--delay",
        `${index * 120}ms`
    );

});

/* =========================================
   ARCHIVIST SCROLL PARALLAX
========================================= */

const archivistSection =
    document.querySelector(".archivist-section");

const archivistNumber =
    document.querySelector(".archivist-number");

const archivistStar =
    document.querySelector(".archivist-star");

const archivistGlow =
    document.querySelector(".archivist-glow");


window.addEventListener("scroll", () => {

    if (!archivistSection) return;

    const rect =
        archivistSection.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;

    const progress =
        (windowHeight - rect.top) /
        (windowHeight + rect.height);

    const limitedProgress =
        Math.max(0, Math.min(progress, 1));


    /* giant background number */

    if (archivistNumber) {

        archivistNumber.style.transform =
            `translateY(${limitedProgress * 80}px)`;

    }


    /* giant star */

    if (archivistStar) {

        archivistStar.style.transform =
            `
            translateY(${limitedProgress * -45}px)
            rotate(${limitedProgress * 30}deg)
            `;

    }


    /* glow */

    if (archivistGlow) {

        archivistGlow.style.transform =
            `
            translate(
                ${limitedProgress * -35}px,
                ${limitedProgress * 30}px
            )
            `;

    }

});

/* =========================================
   JOURNEY TIMELINE PROGRESS
========================================= */

const journeySection =
    document.querySelector(".journey-section");

const timelineProgress =
    document.querySelector(".timeline-progress");


function updateJourneyTimeline() {

    if (!journeySection || !timelineProgress) return;

    const rect =
        journeySection.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;

    const sectionHeight =
        journeySection.offsetHeight;


    const startPoint =
        windowHeight * 0.65;

    const travelled =
        startPoint - rect.top;

    const totalDistance =
        sectionHeight - windowHeight * 0.25;


    let progress =
        travelled / totalDistance;


    progress =
        Math.max(0, Math.min(progress, 1));


    timelineProgress.style.height =
        `${progress * 100}%`;

}


window.addEventListener(
    "scroll",
    updateJourneyTimeline
);

updateJourneyTimeline();



/* =========================================
   JOURNEY RECORD ACTIVATION
========================================= */

const journeyRecords =
    document.querySelectorAll(".journey-record");


const journeyRecordObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                } else {

                    entry.target.classList.remove(
                        "active"
                    );

                }

            });

        },

        {
            threshold: 0.45
        }

    );


journeyRecords.forEach((record) => {

    journeyRecordObserver.observe(record);

});



/* =========================================
   EXPLORATION COUNTER
========================================= */

const explorationValues =
    document.querySelectorAll(
        ".exploration-value"
    );


function animateCounter(element) {

    const target = 100;

    const duration = 1300;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                easedProgress * target
            );


        element.textContent =
            `${currentValue}%`;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                "100%";

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}



/* =========================================
   START COUNTER WHEN VISIBLE
========================================= */

const explorationObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;


                const counter =
                    entry.target;


                animateCounter(counter);


                observer.unobserve(
                    counter
                );

            });

        },

        {
            threshold: 0.7
        }

    );


explorationValues.forEach((counter) => {

    counter.textContent =
        "0%";


    explorationObserver.observe(
        counter
    );

});

/* =========================================
   SUMERU SECTION
========================================= */

const sumeruSection =
    document.querySelector(".sumeru-section");

const sumeruNumber =
    document.querySelector(".sumeru-number");

const sumeruGlowOne =
    document.querySelector(".glow-sumeru-one");

const sumeruGlowTwo =
    document.querySelector(".glow-sumeru-two");

const sumeruOrbitOne =
    document.querySelector(".orbit-sumeru-one");

const sumeruOrbitTwo =
    document.querySelector(".orbit-sumeru-two");

const sumeruStarOne =
    document.querySelector(".star-sumeru-one");

const sumeruStarTwo =
    document.querySelector(".star-sumeru-two");

const sumeruTitleSmall =
    document.querySelector(".sumeru-title-small");

const sumeruTitleMain =
    document.querySelector(".sumeru-title-main");

const wandererSmall =
    document.querySelector(".wanderer-small");

const wandererBig =
    document.querySelector(".wanderer-big");



/* =========================================
   SUMERU SCROLL MOVEMENT
========================================= */

function updateSumeruScroll() {

    if (!sumeruSection) return;

    const rect =
        sumeruSection.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;


    /*
        progress:
        0 = section beginning to enter
        1 = section almost completely passed
    */

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                (windowHeight - rect.top) /
                (rect.height + windowHeight)
            )
        );


    /* =====================================
       GIANT 05
    ====================================== */

    if (sumeruNumber) {

        sumeruNumber.style.transform =
            `translateY(${progress * 130}px)`;

    }


    /* =====================================
       BACKGROUND GLOWS
    ====================================== */

    if (sumeruGlowOne) {

        sumeruGlowOne.style.transform =
            `
            translate(
                ${progress * 70}px,
                ${progress * -35}px
            )
            scale(${1 + progress * 0.08})
            `;

    }


    if (sumeruGlowTwo) {

        sumeruGlowTwo.style.transform =
            `
            translate(
                ${progress * -80}px,
                ${progress * 50}px
            )
            scale(${1 + progress * 0.12})
            `;

    }


    /* =====================================
       CELESTIAL ORBITS
    ====================================== */

    if (sumeruOrbitOne) {

        sumeruOrbitOne.style.transform =
            `
            translateY(${progress * 70}px)
            rotate(${22 + progress * 35}deg)
            `;

    }


    if (sumeruOrbitTwo) {

        sumeruOrbitTwo.style.transform =
            `
            translateY(${progress * -60}px)
            rotate(${-16 - progress * 25}deg)
            `;

    }


    /* =====================================
       BACKGROUND STARS
    ====================================== */

    if (sumeruStarOne) {

        sumeruStarOne.style.transform =
            `
            translateY(${progress * -60}px)
            rotate(${progress * 45}deg)
            `;

    }


    if (sumeruStarTwo) {

        sumeruStarTwo.style.transform =
            `
            translateY(${progress * 80}px)
            rotate(${-progress * 30}deg)
            `;

    }

}



/* =========================================
   RUN SUMERU SCROLL
========================================= */

window.addEventListener(
    "scroll",
    updateSumeruScroll,
    { passive: true }
);

updateSumeruScroll();



/* =========================================
   SUMERU STORY CENTER LINE
========================================= */

const sumeruCenter =
    document.querySelector(".sumeru-center-symbol");

const sumeruCenterLine =
    document.querySelector(".sumeru-center-line");


if (sumeruCenter && sumeruCenterLine) {

    sumeruCenterLine.style.transformOrigin =
        "top";

    sumeruCenterLine.style.transform =
        "scaleY(0)";


    const sumeruLineObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    sumeruCenterLine.classList.add(
                        "line-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.3
            }

        );


    sumeruLineObserver.observe(
        sumeruCenter
    );

}



/* =========================================
   WANDERER PLACEHOLDER GLOW
========================================= */

const wandererPlaceholder =
    document.querySelector(
        ".wanderer-placeholder"
    );


if (wandererPlaceholder) {

    wandererPlaceholder.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                wandererPlaceholder
                    .getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const xPercent =
                (x / rect.width) * 100;

            const yPercent =
                (y / rect.height) * 100;


            wandererPlaceholder.style.setProperty(
                "--mouse-x",
                `${xPercent}%`
            );

            wandererPlaceholder.style.setProperty(
                "--mouse-y",
                `${yPercent}%`
            );

        }
    );

}



/* =========================================
   SUMERU QUEST TEXT
========================================= */

const questRecord =
    document.querySelector(
        ".sumeru-quest-record"
    );

const questBig =
    document.querySelector(
        ".quest-big"
    );

const questBigger =
    document.querySelector(
        ".quest-bigger"
    );


function updateQuestText() {

    if (
        !questRecord ||
        !questBig ||
        !questBigger
    ) return;


    const rect =
        questRecord.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;


    /*
        Only calculate movement while
        this area is around the viewport.
    */

    if (
        rect.bottom < 0 ||
        rect.top > windowHeight
    ) return;


    const center =
        rect.top +
        rect.height / 2;


    const distance =
        center -
        windowHeight / 2;


    const movement =
        Math.max(
            -35,
            Math.min(
                35,
                distance * 0.06
            )
        );


    /*
        Opposite directions
    */

    questBig.style.transform =
        `translateX(${movement}px)`;


    questBigger.style.transform =
        `translateX(${-movement}px)`;

}


window.addEventListener(
    "scroll",
    updateQuestText,
    { passive: true }
);

updateQuestText();

/* =========================================
   06 / COMBAT SECTION
========================================= */

const combatSection =
    document.querySelector(".combat-section");

const combatVideo =
    document.querySelector(".combat-video");

const combatBeats =
    document.querySelectorAll(".combat-beat");

const damageNumber =
    document.querySelector(".damage-number");

const combatStatus =
    document.querySelector(".combat-status");

const combatAlert =
    document.querySelector(".combat-alert");

const objectiveText =
    document.querySelector(".combat-panel-right p");

const activeUnit =
    document.querySelector(".combat-panel-left h3");


/* =========================================
   DAMAGE COUNTER
========================================= */

let damageAnimated = false;


function animateDamage() {

    if (!damageNumber) return;

    if (damageAnimated) return;

    damageAnimated = true;


    const target =
        Number(
            damageNumber.dataset.damage
        ) || 1284729;


    const duration = 1500;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            ease out
        */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * eased
            );


        damageNumber.textContent =
            value.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            damageNumber.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(
        update
    );

}



/* =========================================
   RESET COMBAT STATES
========================================= */

function resetCombatStates() {

    if (!combatSection) return;


    combatSection.classList.remove(
        "hud-active",
        "video-expand",
        "video-full",
        "damage-mode",
        "final-mode"
    );


    combatBeats.forEach((beat) => {

        beat.classList.remove(
            "active"
        );

    });

}



/* =========================================
   ACTIVATE COMBAT BEAT
========================================= */

function activateCombatBeat(index) {

    if (!combatSection) return;


    combatBeats.forEach((beat) => {

        beat.classList.remove(
            "active"
        );

    });


    const currentBeat =
        combatBeats[index];


    if (currentBeat) {

        currentBeat.classList.add(
            "active"
        );

    }


    /* =====================================
       BEAT 01
    ====================================== */

    if (index === 0) {

        combatSection.classList.add(
            "hud-active"
        );

        combatSection.classList.remove(
            "video-expand",
            "video-full",
            "damage-mode",
            "final-mode"
        );


        if (combatStatus) {

            combatStatus.textContent =
                "ARCHIVE RECORD FOUND";

        }


        if (objectiveText) {

            objectiveText.textContent =
                "Explore, build, test and improve.";

        }

    }


    /* =====================================
       BEAT 02
    ====================================== */

    if (index === 1) {

        combatSection.classList.add(
            "hud-active",
            "video-expand"
        );

        combatSection.classList.remove(
            "video-full",
            "damage-mode",
            "final-mode"
        );


        if (combatStatus) {

            combatStatus.textContent =
                "BUILD ANALYSIS ACTIVE";

        }


        if (objectiveText) {

            objectiveText.textContent =
                "Build. Test. Improve. Repeat.";

        }

    }


    /* =====================================
       BEAT 03
       BIG DAMAGE
    ====================================== */

    if (index === 2) {

        combatSection.classList.add(
            "hud-active",
            "video-full",
            "damage-mode"
        );

        combatSection.classList.remove(
            "final-mode"
        );


        if (combatStatus) {

            combatStatus.textContent =
                "DAMAGE ANALYSIS";

        }


        if (combatAlert) {

            combatAlert.innerHTML =
                "<span>△</span> NEW RECORD DETECTED <span>△</span>";

        }


        if (objectiveText) {

            objectiveText.textContent =
                "Beat my personal highest damage.";

        }


        animateDamage();

    }


    /* =====================================
       BEAT 04
       NEW CHARACTER
    ====================================== */

    if (index === 3) {

        combatSection.classList.add(
            "hud-active",
            "video-full"
        );

        combatSection.classList.remove(
            "damage-mode",
            "final-mode"
        );


        if (combatStatus) {

            combatStatus.textContent =
                "NEW CHARACTER DETECTED";

        }


        if (combatAlert) {

            combatAlert.innerHTML =
                "<span>△</span> BUILD CYCLE RESTARTED <span>△</span>";

        }


        if (objectiveText) {

            objectiveText.textContent =
                "New character. New build. New damage test.";

        }

    }


    /* =====================================
       BEAT 05
       XIAO OBJECTIVE
    ====================================== */

    if (index === 4) {

        combatSection.classList.add(
            "hud-active",
            "video-full",
            "final-mode"
        );

        combatSection.classList.remove(
            "damage-mode"
        );


        if (combatStatus) {

            combatStatus.textContent =
                "LONG-TERM OBJECTIVE";

        }


        if (activeUnit) {

            activeUnit.textContent =
                "XIAO";

        }

    }

}



/* =========================================
   COMBAT BEAT OBSERVER
========================================= */

const combatObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;


                const beatIndex =
                    Number(
                        entry.target.dataset.combatBeat
                    ) - 1;


                activateCombatBeat(
                    beatIndex
                );

            });

        },

        {
            threshold: 0.55
        }

    );


combatBeats.forEach((beat) => {

    combatObserver.observe(
        beat
    );

});



/* =========================================
   VIDEO PLAY / PAUSE
========================================= */

const combatSectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!combatVideo) return;


                if (entry.isIntersecting) {

                    combatVideo
                        .play()
                        .catch(() => {});

                } else {

                    combatVideo.pause();

                }

            });

        },

        {
            threshold: 0.15
        }

    );


if (combatSection) {

    combatSectionObserver.observe(
        combatSection
    );

}



/* =========================================
   RESET WHEN LEAVING SECTION
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!combatSection) return;


        const rect =
            combatSection.getBoundingClientRect();


        if (
            rect.bottom < 0 ||
            rect.top > window.innerHeight
        ) {

            resetCombatStates();

        }

    },
    {
        passive: true
    }
);

/* ==================================================
   07 / PLACES I RETURN TO
================================================== */

const placesSticky =
    document.querySelector(".places-sticky");

const placesTrack =
    document.querySelector(".places-track");

const placePanels =
    document.querySelectorAll(".place-panel");


/* ==================================================
   HORIZONTAL SCROLL
================================================== */

function updatePlacesScroll() {

    if (!placesSticky || !placesTrack) return;


    const rect =
        placesSticky.getBoundingClientRect();

    const sectionHeight =
        placesSticky.offsetHeight;

    const windowHeight =
        window.innerHeight;


    /*
        How much vertical distance is available
        while the section is sticky.
    */

    const scrollDistance =
        sectionHeight - windowHeight;


    /*
        How far we have travelled
        through the sticky section.
    */

    const travelled =
        Math.max(
            0,
            Math.min(
                -rect.top,
                scrollDistance
            )
        );


    const progress =
        scrollDistance > 0
            ? travelled / scrollDistance
            : 0;


    /*
        Four panels = maximum movement of 300vw.
    */

    const maxTranslate =
        (placePanels.length - 1)
        * window.innerWidth;


    const translateX =
        progress * maxTranslate;


    placesTrack.style.transform =
        `translate3d(
            ${-translateX}px,
            0,
            0
        )`;


    updatePlaceEffects(
        progress
    );

}


/* ==================================================
   INDIVIDUAL PLACE EFFECTS
================================================== */

const liyuePanel =
    document.querySelector(".place-liyue");

const inazumaPanel =
    document.querySelector(".place-inazuma");

const nodkraiPanel =
    document.querySelector(".place-nodkrai");

const fontainePanel =
    document.querySelector(".place-fontaine");


const sakuraPetals =
    document.querySelectorAll(
        ".sakura-field span"
    );

const nodkraiMoon =
    document.querySelector(
        ".nodkrai-moon"
    );

const fontaineWee =
    document.querySelector(
        ".fontaine-wee"
    );

const waterRings =
    document.querySelectorAll(
        ".water-rings span"
    );


function updatePlaceEffects(progress) {

    /*
        Convert the full section progress
        into a value from 0 → number of panels - 1.

        0 = Liyue
        1 = Inazuma
        2 = Nod-Krai
        3 = Fontaine
    */

    const travelPosition =
        progress *
        (placePanels.length - 1);


    /* =========================================
       LIYUE
    ========================================= */

    if (liyuePanel) {

        const title =
            liyuePanel.querySelector(
                ".place-name"
            );


        if (title) {

            const distance =
                travelPosition;


            title.style.transform =
                `
                translateY(-50%)
                translateX(
                    ${distance * -70}px
                )
                `;

        }

    }


    /* =========================================
       INAZUMA / SAKURA
    ========================================= */

    const inazumaDistance =
        travelPosition - 1;


    sakuraPetals.forEach(
        (petal, index) => {

            /*
                Different petals move at
                slightly different speeds.
            */

            const speed =
                30 + index * 11;


            const x =
                inazumaDistance *
                speed;


            const y =
                inazumaDistance *
                (18 + index * 4);


            const rotation =
                inazumaDistance *
                (40 + index * 12);


            petal.style.transform =
                `
                translate(
                    ${x}px,
                    ${y}px
                )
                rotate(
                    ${rotation}deg
                )
                `;

        }
    );


    /* =========================================
       NOD-KRAI / MOON
    ========================================= */

    if (nodkraiMoon) {

        const nodDistance =
            travelPosition - 2;


        nodkraiMoon.style.transform =
            `
            translateX(
                ${nodDistance * -45}px
            )
            translateY(
                ${nodDistance * 18}px
            )
            rotate(
                ${nodDistance * 8}deg
            )
            `;

    }


    /* =========================================
       FONTAINE / WATER
    ========================================= */

    const fontaineDistance =
        travelPosition - 3;


    waterRings.forEach(
        (ring, index) => {

            const scale =
                1 +
                Math.abs(fontaineDistance)
                * 0.06
                * (index + 1);


            ring.style.transform =
                `
                scaleY(0.35)
                scale(${scale})
                `;

        }
    );


    /* =========================================
       WEEEEEE
    ========================================= */

    if (fontaineWee) {

        /*
            Starts moving once we're getting
            close to Fontaine.
        */

        const arrival =
            Math.max(
                0,
                Math.min(
                    1,
                    travelPosition - 2
                )
            );


        fontaineWee.style.transform =
            `
            translateX(
                ${arrival * 70}px
            )
            `;

    }

}



/* ==================================================
   ACTIVE PLACE
================================================== */

function updateActivePlace() {

    if (!placesSticky) return;


    const rect =
        placesSticky.getBoundingClientRect();

    const scrollDistance =
        placesSticky.offsetHeight -
        window.innerHeight;


    if (scrollDistance <= 0) return;


    const travelled =
        Math.max(
            0,
            Math.min(
                -rect.top,
                scrollDistance
            )
        );


    const progress =
        travelled /
        scrollDistance;


    const panelIndex =
        Math.round(
            progress *
            (placePanels.length - 1)
        );


    placePanels.forEach(
        (panel, index) => {

            panel.classList.toggle(
                "active",
                index === panelIndex
            );

        }
    );

}



/* ==================================================
   RUN SCROLL
================================================== */

function updatePlaces() {

    updatePlacesScroll();

    updateActivePlace();

}


window.addEventListener(
    "scroll",
    updatePlaces,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updatePlaces
);


updatePlaces();

/* ==================================================
   08-B / XIAO — BELOVED RECORD
================================================== */

const xiaoSection =
    document.querySelector(".xiao-section");

const xiaoArt =
    document.querySelector(".xiao-art");

const xiaoName =
    document.querySelector(".xiao-name-bg");

const xiaoRings =
    document.querySelectorAll(".xiao-ring");

const xiaoStars =
    document.querySelectorAll(".xiao-star");

const xiaoGlowOne =
    document.querySelector(".xiao-glow-one");

const xiaoGlowTwo =
    document.querySelector(".xiao-glow-two");

const xiaoStats =
    document.querySelectorAll(".xiao-stat");

const appreciationItems =
    document.querySelectorAll(".appreciation-item");


/* ==================================================
   SECTION REVEALS
================================================== */

const xiaoRevealItems =
    document.querySelectorAll(
        ".xiao-warning, " +
        ".xiao-intro, " +
        ".xiao-art-wrap, " +
        ".xiao-copy, " +
        ".appreciation-heading, " +
        ".appreciation-item, " +
        ".xiao-status, " +
        ".xiao-thesis, " +
        ".xiao-ending, " +
        ".xiao-exit"
    );


const xiaoRevealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "xiao-visible"
                );

            });

        },

        {
            threshold: 0.18
        }

    );


xiaoRevealItems.forEach((item) => {

    xiaoRevealObserver.observe(item);

});


/* ==================================================
   APPRECIATION STAGGER
================================================== */

const appreciationObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                appreciationItems.forEach(
                    (item, index) => {

                        setTimeout(() => {

                            item.classList.add(
                                "appreciation-visible"
                            );

                        }, index * 140);

                    }
                );


                appreciationObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.3
        }

    );


const appreciationGrid =
    document.querySelector(
        ".appreciation-grid"
    );


if (appreciationGrid) {

    appreciationObserver.observe(
        appreciationGrid
    );

}


/* ==================================================
   ARCHIVE STATS
================================================== */

const xiaoStatus =
    document.querySelector(".xiao-status");


const xiaoStatusObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                xiaoStats.forEach(
                    (stat, index) => {

                        setTimeout(() => {

                            stat.classList.add(
                                "stat-online"
                            );

                        }, index * 170);

                    }
                );


                xiaoStatusObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.35
        }

    );


if (xiaoStatus) {

    xiaoStatusObserver.observe(
        xiaoStatus
    );

}


/* ==================================================
   SCROLL PARALLAX
================================================== */

function updateXiaoScroll() {

    if (!xiaoSection) {
        return;
    }


    const rect =
        xiaoSection.getBoundingClientRect();

    const viewportHeight =
        window.innerHeight;


    /*
        Don't calculate animations while
        Xiao is far outside the screen.
    */

    if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
    ) {
        return;
    }


    const totalDistance =
        rect.height + viewportHeight;


    const travelled =
        viewportHeight - rect.top;


    const progress =
        Math.max(
            0,
            Math.min(
                1,
                travelled / totalDistance
            )
        );


    /* =========================================
       XIAO ART
    ========================================= */

    if (xiaoArt) {

        const artMove =
            (progress - 0.45) * -90;


        xiaoArt.style.transform =
            `
            translateY(${artMove}px)
            `;

    }


    /* =========================================
       GIANT XIAO TYPOGRAPHY
    ========================================= */

    if (xiaoName) {

        const nameMove =
            (progress - 0.45) * 130;


        xiaoName.style.transform =
            `
            translate(
                calc(-50% + ${nameMove}px),
                -50%
            )
            `;

    }


    /* =========================================
       CELESTIAL RINGS
    ========================================= */

    xiaoRings.forEach(
        (ring, index) => {

            const direction =
                index % 2 === 0
                    ? 1
                    : -1;


            const rotation =
                progress *
                (18 + index * 12) *
                direction;


            ring.style.transform =
                `rotate(${rotation}deg)`;

        }
    );


    /*
        Ring 2 originally has -16deg
        in our CSS, so give that one
        its base rotation back.
    */

    const ringTwo =
        document.querySelector(
            ".xiao-ring-two"
        );


    if (ringTwo) {

        ringTwo.style.transform =
            `
            rotate(
                ${-16 - progress * 30}deg
            )
            `;

    }


    /* =========================================
       STARS
    ========================================= */

    xiaoStars.forEach(
        (star, index) => {

            const direction =
                index % 2 === 0
                    ? -1
                    : 1;


            const move =
                progress *
                (30 + index * 15) *
                direction;


            const rotation =
                progress *
                45 *
                direction;


            star.style.transform =
                `
                translateY(${move}px)
                rotate(${rotation}deg)
                `;

        }
    );


    /* =========================================
       BACKGROUND GLOWS
    ========================================= */

    if (xiaoGlowOne) {

        xiaoGlowOne.style.transform =
            `
            translate(
                ${progress * -35}px,
                ${progress * 55}px
            )
            scale(
                ${1 + progress * 0.12}
            )
            `;

    }


    if (xiaoGlowTwo) {

        xiaoGlowTwo.style.transform =
            `
            translate(
                ${progress * 30}px,
                ${progress * -40}px
            )
            scale(
                ${1 + progress * 0.08}
            )
            `;

    }

}


/* ==================================================
   RUN XIAO SCROLL
================================================== */

window.addEventListener(
    "scroll",
    updateXiaoScroll,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateXiaoScroll
);


updateXiaoScroll();

/* ==================================================
   09 / FOOTER
================================================== */

const archiveFooter =
    document.querySelector(".archive-footer");

const footerOrbit =
    document.querySelector(".footer-orbit");

const footerGlow =
    document.querySelector(".footer-glow");

const footerStars =
    document.querySelectorAll(".footer-star");

const footerContent =
    document.querySelector(".footer-content");

const footerInfo =
    document.querySelector(".footer-archive-info");

const footerBottom =
    document.querySelector(".footer-bottom");


/* ==================================================
   FOOTER ENTER
================================================== */

const footerObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                archiveFooter.classList.add(
                    "footer-visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.2
        }

    );


if (archiveFooter) {
    footerObserver.observe(
        archiveFooter
    );
}


/* ==================================================
   FOOTER SCROLL PARALLAX
================================================== */

function updateFooterScroll() {

    if (!archiveFooter) return;

    const rect =
        archiveFooter.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;


    if (
        rect.bottom < 0 ||
        rect.top > windowHeight
    ) {
        return;
    }


    const progress =
        Math.max(
            0,
            Math.min(
                1,
                (windowHeight - rect.top) /
                (windowHeight + rect.height)
            )
        );


    /* orbit */

    if (footerOrbit) {

        footerOrbit.style.transform =
            `
            translate(-50%, -50%)
            rotate(${-12 + progress * 28}deg)
            scale(${1 + progress * 0.05})
            `;

    }


    /* glow */

    if (footerGlow) {

        footerGlow.style.transform =
            `
            translate(-50%, -50%)
            translateY(${progress * -30}px)
            scale(${1 + progress * 0.08})
            `;

    }


    /* stars */

    footerStars.forEach((star, index) => {

        const direction =
            index % 2 === 0 ? -1 : 1;

        star.style.transform =
            `
            translateY(
                ${progress * 35 * direction}px
            )
            rotate(
                ${progress * 35 * direction}deg
            )
            `;

    });

}


window.addEventListener(
    "scroll",
    updateFooterScroll,
    {
        passive: true
    }
);

updateFooterScroll();

/* ==================================================
   CELESTIAL SCROLL INDICATOR
================================================== */

const celestialScroll =
    document.querySelector(".celestial-scroll");

const celestialStar =
    document.querySelector(".celestial-scroll-star");


let previousScrollY =
    window.scrollY;

let starRotation =
    0;

let scrollTicking =
    false;


/* ==================================================
   UPDATE STAR
================================================== */

function updateCelestialScroll() {

    if (!celestialScroll || !celestialStar) {
        return;
    }


    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        documentHeight > 0
            ? scrollTop / documentHeight
            : 0;


    /*
        Keep star inside the line.
    */

    const trackHeight =
        celestialScroll.clientHeight;


    const starSize =
        celestialStar.offsetHeight;


    const usableHeight =
        trackHeight - starSize;


    const starPosition =
        progress * usableHeight;


    /* =========================================
       ROTATION
    ========================================= */

    const scrollDifference =
        scrollTop - previousScrollY;


    starRotation +=
        scrollDifference * 0.35;


    /* =========================================
       APPLY
    ========================================= */

    celestialStar.style.top =
        `${starPosition + starSize / 2}px`;


    celestialStar.style.transform =
        `
        translate(-50%, -50%)
        rotate(${starRotation}deg)
        `;


    previousScrollY =
        scrollTop;


    scrollTicking = false;

}


/* ==================================================
   SCROLL
================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            requestAnimationFrame(
                updateCelestialScroll
            );

            scrollTicking = true;

        }

    },
    {
        passive: true
    }
);


/* ==================================================
   RESIZE
================================================== */

window.addEventListener(
    "resize",
    updateCelestialScroll
);


updateCelestialScroll();

/* ==================================================
   COMBAT VIDEO CONTROL
================================================== */

const combatSectionVideo =
    document.querySelector(".combat-section");

const combatVideoPlayer =
    document.querySelector(".combat-video");


if (combatSectionVideo && combatVideoPlayer) {

    const combatVideoObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        combatVideoPlayer.currentTime = 0;

                        combatVideoPlayer
                            .play()
                            .catch(() => {});

                    } else {

                        combatVideoPlayer.pause();

                    }

                });

            },

            {
                threshold: 0.18
            }

        );


    combatVideoObserver.observe(
        combatSectionVideo
    );


    /* =========================================
       VIDEO END
    ========================================= */

    combatVideoPlayer.addEventListener(
        "ended",
        () => {

            combatVideoPlayer.pause();

        }
    );

}