/* ==================================================
   PORTFOLIO V2 — DESKTOP SYSTEM
================================================== */

const windows =
  document.querySelectorAll(".window");

const desktopIcons =
  document.querySelectorAll(".desktop-icon");

const desktop =
  document.querySelector(".desktop");

const closeButtons =
  document.querySelectorAll(".window-close");

let highestZIndex = 20;

/* ==================================================
   WINDOW HELPERS
================================================== */

function bringToFront(windowElement) {

  highestZIndex++;


  /* REMOVE FOCUS FROM OTHER WINDOWS */

  windows.forEach((window) => {
    window.classList.remove("focused");
  });


  /* FOCUS THIS WINDOW */

  windowElement.classList.add("focused");

  windowElement.style.zIndex =
    highestZIndex;
}


function openWindow(windowId) {
  const targetWindow = document.getElementById(windowId);

  if (!targetWindow) {
    return;
  }

  targetWindow.classList.add("active");

  bringToFront(targetWindow);

  updateTaskbar(windowId);
}


function closeWindow(windowElement) {

  windowElement.classList.remove("active");
  windowElement.classList.remove("minimized");
  windowElement.classList.remove("focused");


  /* PROJECT VIEWER CLEANUP */

  if (windowElement.id === "project-viewer") {

    const projectFrame =
      document.getElementById("project-frame");

    const projectTaskTab =
      document.getElementById("project-task-tab");

    const projectMaximizeButton =
      windowElement.querySelector(".window-maximize");


    /* stop / clear project */

    if (projectFrame) {
      projectFrame.src = "";
    }


    /* remove project from taskbar */

    if (projectTaskTab) {
      projectTaskTab.hidden = true;
      projectTaskTab.classList.remove("active");
    }


    /* reset maximize state */

    windowElement.classList.remove("maximized");


    if (projectMaximizeButton) {
      projectMaximizeButton.textContent = "□";
    }

  }


  updateTaskbar();
}

/* ==================================================
   DESKTOP ICONS
================================================== */

desktopIcons.forEach((icon) => {

  icon.addEventListener("click", (event) => {

    event.stopPropagation();


    /* REMOVE OLD SELECTION */

    desktopIcons.forEach((otherIcon) => {

      otherIcon.classList.remove(
        "selected"
      );

    });


    /* SELECT THIS ICON */

    icon.classList.add(
      "selected"
    );


    /* OPEN CONNECTED WINDOW */

    const windowId =
      icon.dataset.window;

    if (windowId) {
      openWindow(windowId);
    }

  });

});

/* ==================================================
   CLICK DESKTOP → DESELECT ICON
================================================== */

if (desktop) {

  desktop.addEventListener("click", (event) => {

    if (event.target.closest(".window")) {
      return;
    }

    if (event.target.closest(".desktop-icon")) {
      return;
    }


    desktopIcons.forEach((icon) => {

      icon.classList.remove(
        "selected"
      );

    });

  });

}

/* ==================================================
   CLOSE BUTTONS
================================================== */

closeButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.stopPropagation();

    const windowElement = button.closest(".window");

    closeWindow(windowElement);

  });

});


/* ==================================================
   CLICK WINDOW → BRING TO FRONT
================================================== */

windows.forEach((windowElement) => {

  windowElement.addEventListener("mousedown", () => {

    bringToFront(windowElement);

  });

});


/* ==================================================
   DRAGGABLE WINDOWS
================================================== */

