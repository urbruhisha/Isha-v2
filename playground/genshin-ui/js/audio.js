/* ==================================================
   ARCHIVE BACKGROUND AUDIO
================================================== */

const archiveAudio =
    document.querySelector("#archive-audio");

const audioToggle =
    document.querySelector("#audio-toggle");

const audioStatus =
    document.querySelector(".audio-status");


if (
    archiveAudio &&
    audioToggle &&
    audioStatus
) {

    /* nice quiet background level */
    archiveAudio.volume = 0.22;


    /* =========================================
       UPDATE UI
    ========================================= */

    function updateAudioUI() {

        const isPlaying =
            !archiveAudio.paused;


        audioToggle.classList.toggle(
            "audio-on",
            isPlaying
        );


        audioStatus.textContent =
            isPlaying
                ? "AUDIO // ON"
                : "AUDIO // OFF";

    }


    /* =========================================
       TRY AUTOPLAY
    ========================================= */

    archiveAudio
        .play()
        .then(() => {

            updateAudioUI();

        })
        .catch(() => {

            /*
                Browser blocked autoplay.
                That's okay — visitor can
                use the audio button.
            */

            updateAudioUI();

        });


    /* =========================================
       TOGGLE BUTTON
    ========================================= */

    audioToggle.addEventListener(
        "click",
        async () => {

            if (archiveAudio.paused) {

                try {

                    await archiveAudio.play();

                } catch (error) {

                    console.log(
                        "Audio playback was blocked."
                    );

                }

            } else {

                archiveAudio.pause();

            }

            updateAudioUI();

        }
    );


    archiveAudio.addEventListener(
        "play",
        updateAudioUI
    );


    archiveAudio.addEventListener(
        "pause",
        updateAudioUI
    );


    updateAudioUI();

}

/* ==================================================
   FIRST INTERACTION START
================================================== */

function startAudioOnInteraction() {

    if (archiveAudio.paused) {

        archiveAudio
            .play()
            .then(() => {

                updateAudioUI();

            })
            .catch(() => {});

    }


    document.removeEventListener(
        "click",
        startAudioOnInteraction
    );

}


document.addEventListener(
    "click",
    startAudioOnInteraction
);