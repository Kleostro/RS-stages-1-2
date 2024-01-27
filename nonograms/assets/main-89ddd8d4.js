(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
function CreateElement({
  tag = "div",
  classes = [],
  attrs = {},
  parent,
  textContent
}) {
  this.tag = tag;
  this.classes = classes;
  this.attrNames = Object.keys(attrs);
  this.attrValues = Object.values(attrs);
  this.parent = parent;
  this.textContent = textContent;
  const elem = document.createElement(this.tag);
  if (this.classes) {
    elem.classList.add(...this.classes);
  }
  if (this.attrNames) {
    this.attrNames.forEach((attrName, index) => {
      elem.setAttribute(attrName, this.attrValues[index]);
    });
  }
  if (this.parent) {
    this.parent.append(elem);
  }
  if (this.textContent) {
    elem.textContent = this.textContent;
  }
  return elem;
}
const header$1 = "";
const logoSrc = "" + new URL("logo-66d7d6cd.svg", import.meta.url).href;
const header = new CreateElement({
  tag: "header",
  classes: ["header"]
});
const headerContainer = new CreateElement({
  tag: "div",
  classes: ["header__container", "container"],
  parent: header
});
const logo = new CreateElement({
  tag: "a",
  classes: ["header__logo"],
  attrs: {
    href: "#"
  },
  parent: headerContainer
});
new CreateElement({
  tag: "img",
  classes: ["header__logo-img"],
  attrs: {
    src: logoSrc,
    alt: "logo"
  },
  parent: logo
});
new CreateElement({
  tag: "h1",
  classes: ["header__title"],
  parent: headerContainer,
  textContent: "Nonograms"
});
const switchThemeBtn = new CreateElement({
  tag: "button",
  classes: ["btn-reset", "header__switch-btn"],
  parent: headerContainer,
  textContent: "Dark"
});
const game = "";
const gameSection = new CreateElement({
  tag: "section",
  classes: ["game"]
});
const gameContainer = new CreateElement({
  tag: "div",
  classes: ["game__container", "container"],
  parent: gameSection
});
const gameWrapper = new CreateElement({
  tag: "div",
  classes: ["game__wrapper"],
  parent: gameContainer
});
const playground = new CreateElement({
  tag: "div",
  classes: ["playground"],
  parent: gameWrapper
});
const topHintsBox = new CreateElement({
  tag: "div",
  classes: ["top-hints"],
  parent: gameWrapper
});
const leftHintsBox = new CreateElement({
  tag: "div",
  classes: ["left-hints"],
  parent: gameWrapper
});
const timer = new CreateElement({
  tag: "span",
  classes: ["timer"],
  parent: gameWrapper,
  textContent: "00:00"
});
const endGameModal$1 = "";
const modal = new CreateElement({
  tag: "div",
  classes: ["modal", "visible"]
});
const modalOverlay = new CreateElement({
  tag: "div",
  classes: ["modal__overlay", "visible"],
  parent: modal
});
const modalContent = new CreateElement({
  tag: "div",
  classes: ["modal__content", "visible"],
  parent: modalOverlay
});
const modalTitle = new CreateElement({
  tag: "h3",
  classes: ["modal__title"],
  parent: modalContent,
  textContent: "Great! You have solved the nonogram: "
});
const modalSubtitle = new CreateElement({
  tag: "span",
  classes: ["modal__title-accent"],
  parent: modalTitle
});
const modalTimer = new CreateElement({
  tag: "h3",
  classes: ["modal__timer"],
  parent: modalContent,
  textContent: "Time: "
});
const modalTimerTime = new CreateElement({
  tag: "strong",
  classes: ["modal__timer-accent"],
  parent: modalTimer
});
const modalCloseBtn = new CreateElement({
  tag: "button",
  classes: ["btn-reset", "modal__close-btn"],
  parent: modalContent
});
const modalNonogram = new CreateElement({
  tag: "div",
  classes: ["modal__nonogram"],
  parent: modalContent
});
const showModal = () => {
  modal.classList.toggle("visible");
  modalOverlay.classList.toggle("visible");
  modalContent.classList.toggle("visible");
};
const showNonogramSolutionInModal = (copyPlayground) => {
  modalNonogram.innerHTML = "";
  const copyPlaygroundRows = Array.from(copyPlayground.children);
  copyPlaygroundRows.forEach((row) => {
    row.removeAttribute("class");
    row.classList.add("modal__nonogram-row");
    Array.from(row.children).forEach((cell) => {
      cell.classList.remove("cell-highlight");
      cell.classList.remove("playground__cell");
      cell.classList.add("modal__nonogram-cell");
    });
  });
  modalNonogram.append(...copyPlaygroundRows);
};
modalCloseBtn.addEventListener("click", showModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    showModal();
  }
});
const endGameModal = (title2, copyPlayground) => {
  modalSubtitle.textContent = title2;
  modalTimerTime.textContent = timer.textContent;
  showModal();
  showNonogramSolutionInModal(copyPlayground);
};
const nonogramsData = [
  {
    matrix: [
      [
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ]
    ],
    title: "camel",
    size: "5x5"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0
      ]
    ],
    title: "bomb",
    size: "5x5"
  },
  {
    matrix: [
      [
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        1
      ]
    ],
    title: "turtle",
    size: "5x5"
  },
  {
    matrix: [
      [
        0,
        1,
        0,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        1,
        1,
        1
      ],
      [
        1,
        0,
        1,
        0,
        1
      ]
    ],
    title: "kitten",
    size: "5x5"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0
      ]
    ],
    title: "dinosaur",
    size: "5x5"
  },
  {
    matrix: [
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ]
    ],
    title: "snowman",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1
      ]
    ],
    title: "turnip",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ]
    ],
    title: "face with tongue out",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ]
    ],
    title: "mushroom",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0
      ]
    ],
    title: "dog",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ]
    ],
    title: "Mickey Mouse",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0
      ]
    ],
    title: "pegasus",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1
      ]
    ],
    title: "cupid",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ]
    ],
    title: "cherry",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ]
    ],
    title: "paw print",
    size: "15x15"
  }
];
const playgroundRowsArr = [];
const playgroundCellsArr = [];
const LEFT_HINTS_DIRECTION$1 = "left";
const TOP_HINTS_DIRECTION$1 = "top";
const DARK_THEME = "Dark";
const LIGHT_THEME = "Light";
const clearPlaygroundArr = () => {
  playgroundRowsArr.length = 0;
  playgroundCellsArr.length = 0;
};
const createCurrentPlayground = (matrix2) => {
  const currentPlayground2 = [];
  clearPlaygroundArr();
  playground.innerHTML = "";
  for (let row = 0; row < matrix2.length; row += 1) {
    const rowElement = new CreateElement({
      tag: "div",
      classes: ["playground__row"],
      attrs: {
        "data-row": row
      },
      parent: playground
    });
    playgroundRowsArr.push(rowElement);
    currentPlayground2[row] = [];
    for (let cell = 0; cell < matrix2[0].length; cell += 1) {
      const cellElement = new CreateElement({
        tag: "div",
        classes: ["playground__cell"],
        attrs: {
          "data-cell": cell
        },
        parent: rowElement
      });
      playgroundCellsArr.push(cellElement);
      currentPlayground2[row][cell] = 0;
    }
  }
  return currentPlayground2;
};
const updateArrsLastGame = () => {
  clearPlaygroundArr();
  Array.from(playground.children).forEach((row) => {
    playgroundRowsArr.push(row);
    Array.from(row.children).forEach((cell) => {
      playgroundCellsArr.push(cell);
    });
  });
};
const createHints = (matrix2, box, direction) => {
  const hintsBox = box;
  hintsBox.innerHTML = "";
  const rowHints = [];
  const columnHints = [];
  for (let row = 0; row < matrix2.length; row += 1) {
    const hints = [];
    let hintCounter = 0;
    const hintRow = new CreateElement({
      tag: "div",
      classes: [`${direction}-hints__row`],
      parent: hintsBox
    });
    for (let cell = 0; cell < matrix2[row].length; cell += 1) {
      if (direction === LEFT_HINTS_DIRECTION$1 && matrix2[row][cell] === 1) {
        hintCounter += 1;
      } else if (direction === TOP_HINTS_DIRECTION$1 && matrix2[cell][row] === 1) {
        hintCounter += 1;
      } else if (hintCounter > 0) {
        hints.push(hintCounter);
        hintCounter = 0;
      }
    }
    if (hintCounter > 0) {
      hints.push(hintCounter);
    }
    hints.forEach((hint) => {
      new CreateElement({
        tag: "div",
        classes: [`${direction}-hints__cell`],
        parent: hintRow,
        textContent: hint
      });
    });
    if (direction === LEFT_HINTS_DIRECTION$1) {
      rowHints.push(hints);
    } else if (direction === TOP_HINTS_DIRECTION$1) {
      columnHints.push(hints);
    }
  }
  return direction === LEFT_HINTS_DIRECTION$1 ? rowHints : columnHints;
};
const removeHighlightCells = () => {
  playgroundCellsArr.forEach((cell) => {
    cell.classList.remove("cell-highlight");
  });
  playgroundRowsArr.forEach((row) => {
    row.classList.remove("row-highlight");
  });
};
const highlightCurrentColumnAndRow = (event, matrix2) => {
  const rect = playground.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let rowIndex = Math.floor(y / playgroundCellsArr[0].offsetWidth);
  let cellIndex = Math.floor(x / playgroundCellsArr[0].offsetHeight);
  if (rowIndex > matrix2.length - 1) {
    rowIndex = matrix2.length - 1;
  }
  if (cellIndex > matrix2.length - 1) {
    cellIndex = matrix2.length - 1;
  }
  removeHighlightCells();
  if (rowIndex < matrix2.length && rowIndex >= 0) {
    const currentRow = playgroundRowsArr[rowIndex];
    currentRow.classList.add("row-highlight");
  }
  if (cellIndex < matrix2.length && cellIndex >= 0) {
    const currentCells = playgroundCellsArr.filter((cell) => cell.getAttribute("data-cell") === `${cellIndex}`);
    currentCells.forEach((cell) => cell.classList.add("cell-highlight"));
  }
};
const createUniqueMatrixSizeObj = () => {
  const uniqueMatrixSizeObj2 = /* @__PURE__ */ new Set();
  nonogramsData.forEach((nonogram) => {
    uniqueMatrixSizeObj2.add(nonogram.size);
  });
  return uniqueMatrixSizeObj2;
};
const removeDisabledBtn = (btnsArr) => {
  btnsArr.forEach((item) => {
    const otherBtn = item;
    otherBtn.disabled = false;
  });
};
const searchCurrentNonogramByTitle = (currTitle) => nonogramsData.find((item) => item.title === currTitle);
const searchCurrentNonogramsBySize = (currSize) => nonogramsData.filter((item) => item.size === currSize);
const updateNonogramsList = (sizesSubtitle2, nonogramBtns2, nonogramsSubtitle2) => {
  const filterNonogramsArr2 = searchCurrentNonogramsBySize(sizesSubtitle2.textContent);
  const subtitle = nonogramsSubtitle2;
  removeDisabledBtn(nonogramBtns2);
  nonogramBtns2.forEach((btn, index) => {
    const currentBtn = btn;
    currentBtn.textContent = filterNonogramsArr2[index].title;
    if (index === 0) {
      currentBtn.disabled = true;
      subtitle.textContent = filterNonogramsArr2[index].title;
    }
  });
};
const changePaintedClass = (e) => {
  if (e.target.classList.contains("painted"))
    e.target.classList.remove("painted");
  else if (e.target.classList.contains("crossed"))
    e.target.classList.remove("crossed");
  else
    e.target.classList.add("painted");
};
const changeCrossedClass = (e) => {
  if (e.target.classList.contains("crossed"))
    e.target.classList.remove("crossed");
  else {
    e.target.classList.add("crossed");
    e.target.classList.remove("painted");
  }
};
const resetCurrentGame = (currentPlayground2) => {
  currentPlayground2.forEach((row) => {
    row.forEach((cell, index, arr) => {
      const rowArr = arr;
      if (cell === 1) {
        rowArr[index] = 0;
      }
    });
  });
  playgroundCellsArr.forEach((cell) => {
    cell.classList.remove("painted", "crossed");
  });
};
const switchTheme = () => {
  const prevTheme = switchThemeBtn.textContent;
  if (prevTheme === DARK_THEME) {
    switchThemeBtn.textContent = LIGHT_THEME;
  } else {
    switchThemeBtn.textContent = DARK_THEME;
  }
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
};
const sizeBtns = [];
const nonogramBtns = [];
const uniqueMatrixSizeObj = createUniqueMatrixSizeObj();
const settingsBox = new CreateElement({
  tag: "div",
  classes: ["settings"],
  parent: gameContainer
});
const sizes = new CreateElement({
  tag: "div",
  classes: ["sizes"],
  parent: settingsBox
});
const sizesBox = new CreateElement({
  tag: "div",
  classes: ["sizes__box"],
  parent: sizes
});
const sizesTitle = new CreateElement({
  tag: "strong",
  classes: ["sizes__title"],
  parent: sizesBox,
  textContent: "Size: "
});
const sizesSubtitle = new CreateElement({
  tag: "span",
  classes: ["sizes__subtitle"],
  parent: sizesTitle,
  textContent: "5x5"
});
const sizesDropList = new CreateElement({
  tag: "ul",
  classes: ["list-reset", "sizes__list", "hidden"],
  parent: sizes
});
uniqueMatrixSizeObj.forEach((size2) => {
  const sizesListItem = new CreateElement({
    tag: "li",
    classes: ["sizes__list-item"],
    parent: sizesDropList
  });
  const sizeBtn = new CreateElement({
    tag: "button",
    classes: ["btn-reset", "sizes__list-btn"],
    parent: sizesListItem,
    textContent: size2
  });
  if (size2 === Array.from(uniqueMatrixSizeObj)[0]) {
    sizeBtn.disabled = true;
  }
  sizeBtns.push(sizeBtn);
});
const nonograms = new CreateElement({
  tag: "div",
  classes: ["nonograms"],
  parent: settingsBox
});
const nonogramsBox = new CreateElement({
  tag: "div",
  classes: ["nonograms__box"],
  parent: nonograms
});
const nonogramsTitle = new CreateElement({
  tag: "strong",
  classes: ["nonograms__title"],
  parent: nonogramsBox,
  textContent: "Selected: "
});
const nonogramsSubtitle = new CreateElement({
  tag: "span",
  classes: ["nonograms__subtitle"],
  parent: nonogramsTitle
});
const nonogramsDropList = new CreateElement({
  tag: "ul",
  classes: ["list-reset", "nonograms__list", "hidden"],
  parent: nonograms
});
const filterNonogramsArr = nonogramsData.filter((item) => item.size === sizesSubtitle.textContent);
filterNonogramsArr.forEach((_, index) => {
  const nonogramsListItem = new CreateElement({
    tag: "li",
    classes: ["nonograms__list-item"],
    parent: nonogramsDropList
  });
  const nonogramBtn = new CreateElement({
    tag: "button",
    classes: ["btn-reset", "nonograms__list-btn"],
    parent: nonogramsListItem,
    textContent: filterNonogramsArr[index].title
  });
  if (filterNonogramsArr[0].title === filterNonogramsArr[index].title) {
    nonogramBtn.disabled = true;
    nonogramsSubtitle.textContent = filterNonogramsArr[index].title;
  }
  nonogramBtns.push(nonogramBtn);
});
const startGameBtn = new CreateElement({
  tag: "button",
  classes: ["btn-reset", "settings__start-btn"],
  parent: settingsBox,
  textContent: "Play"
});
const resetBtn = new CreateElement({
  tag: "button",
  classes: ["btn-reset", "settings__reset-btn"],
  parent: settingsBox,
  textContent: "Reset"
});
const saveGameBtn = new CreateElement({
  tag: "button",
  classes: ["btn-reset", "settings__save-btn"],
  parent: settingsBox,
  textContent: "Save game"
});
const continueGameBtn = new CreateElement({
  tag: "button",
  classes: ["btn-reset", "settings__continue-btn"],
  parent: settingsBox,
  textContent: "Continue last game"
});
const LEFT_HINTS_DIRECTION = "left";
const TOP_HINTS_DIRECTION = "top";
const INIT_TIMER_TEXT_CONTENT = "00:00";
const SIZE_PLAYGROUND = {
  "5x5": "small",
  "10x10": "medium",
  "15x15": "large"
};
const TIMER_MILLISECONDS_IN_SECOND = 1e3;
const TIMER_MILLISECONDS_IN_MINUTE = 6e4;
let elapsedTimerTime = 0;
let startTimerTime = null;
let isTimerRunning = false;
let currentPlayground = [];
let currentNonogram = {};
let { matrix, title, size } = currentNonogram;
const startGameTimer = (timeStamp) => {
  if (!startTimerTime) {
    startTimerTime = timeStamp;
  }
  elapsedTimerTime = timeStamp - startTimerTime;
  const minutes = Math.floor(elapsedTimerTime / TIMER_MILLISECONDS_IN_MINUTE);
  const seconds = Math.floor(elapsedTimerTime % TIMER_MILLISECONDS_IN_MINUTE / TIMER_MILLISECONDS_IN_SECOND);
  const formattedSec = String(seconds).padStart(2, "0");
  const formattedMin = String(minutes).padStart(2, "0");
  timer.textContent = `${formattedMin}:${formattedSec}`;
  if (isTimerRunning) {
    requestAnimationFrame(startGameTimer);
  }
};
const startGame = () => {
  isTimerRunning = false;
  startTimerTime = null;
  timer.textContent = INIT_TIMER_TEXT_CONTENT;
  resetBtn.disabled = false;
  saveGameBtn.disabled = false;
  if (!localStorage.getItem("current-matrix")) {
    continueGameBtn.disabled = true;
  } else {
    continueGameBtn.disabled = false;
  }
  playground.classList.remove("lock");
  currentNonogram = searchCurrentNonogramByTitle(nonogramsSubtitle.textContent);
  matrix = currentNonogram.matrix;
  title = currentNonogram.title;
  size = currentNonogram.size;
  gameWrapper.removeAttribute("class");
  gameWrapper.classList.add("game__wrapper", SIZE_PLAYGROUND[size]);
  currentPlayground = createCurrentPlayground(matrix);
  createHints(matrix, leftHintsBox, LEFT_HINTS_DIRECTION);
  createHints(matrix, topHintsBox, TOP_HINTS_DIRECTION);
};
const endGame = () => {
  isTimerRunning = false;
  playground.classList.add("lock");
  const copyPlayground = playground.cloneNode(true);
  endGameModal(title, copyPlayground);
  resetBtn.disabled = true;
  saveGameBtn.disabled = true;
};
playground.addEventListener("click", (e) => {
  const currentCell = e.target;
  const currentRow = currentCell.parentNode;
  const currentCellIndex = currentCell.getAttribute("data-cell");
  const currentRowIndex = currentRow.getAttribute("data-row");
  if (currentRowIndex && currentCellIndex) {
    if (!currentCell.classList.contains("painted") && !currentCell.classList.contains("crossed")) {
      currentPlayground[currentRowIndex][currentCellIndex] = 1;
    } else {
      currentPlayground[currentRowIndex][currentCellIndex] = 0;
    }
  }
  if (!isTimerRunning) {
    isTimerRunning = true;
    startTimerTime = null;
    requestAnimationFrame(startGameTimer);
  }
  changePaintedClass(e);
  console.log(currentPlayground, matrix);
  if (currentPlayground.every((_, rowIndex) => currentPlayground[rowIndex].every((elem, cellIndex) => elem === matrix[rowIndex][cellIndex]))) {
    endGame();
  }
});
playground.addEventListener("mousemove", (event) => {
  highlightCurrentColumnAndRow(event, matrix);
});
playground.addEventListener("mouseleave", () => {
  removeHighlightCells();
});
playground.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  changeCrossedClass(e);
});
resetBtn.addEventListener("click", () => {
  resetCurrentGame(currentPlayground);
});
const saveDataCurrentGame = () => {
  localStorage["current-game"] = JSON.stringify(currentPlayground);
  localStorage["left-hints"] = leftHintsBox.innerHTML;
  localStorage["top-hints"] = topHintsBox.innerHTML;
  localStorage["current-playground"] = playground.innerHTML;
  localStorage["current-matrix"] = JSON.stringify(matrix);
  localStorage["current-title"] = JSON.stringify(title);
  localStorage["current-size"] = JSON.stringify(size);
};
saveGameBtn.addEventListener("click", () => {
  saveDataCurrentGame();
  if (!localStorage.getItem("current-matrix")) {
    continueGameBtn.disabled = true;
  } else {
    continueGameBtn.disabled = false;
  }
});
const readDataLastGame = () => {
  matrix = JSON.parse(localStorage["current-matrix"]);
  title = JSON.parse(localStorage["current-title"]);
  size = JSON.parse(localStorage["current-size"]);
  currentPlayground = JSON.parse(localStorage["current-game"]);
};
const continueLastGame = () => {
  readDataLastGame();
  createCurrentPlayground(JSON.parse(localStorage["current-game"]));
  const savedLeftHints = localStorage["left-hints"];
  if (savedLeftHints) {
    leftHintsBox.innerHTML = savedLeftHints;
  }
  const savedTopHints = localStorage["top-hints"];
  if (savedTopHints) {
    topHintsBox.innerHTML = savedTopHints;
  }
  const savedPlayground = localStorage["current-playground"];
  if (savedPlayground) {
    playground.innerHTML = savedPlayground;
  }
  gameWrapper.removeAttribute("class");
  gameWrapper.classList.add("game__wrapper", SIZE_PLAYGROUND[size]);
  updateArrsLastGame();
  removeDisabledBtn(sizeBtns);
  sizeBtns.forEach((btn) => {
    const currentBtn = btn;
    if (currentBtn.textContent === size) {
      currentBtn.disabled = true;
      sizesSubtitle.textContent = size;
    }
  });
  updateNonogramsList(sizesSubtitle, nonogramBtns, nonogramsSubtitle);
  removeDisabledBtn(nonogramBtns);
  nonogramBtns.forEach((btn) => {
    const currentBtn = btn;
    if (currentBtn.textContent === title) {
      currentBtn.disabled = true;
      nonogramsSubtitle.textContent = title;
    }
  });
};
continueGameBtn.addEventListener("click", () => {
  continueLastGame();
  playground.classList.remove("lock");
  resetBtn.disabled = false;
});
showModal();
const settings = "";
let isLockSizes = false;
let isLockNonograms = false;
const showSizesDropList = () => {
  sizesBox.classList.add("active");
  sizesDropList.classList.remove("hidden");
};
const hiddenSizesDropList = () => {
  sizesBox.classList.remove("active");
  sizesDropList.classList.add("hidden");
};
sizes.addEventListener("mouseover", () => {
  if (!isLockSizes) {
    showSizesDropList();
  }
});
sizes.addEventListener("mouseleave", () => {
  if (!isLockSizes) {
    hiddenSizesDropList();
  }
});
sizesBox.addEventListener("click", () => {
  isLockSizes = !isLockSizes;
});
const showNonogramsDropList = () => {
  nonogramsBox.classList.add("active");
  nonogramsDropList.classList.remove("hidden");
};
const hiddenNonogramsDropList = () => {
  nonogramsBox.classList.remove("active");
  nonogramsDropList.classList.add("hidden");
};
nonograms.addEventListener("mouseover", () => {
  if (!isLockNonograms) {
    showNonogramsDropList();
  }
});
nonograms.addEventListener("mouseleave", () => {
  if (!isLockNonograms) {
    hiddenNonogramsDropList();
  }
});
nonogramsBox.addEventListener("click", () => {
  isLockNonograms = !isLockNonograms;
});
sizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentBtn = btn;
    removeDisabledBtn(sizeBtns);
    currentBtn.disabled = true;
    sizesSubtitle.textContent = currentBtn.textContent;
    updateNonogramsList(sizesSubtitle, nonogramBtns, nonogramsSubtitle);
  });
});
nonogramBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentBtn = btn;
    removeDisabledBtn(nonogramBtns);
    currentBtn.disabled = true;
    nonogramsSubtitle.textContent = currentBtn.textContent;
  });
});
startGameBtn.addEventListener("click", () => {
  startGame();
});
switchThemeBtn.addEventListener("click", switchTheme);
const main = new CreateElement({
  tag: "main",
  classes: ["main"]
});
main.append(gameSection);
document.body.append(header, main, modal);
document.body.classList.add("light");
startGame();
//# sourceMappingURL=main-89ddd8d4.js.map