windows.forEach((windowElement) => {

  const header =
    windowElement.querySelector(".window-header");

  if (!header) {
    return;
  }


  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;


  header.addEventListener("mousedown", (event) => {

    /*
      Don't drag when clicking
      one of the window buttons.
    */

    if (event.target.closest(".window-control")) {
      return;
    }


    isDragging = true;

    bringToFront(windowElement);


    const windowRect =
      windowElement.getBoundingClientRect();

    const desktopRect =
      document
        .querySelector(".desktop")
        .getBoundingClientRect();


    /*
      Convert our window position into
      desktop-relative pixel values.

      This also prevents the CSS positioning
      from fighting with dragging.
    */

    windowElement.style.left =
      `${windowRect.left - desktopRect.left}px`;

    windowElement.style.top =
      `${windowRect.top - desktopRect.top}px`;

    windowElement.style.transform =
      "none";


    offsetX =
      event.clientX - windowRect.left;

    offsetY =
      event.clientY - windowRect.top;


    document.body.classList.add("dragging");

  });


  document.addEventListener("mousemove", (event) => {

    if (!isDragging) {
      return;
    }


    const desktop =
      document.querySelector(".desktop");

    const desktopRect =
      desktop.getBoundingClientRect();


    const windowWidth =
      windowElement.offsetWidth;

    const windowHeight =
      windowElement.offsetHeight;


    /*
      Where the mouse wants
      the window to go.
    */

    let newLeft =
      event.clientX -
      desktopRect.left -
      offsetX;

    let newTop =
      event.clientY -
      desktopRect.top -
      offsetY;


    /*
      WINDOW BOUNDARIES

      This keeps Aisha from flying
      out of the portfolio again 😭
    */

    const maxLeft =
      desktop.clientWidth -
      windowWidth;

    const maxTop =
      desktop.clientHeight -
      windowHeight;


    newLeft =
      Math.max(
        0,
        Math.min(newLeft, maxLeft)
      );


    newTop =
      Math.max(
        0,
        Math.min(newTop, maxTop)
      );


    windowElement.style.left =
      `${newLeft}px`;

    windowElement.style.top =
      `${newTop}px`;

  });


  document.addEventListener("mouseup", () => {

    if (!isDragging) {
      return;
    }

    isDragging = false;

    document.body.classList.remove("dragging");

  });

});


/* ==================================================
   TASKBAR APPS
================================================== */

const taskTabs =
  document.querySelectorAll(".task-tab");


taskTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    const windowId =
      tab.dataset.window;


    /*
      Some taskbar buttons may not
      have a window connected yet.
    */

    if (!windowId) {
      return;
    }


    const targetWindow =
      document.getElementById(windowId);


    if (!targetWindow) {
      return;
    }


    /*
      If closed → open it.

      If already open → bring it
      to the front.
    */

    if (
  !targetWindow.classList.contains("active") ||
  targetWindow.classList.contains("minimized")
) {

  targetWindow.classList.remove("minimized");

  openWindow(windowId);

} else {

  bringToFront(targetWindow);

  updateTaskbar(windowId);

}

  });

});

/* ==================================================
   TASKBAR STATES
================================================== */

function updateTaskbar(activeWindowId = null) {

  taskTabs.forEach((tab) => {

    const connectedWindowId =
      tab.dataset.window;

    if (!connectedWindowId) {
      return;
    }


    const connectedWindow =
      document.getElementById(
        connectedWindowId
      );

    if (!connectedWindow) {
      return;
    }


    /* ACTIVE */

    if (
      connectedWindowId === activeWindowId
    ) {

      tab.classList.add("active");

    } else {

      tab.classList.remove("active");

    }


    /* RUNNING */

    if (
      connectedWindow.classList.contains(
        "active"
      )
    ) {

      tab.classList.add("running");

    } else {

      tab.classList.remove("running");

    }


    /* MINIMIZED */

    if (
      connectedWindow.classList.contains(
        "minimized"
      )
    ) {

      tab.classList.add("minimized");

    } else {

      tab.classList.remove("minimized");

    }

  });

}

/* ==================================================
   CLOCK
================================================== */

const topDate =
  document.getElementById("top-date");

const taskbarTime =
  document.getElementById("taskbar-time");


function updateClock() {

  const now =
    new Date();


  /* --------------------------
     TOP BAR

     Tue Aug 18 6:54 PM
  -------------------------- */

  if (topDate) {

    const weekday =
      now.toLocaleDateString(
        "en-US",
        {
          weekday: "short"
        }
      );


    const month =
      now.toLocaleDateString(
        "en-US",
        {
          month: "short"
        }
      );


    const day =
      now.getDate();


    const time =
      now.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    topDate.textContent =
      `${weekday} ${month} ${day} ${time}`;

  }


  /* --------------------------
     BOTTOM BAR

     6:54 PM
  -------------------------- */

  if (taskbarTime) {

    taskbarTime.textContent =
      now.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );

  }

}


updateClock();

setInterval(updateClock, 1000);

/* ==================================================
   START MENU
================================================== */

const startButton =
  document.getElementById("start-button");

const startMenu =
  document.getElementById("start-menu");

const startMenuItems =
  document.querySelectorAll(
    "[data-start-window]"
  );


function closeStartMenu() {

  if (!startMenu) {
    return;
  }

  startMenu.classList.remove("open");

  startMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  startButton?.classList.remove(
    "active"
  );

}


/* OPEN / CLOSE START */

if (
  startButton &&
  startMenu
) {

  startButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      const isOpen =
        startMenu.classList.toggle(
          "open"
        );

      startMenu.setAttribute(
        "aria-hidden",
        String(!isOpen)
      );

      startButton.classList.toggle(
        "active",
        isOpen
      );

    }
  );

}


/* OPEN APPS FROM START */

startMenuItems.forEach((item) => {

  item.addEventListener(
    "click",
    () => {

      const windowId =
        item.dataset.startWindow;

      if (!windowId) {
        return;
      }


      const targetWindow =
        document.getElementById(
          windowId
        );


      if (!targetWindow) {
        return;
      }


      /* restore if minimized */

      targetWindow.classList.remove(
        "minimized"
      );


      /* use our existing window system */

      openWindow(windowId);


      /* close Start menu */

      closeStartMenu();

    }
  );

});


/* CLICK OUTSIDE → CLOSE */

document.addEventListener(
  "click",
  (event) => {

    if (
      startMenu &&
      !startMenu.contains(event.target) &&
      !startButton?.contains(event.target)
    ) {

      closeStartMenu();

    }

  }
);
/* ==================================================
   INITIAL WINDOW STATE
================================================== */

/*
  welcome.exe starts open.
*/

const welcomeWindow =
  document.getElementById("welcome-window");


if (welcomeWindow) {

  welcomeWindow.classList.add("active");

  bringToFront(welcomeWindow);

  updateTaskbar("welcome-window");

}

const defaultHelpWindow =
  document.getElementById(
    "help-window"
  );


if (defaultHelpWindow) {

  defaultHelpWindow.classList.add(
    "active"
  );

  bringToFront(
    defaultHelpWindow
  );

}

/* ==================================================
   COPY EMAIL
================================================== */

const copyEmailButton =
  document.getElementById("copy-email");

const contactEmail =
  document.getElementById("contact-email");


if (copyEmailButton && contactEmail) {

  copyEmailButton.addEventListener("click", async () => {

    const email =
      contactEmail.textContent.trim();

    try {

      await navigator.clipboard.writeText(email);

      copyEmailButton.textContent =
        "copied! ♡";

      setTimeout(() => {

        copyEmailButton.textContent =
          "copy";

      }, 1500);

    } catch (error) {

      copyEmailButton.textContent =
        "oops";

    }

  });

}

/* ==================================================
   HELP MENU
================================================== */

const openHelpButton =
  document.getElementById(
    "open-help-window"
  );

const helpWindow =
  document.getElementById(
    "help-window"
  );

const helpGotItButton =
  document.getElementById(
    "help-got-it"
  );


/* OPEN HELP */

if (openHelpButton) {

  openHelpButton.addEventListener(
    "click",
    () => {

      openWindow(
        "help-window"
      );

      closeTopMenus();

    }
  );

}


/* GOT IT → CLOSE HELP */

if (
  helpGotItButton &&
  helpWindow
) {

  helpGotItButton.addEventListener(
    "click",
    () => {

      closeWindow(
        helpWindow
      );

    }
  );

}
/* ==================================================
   PROJECT VIEWER
================================================== */

const projectFolders =
  document.querySelectorAll("[data-project]");

const projectFrame =
  document.getElementById("project-frame");

const projectViewerTitle =
  document.getElementById("project-viewer-title");


const projects = {

  "rewind": {
    title: "rewind.exe",
    page: "projects/rewind/index.html"
  },

  "neko-brew": {
    title: "neko-brew.exe",
    page: "projects/neko-brew/index.html"
  },

  "woodblock": {
    title: "woodblock.exe",
    page: "projects/woodblock/index.html"
  },

  "urquiola": {
    title: "urquiola.exe",
    page: "projects/urquiola/index.html"
  },

  "game-ui": {
    title: "game-ui.exe",
    page: "projects/game-ui/index.html"
  }

};

const projectViewer =
  document.getElementById("project-viewer");

const projectTaskTab =
  document.getElementById("project-task-tab");

const projectTaskTitle =
  document.getElementById("project-task-title");

const projectMaximizeButton =
  projectViewer?.querySelector(".window-maximize");

const projectMinimizeButton =
  projectViewer?.querySelector(".window-minimize");

const projectLoader =
  document.getElementById("project-loader");

const projectLoaderText =
  document.getElementById("project-loader-text");
const playgroundCards =
  document.querySelectorAll(".play-card");

let currentProjectUrl = "";
/* ==================================================
   BROSWER VIEWER
================================================== */

const projectOpenBrowserButton =
  document.getElementById(
    "project-open-browser"
  );

if (projectOpenBrowserButton) {

  projectOpenBrowserButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      if (!currentProjectUrl) {
        return;
      }

      window.open(
        currentProjectUrl,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}
/* ==================================================
   PLAYGROUND PROJECTS
================================================== */

const playgroundProjects = {

  "ui-tests": {
    title: "ui-tests.exe",
    page: "playground/ui-test/index"
  },

"motion": {
  title: "motion.exe",
  page: "playground/motion-graphics/index.html"
},

  "mini-code": {
    title: "mini-code.exe",
    page: "playground/genshin-ui/index.html"
  },

  "brand-identities": {
    title: "brand-identities.exe",
    page: "playground/brand.pdf"
  }

};
/* 
==================================================
   PROJECT FOLDER CLICKS
================================================== */

projectFolders.forEach((folder) => {

  folder.addEventListener("click", () => {

    const projectName =
      folder.dataset.project;


    /* MORE PROJECTS → PLAYGROUND */

    if (projectName === "more-projects") {

      openWindow("playground-window");

      return;
    }


    /* FIND PROJECT */

    const project =
      projects[projectName];

    if (!project) {
      return;
    }


    /* UPDATE PROJECT VIEWER */

    projectViewerTitle.textContent =
      project.title;

    projectTaskTitle.textContent =
      project.title;

/* SHOW LOADING SCREEN */

if (projectLoader) {

  projectLoader.classList.add(
    "loading"
  );

}


if (projectLoaderText) {

  projectLoaderText.textContent =
    `opening ${project.title}...`;

}

currentProjectUrl =
  project.page;

projectFrame.src =
  project.page;


    /* SHOW TASKBAR TAB */

    projectTaskTab.hidden =
      false;


    /* RESTORE IF MINIMIZED */

    projectViewer.classList.remove(
      "minimized"
    );


    /* OPEN VIEWER */

    openWindow("project-viewer");

  });

});

/* ==================================================
   PROJECT FINISHED LOADING
================================================== */

if (
  projectFrame &&
  projectLoader
) {

  projectFrame.addEventListener(
    "load",
    () => {

      setTimeout(() => {

        projectLoader.classList.remove(
          "loading"
        );

      }, 700);

    }
  );

}

/* ==================================================
   PROJECT VIEWER — MAXIMIZE / RESTORE
================================================== */

if (
  projectMaximizeButton &&
  projectViewer
) {

  projectMaximizeButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      const isMaximized =
        projectViewer.classList.toggle(
          "maximized"
        );


      projectMaximizeButton.textContent =
        isMaximized
          ? "❐"
          : "□";

    }
  );

}


/* ==================================================
   PROJECT VIEWER — MINIMIZE
================================================== */

if (
  projectMinimizeButton &&
  projectViewer
) {

  projectMinimizeButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      projectViewer.classList.add(
        "minimized"
      );


      projectTaskTab.classList.remove(
        "active"
      );

    }
  );

}


/* ==================================================
   PROJECT VIEWER — RESTORE FROM TASKBAR
================================================== */

if (
  projectTaskTab &&
  projectViewer
) {

  projectTaskTab.addEventListener(
    "click",
    () => {

      if (
        projectViewer.classList.contains(
          "minimized"
        )
      ) {

        projectViewer.classList.remove(
          "minimized"
        );

        projectViewer.classList.add(
          "active"
        );

        bringToFront(
          projectViewer
        );

        updateTaskbar(
          "project-viewer"
        );

      }

    }
  );

}

/* ==================================================
   PLAYGROUND PROJECT CLICKS
================================================== */

playgroundCards.forEach((card) => {

  card.addEventListener("click", () => {

    const projectName =
      card.dataset.playground;

    const project =
      playgroundProjects[projectName];


    if (!project) {
      return;
    }


    /* UPDATE PROJECT VIEWER */

    projectViewerTitle.textContent =
      project.title;

    projectTaskTitle.textContent =
      project.title;


    /* SHOW LOADER */

    if (projectLoader) {

      projectLoader.classList.add(
        "loading"
      );

    }


    if (projectLoaderText) {

      projectLoaderText.textContent =
        `opening ${project.title}...`;

    }


    /* LOAD PROJECT */

    projectFrame.src =
      project.page;


    /* SHOW PROJECT IN TASKBAR */

    projectTaskTab.hidden =
      false;


    /* RESTORE IF MINIMIZED */

    projectViewer.classList.remove(
      "minimized"
    );


    /* OPEN PROJECT VIEWER */

    openWindow(
      "project-viewer"
    );

  });

});

/* ==================================================
   FILE MENU
================================================== */

const topMenuButtons =
  document.querySelectorAll(".top-menu-button");

const topDropdowns =
  document.querySelectorAll(".top-dropdown");

const fileProjectItems =
  document.querySelectorAll(
    "[data-file-project]"
  );

const filePlaygroundButton =
  document.querySelector(
    "[data-file-playground]"
  );


function closeTopMenus() {

  topDropdowns.forEach((menu) => {

    menu.classList.remove("open");

    menu.setAttribute(
      "aria-hidden",
      "true"
    );

  });


  topMenuButtons.forEach((button) => {

    button.classList.remove("active");

  });

}


/* OPEN / CLOSE TOP MENU */

topMenuButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.stopPropagation();


    const menuId =
      button.dataset.menu;

    const targetMenu =
      document.getElementById(menuId);


    if (!targetMenu) {
      return;
    }


    const wasOpen =
      targetMenu.classList.contains("open");


    closeTopMenus();


    if (!wasOpen) {

      targetMenu.classList.add("open");

      targetMenu.setAttribute(
        "aria-hidden",
        "false"
      );

      button.classList.add("active");

    }

  });

});


/* OPEN FEATURED PROJECT */

fileProjectItems.forEach((item) => {

  item.addEventListener("click", () => {

    const projectName =
      item.dataset.fileProject;

    const project =
      projects[projectName];


    if (!project) {
      return;
    }


    projectViewerTitle.textContent =
      project.title;

    projectTaskTitle.textContent =
      project.title;


    if (projectLoader) {

      projectLoader.classList.add(
        "loading"
      );

    }


    if (projectLoaderText) {

      projectLoaderText.textContent =
        `opening ${project.title}...`;

    }


    currentProjectUrl =
  project.page;

projectFrame.src =
  project.page;

    projectTaskTab.hidden =
      false;

    projectViewer.classList.remove(
      "minimized"
    );


    openWindow(
      "project-viewer"
    );


    closeTopMenus();

  });

});


/* MORE PROJECTS → PLAYGROUND */

if (filePlaygroundButton) {

  filePlaygroundButton.addEventListener(
    "click",
    () => {

      openWindow(
        "playground-window"
      );

      closeTopMenus();

    }
  );

}


/* CLICK OUTSIDE */

document.addEventListener(
  "click",
  (event) => {

    if (
      event.target.closest(
        ".top-dropdown"
      )
    ) {
      return;
    }


    if (
      event.target.closest(
        ".top-menu-button"
      )
    ) {
      return;
    }


    closeTopMenus();

  }
);

/* ==================================================
   EDIT MENU
================================================== */

const toggleDesktopIcons =
  document.getElementById(
    "toggle-desktop-icons"
  );

const toggleMotion =
  document.getElementById(
    "toggle-motion"
  );

const resetDesktopButton =
  document.getElementById(
    "reset-desktop"
  );


let desktopIconsVisible = true;

let motionEnabled = true;

/* ==================================================
   VIEW — COLOR THEMES
================================================== */

const themeOptions =
  document.querySelectorAll(
    ".theme-option"
  );


const themeClasses = [
  "theme-strawberry-matcha",
  "theme-blueberry",
  "theme-soft-pink"
];


function applyTheme(theme) {

  /* REMOVE OLD THEME */

  document.body.classList.remove(
    ...themeClasses
  );


  /* ADD NEW THEME */

  if (theme !== "pastel") {

    document.body.classList.add(
      `theme-${theme}`
    );

  }


  /* UPDATE CHECKMARKS */

  themeOptions.forEach((option) => {

    const isActive =
      option.dataset.theme === theme;


    option.classList.toggle(
      "active",
      isActive
    );


    const check =
      option.querySelector(
        ".menu-check"
      );


    if (check) {

      check.textContent =
        isActive ? "✓" : "";

    }

  });


  /* REMEMBER CHOICE */

  localStorage.setItem(
    "portfolio-theme",
    theme
  );

}


/* CLICK THEME */

themeOptions.forEach((option) => {

  option.addEventListener(
    "click",
    () => {

      const theme =
        option.dataset.theme;


      applyTheme(theme);

      closeTopMenus();

    }
  );

});


/* RESTORE SAVED THEME */

const savedTheme =
  localStorage.getItem(
    "portfolio-theme"
  );


if (savedTheme) {

  applyTheme(savedTheme);

}
/* ==================================================
   SAVE ORIGINAL WINDOW POSITIONS
================================================== */

const originalWindowPositions =
  new Map();


windows.forEach((windowElement) => {

  originalWindowPositions.set(
    windowElement.id,
    {
      top: windowElement.style.top,
      left: windowElement.style.left,
      right: windowElement.style.right,
      transform: windowElement.style.transform
    }
  );

});


/* ==================================================
   SHOW / HIDE DESKTOP ICONS
================================================== */

if (
  toggleDesktopIcons &&
  desktop
) {

  toggleDesktopIcons.addEventListener(
    "click",
    () => {

      desktopIconsVisible =
        !desktopIconsVisible;


      desktop.classList.toggle(
        "hide-icons",
        !desktopIconsVisible
      );


      toggleDesktopIcons.classList.toggle(
        "disabled",
        !desktopIconsVisible
      );


      closeTopMenus();

    }
  );

}


/* ==================================================
   MOTION ON / OFF
================================================== */

if (toggleMotion) {

  toggleMotion.addEventListener(
    "click",
    () => {

      motionEnabled =
        !motionEnabled;


      document.body.classList.toggle(
        "motion-off",
        !motionEnabled
      );


      toggleMotion.classList.toggle(
        "disabled",
        !motionEnabled
      );


      closeTopMenus();

    }
  );

}


/* ==================================================
   RESET DESKTOP
================================================== */

if (resetDesktopButton) {

  resetDesktopButton.addEventListener(
    "click",
    () => {
        
/* -------------------------
   RESET THEME
------------------------- */

applyTheme("pastel");

      /* -------------------------
         RESET ICONS
      ------------------------- */

      desktopIconsVisible = true;

      desktop.classList.remove(
        "hide-icons"
      );

      toggleDesktopIcons?.classList.remove(
        "disabled"
      );


      desktopIcons.forEach((icon) => {

        icon.classList.remove(
          "selected"
        );

      });


      /* -------------------------
         RESET MOTION
      ------------------------- */

      motionEnabled = true;

      document.body.classList.remove(
        "motion-off"
      );

      toggleMotion?.classList.remove(
        "disabled"
      );


      /* -------------------------
         RESET WINDOWS
      ------------------------- */

      windows.forEach((windowElement) => {

        windowElement.classList.remove(
          "active",
          "focused",
          "minimized",
          "maximized"
        );


        const original =
          originalWindowPositions.get(
            windowElement.id
          );


        if (original) {

          windowElement.style.top =
            original.top;

          windowElement.style.left =
            original.left;

          windowElement.style.right =
            original.right;

          windowElement.style.transform =
            original.transform;

        }


        windowElement.style.zIndex = "";

      });


      /* -------------------------
         RESET PROJECT VIEWER
      ------------------------- */

      if (projectFrame) {
        projectFrame.src = "";
      }


      if (projectTaskTab) {

        projectTaskTab.hidden =
          true;

      }


      if (projectMaximizeButton) {

        projectMaximizeButton.textContent =
          "□";

      }


      /* -------------------------
         REOPEN DEFAULT WINDOWS
      ------------------------- */

      openWindow(
        "welcome-window"
      );


      /*
        Later we'll add:
        openWindow("help-window");
      */


      closeTopMenus();

    }
  );

}

/* ==================================================
   WINDOW MENU
================================================== */

const minimizeAllButton =
  document.getElementById(
    "minimize-all"
  );

const showAllButton =
  document.getElementById(
    "show-all"
  );

const closeAllButton =
  document.getElementById(
    "close-all"
  );

const bringWelcomeButton =
  document.getElementById(
    "bring-welcome-forward"
  );


/* ==================================================
   MINIMIZE ALL
================================================== */

if (minimizeAllButton) {

  minimizeAllButton.addEventListener(
    "click",
    () => {

      windows.forEach((windowElement) => {

        if (
          windowElement.classList.contains(
            "active"
          )
        ) {

          windowElement.classList.add(
            "minimized"
          );

          windowElement.classList.remove(
            "focused"
          );

        }

      });


      updateTaskbar();

      closeTopMenus();

    }
  );

}


/* ==================================================
   WINDOW MENU — MINIMIZE / SHOW ALL
================================================== */

const minimizedByWindowMenu =
  new Set();


/* ==================================================
   WINDOW MENU — MINIMIZE / SHOW ALL
================================================== */

let minimizedWindowsList = [];


/* ==================================================
   MINIMIZE ALL
================================================== */

if (minimizeAllButton) {

  minimizeAllButton.addEventListener(
    "click",
    () => {

      minimizedWindowsList = [];


      windows.forEach((windowElement) => {

        if (
          windowElement.classList.contains("active")
        ) {

          minimizedWindowsList.push(
            windowElement
          );

          windowElement.classList.add(
            "minimized"
          );

          windowElement.classList.remove(
            "focused"
          );

        }

      });


      updateTaskbar();

      closeTopMenus();

    }
  );

}


/* ==================================================
   SHOW ALL
================================================== */

if (showAllButton) {

  showAllButton.addEventListener(
    "click",
    () => {

      minimizedWindowsList.forEach(
        (windowElement) => {

          windowElement.classList.add(
            "active"
          );

          windowElement.classList.remove(
            "minimized"
          );

        }
      );


      if (minimizedWindowsList.length > 0) {

        const lastWindow =
          minimizedWindowsList[
            minimizedWindowsList.length - 1
          ];


        bringToFront(
          lastWindow
        );

        updateTaskbar(
          lastWindow.id
        );

      }


      minimizedWindowsList = [];


      closeTopMenus();

    }
  );

}
/* ==================================================
   BRING WELCOME FORWARD
================================================== */

if (bringWelcomeButton) {

  bringWelcomeButton.addEventListener(
    "click",
    () => {

      const welcomeWindow =
        document.getElementById(
          "welcome-window"
        );


      if (!welcomeWindow) {
        return;
      }


      welcomeWindow.classList.remove(
        "minimized"
      );


      if (
        !welcomeWindow.classList.contains(
          "active"
        )
      ) {

        openWindow(
          "welcome-window"
        );

      } else {

        bringToFront(
          welcomeWindow
        );

        updateTaskbar(
          "welcome-window"
        );

      }


      closeTopMenus();

    }
  );

}