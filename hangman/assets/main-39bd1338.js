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
class BaseCreateElement {
  constructor(tagname, classNames, attrs) {
    this.tag = tagname;
    this.class = classNames;
    if (attrs) {
      this.attrName = Object.keys(attrs);
      this.attrValue = Object.values(attrs);
    }
    this.elem = this.createElement();
  }
  createElement() {
    const elem = document.createElement(this.tag);
    elem.classList.add(...this.class);
    if (this.attrName && this.attrValue) {
      for (let i = 0; i < this.attrName.length; i += 1) {
        elem.setAttribute(this.attrName[i], this.attrValue[i]);
      }
    }
    return elem;
  }
}
const gallowsSrc = "" + new URL("gallows-e5693fb2.png", import.meta.url).href;
const firstPart = "" + new URL("firstPart-8830bd63.png", import.meta.url).href;
const secondPart = "" + new URL("secondPart-073cbb44.png", import.meta.url).href;
const thirdPart = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAADjCAYAAAA7ZK60AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAd1SURBVHgB7dzPbxxnHcfx7/zeH17/WNslrn+kDUlDEppQKgQoEoqQikAgkOghgMSBU1CvqFIPCIkj6qEHTpaQEJdKuIrEBVXQqKUIibSFFCdYIU5Su0rcOLHjeNeb3Z2dmefhmVkH9R+Yh0p9v+zx7nh9mv3s19/5zrMrAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHzaLC4uBlNTlR89NlP/3ZGjMz89eXh2TmCdJ7DqyWbz+8lO9+d+p/9cGPnfaWfxD5qN6Omxetgf9So7rTjuC0pH8C361SuvHHv1/PkXZrYffP17M7MyEfniaWmkXuULcRiMx6G31ml11gWl8wVW6KUl78SLL357vL37rVNjEzIbBTIap3IoGJEt83hb6ftxxd/8jWwKyucKrFjc3DnqaOfpA+KNLtRGJMlS0abch76WefMsfN53+1/Jsq7ACiq+JSsr/zlVjSpHmoNMojCQvu6LY+qOo83mKHOr3IGf0npaQvAt0NqU+kMLXxxtdz+3MDIhvqnwg8T8u9Weue+Ir1T+NzpueEpgBcG34Ncvv3wo7ewdG/P8ielGTbRpczxT6VPfk5arJEolaYi/pSp6W2AFwbdg5cr7xx0JZhquJw0T9ESb4HuhPEy1/OPBPTNa07eemZxZfekv73cEVhB8C65eWzteSbOZpulxKpJJV7S4jivdwUDWuz1JRe4crCV3BNYw1SnZ9YsXR29tXD9eUfF0M6xJ4pjo68hsIomp/hU/kFg57X/3dtsCawh+yS78+a3PdmNvNvArfq1aFWUOuS42c9LraIlM+2N29ta73T2BNbQ6JVv+13unKq7M151AIs8cbjO6NLPL4jEn3xwpRpk17VKELOJgl+ztd/42n+21JxoyrDJmslkEfr/kFzeZKyrLh/mwhuCXbOrx+bQWRSp0M3FccxqbR918Z+ZeYnb7KpPUS5VbSQi+RQS/ZEHka8fz8k3c/W7G2f/ZV6kMipm+Iw0JBfbQ45dMqaKhz+eXpsy4RYsvSpsRZib5IFObr4qpP6FEAnuo+CVTg4HvZeKF5kqtq7U8+kq0kthsytwPTfWfDKn4NlHxS9aLu56rM7dmqnxgWptiomPantTsD5RTnOya4GfTqZsJrKHilywdJL5rRpVOPq+X4RQn73yGDdBwzws8iRq0OjYR/JL1HnYC0917vu8Ph/Z5u2OqvdbFisxiwuOo/Gkg+DYR/JJVq7XEFPosr/VF7v/3yHCen/f7+YluHMcCewh+iUxFDyu+13SypOpkWdHe5MEvrtY6xfUrUcMXg9Iua/FtIvglunHjRsWM6cdFu1H+bitdDPCdorXX+lHtd/LfK+1xAcsmpjplauZz/IHyXEfnF6+GA31dBF8Vo83h6a42w36/pxyBNVT8EsV3tvxMZ0He2Bhmjv+xA/6x+5nZaQk9vk0Ev0TZxp5vTmv9YTf/aKHC8Ed+4N39hWr5Cp4WQx2rCH6JNjpboVLKd/L3W7nD4D9akJzfKj1sfsxe6mVpKrCG4Jeo1d7ztWnf84tXwwtYsp/8/RNbd1j6lZnp9/ngQKsIfol2Nnf9RJRrJjbiemn+KTqSH3JVTHIcM1lwi5WZongabOOIlyhNU8fLw50vPU6yYpGaSflw08PN0cP3YWVaM9WxiHFmie62tqI01b6rQ/GChlSiqtSVEnMtS6o6lciLJTFnuGmmVco7sKwi+CXKMuUEvuf0TH+/8nBX7qqOePn/ABUUa/J3k8FwyuN6mR54rM60iOCX6ObyauNBazeqxrFc2mvLjkqLdfj5aW7eY05WI6nVqxKaRj/LurQ6FhH8Ev3wJ+fWVKDf/vDy5YU0UXOH6zV/LAqL0HfTWHr9ngzMi8JPtB7xMi2whuCX6PkfP59/Otovnvvqs/dPzM3+7LtnzsyfPHFCer2eOfCOvPb66/LbV38ve52O2240zOuBTwm3hamOBdPjk4OnnjyYHji8IO+tLsula5ekefKojMzOyk6Syi0RrxVFfES4RVR8C2Y/M9Wr1sNk78F9effismTmZHfy4DtyZ+26fOPLX5Ke1u4b7/6dImQRwbegfuDx9bWb69vtu9tPbXywLv1EyYXeQ4n7iZw9e1bcRt197a9vEXyLCL4Fzxw5trr4xp/utXfuy+jYVNJsTMjVqx8EqTm5za9j1Q885kzPzTm3b94W2MEIzZKXXjj3TeWor42Ojy/vfLjd3N766Nzk9ER786ON0ZXVazd3Avnl7bV7lwVWEPz/g6WlpZFmFNWnn3ii84fz589cvnLl2QtvvvnHVqv1TwE+LU6fPt3INwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4JPvv0mQowDZ3mILAAAAAElFTkSuQmCC";
const fourthPart = "data:image/png;base64,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";
const fifthPart = "data:image/png;base64,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";
const sixthPart = "data:image/png;base64,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";
const gallows$1 = "";
const gallows = new BaseCreateElement("div", ["gallows"]);
const gallowsElem = gallows.elem;
gallowsElem.style.backgroundImage = `url(${gallowsSrc})`;
const firstPartOfMan = new BaseCreateElement("div", ["man-part"]);
const firstPartOfManElem = firstPartOfMan.elem;
firstPartOfManElem.style.backgroundImage = `url(${firstPart})`;
firstPartOfManElem.style.opacity = 0;
const secondPartOfMan = new BaseCreateElement("div", ["man-part"]);
const secondPartOfManElem = secondPartOfMan.elem;
secondPartOfManElem.style.backgroundImage = `url(${secondPart})`;
secondPartOfManElem.style.opacity = 0;
const thirdPartOfMan = new BaseCreateElement("div", ["man-part"]);
const thirdPartOfManElem = thirdPartOfMan.elem;
thirdPartOfManElem.style.backgroundImage = `url(${thirdPart})`;
thirdPartOfManElem.style.opacity = 0;
const fourthPartOfMan = new BaseCreateElement("div", ["man-part"]);
const fourthPartOfManElem = fourthPartOfMan.elem;
fourthPartOfManElem.style.backgroundImage = `url(${fourthPart})`;
fourthPartOfManElem.style.opacity = 0;
const fifthPartOfMan = new BaseCreateElement("div", ["man-part"]);
const fifthPartOfManElem = fifthPartOfMan.elem;
fifthPartOfManElem.style.backgroundImage = `url(${fifthPart})`;
fifthPartOfManElem.style.opacity = 0;
const sixthPartOfMan = new BaseCreateElement("div", ["man-part", "hidden"]);
const sixthPartOfManElem = sixthPartOfMan.elem;
sixthPartOfManElem.style.backgroundImage = `url(${sixthPart})`;
sixthPartOfManElem.style.opacity = 0;
gallowsElem.append(
  firstPartOfManElem,
  secondPartOfManElem,
  thirdPartOfManElem,
  fourthPartOfManElem,
  fifthPartOfManElem,
  sixthPartOfManElem
);
const data = [
  {
    id: 1,
    question: "What is a conditional operator in JavaScript?",
    answer: "IF"
  },
  {
    id: 2,
    question: "What is a function in JavaScript?",
    answer: "OBJECT"
  },
  {
    id: 3,
    question: "Which method can be used to get the length of an array?",
    answer: "LENGTH"
  },
  {
    id: 4,
    question: "Which method adds an element to the end of an array?",
    answer: "PUSH"
  },
  {
    id: 5,
    question: "Which method removes the last element of an array?",
    answer: "POP"
  },
  {
    id: 6,
    question: "Which method is used to convert strings to arrays?",
    answer: "SPLIT"
  },
  {
    id: 7,
    question: "Which method is used to convert arrays to strings?",
    answer: "JOIN"
  },
  {
    id: 8,
    question: "How to declare a class in JavaScript?",
    answer: "CLASS"
  },
  {
    id: 9,
    question: "Which operator is used to create an instance of a class?",
    answer: "NEW"
  },
  {
    id: 10,
    question: "Which operator is used for class inheritance?",
    answer: "EXTEND"
  },
  {
    id: 11,
    question: "Which operator is used to create an instance of a class?",
    answer: "NEW"
  },
  {
    id: 12,
    question: "What is a callback in JavaScript?",
    answer: "FUNCTION"
  },
  {
    id: 13,
    question: "In which block is the error created?",
    answer: "TRY"
  },
  {
    id: 14,
    question: "In which block is the error being handled?",
    answer: "CATCH"
  },
  {
    id: 15,
    question: "Which block of code is executed regardless of whether the error has been handled or not?",
    answer: "FINALLY"
  },
  {
    id: 16,
    question: "What is promise?",
    answer: "OBJECT"
  },
  {
    id: 17,
    question: "What is the process called when you take asynchronous functionality and make a wrapper for it that returns a promise?",
    answer: "PROMISIFICATION"
  },
  {
    id: 18,
    question: "On which tab in dev Tools is localStorage located?",
    answer: "APPLICATION"
  },
  {
    id: 19,
    question: "What is the name of the process in which an event that occurs on any nested element pops up the DOM tree and triggers the same events on all parent elements?",
    answer: "BUBBLING"
  },
  {
    id: 20,
    question: "Which method returns a boolean value indicating whether an object contains the specified property?",
    answer: "HASOWNPROPERTY"
  }
];
const showModal = () => {
  const modal2 = document.querySelector(".modal");
  const modalOverlay2 = document.querySelector(".modal__overlay");
  const modalContent2 = document.querySelector(".modal__content");
  if (modal2.classList.contains("visible")) {
    modal2.classList.remove("visible");
    modalOverlay2.classList.remove("visible");
    modalContent2.classList.remove("visible");
    document.body.classList.remove("stop-scroll");
  } else {
    modal2.classList.add("visible");
    modalOverlay2.classList.add("visible");
    modalContent2.classList.add("visible");
    document.body.classList.add("stop-scroll");
  }
};
const winModal = (answer) => {
  const modalTitle2 = document.querySelector(".modal__content-title");
  modalTitle2.textContent = "VICTORY!";
  const modalSubtitle2 = document.querySelector(".modal__content-subtitle");
  modalSubtitle2.innerHTML = `You guessed the word: <span class="modal__content-accent">${answer}</span>`;
  showModal();
};
const defeatModal = (answer) => {
  const modalTitle2 = document.querySelector(".modal__content-title");
  modalTitle2.textContent = "DEFEAT!";
  const modalSubtitle2 = document.querySelector(".modal__content-subtitle");
  modalSubtitle2.innerHTML = `The target word was: <span class="modal__content-accent">${answer}</span>`;
  showModal();
};
const MAX_ATTEMPTS = 6;
let currentAnswer = "";
let guessedLettersArr = [];
let wrongGuessCount = 0;
const restartGame = () => {
  const quizAnswerBox = document.querySelector(".quiz__answer");
  quizAnswerBox.innerHTML = "";
  guessedLettersArr = [];
  wrongGuessCount = 0;
  for (let i = 0; i < currentAnswer.length; i += 1) {
    const letterField = new BaseCreateElement("span", ["quiz__answer-letter"]);
    const letterFieldElem = letterField.elem;
    quizAnswerBox.append(letterFieldElem);
  }
  document.querySelectorAll(".man-part").forEach((item) => {
    const currentItem = item;
    currentItem.style.opacity = 0;
  });
  document.querySelector(".keyboard").querySelectorAll(".keyboard__btn").forEach((btn) => {
    const currentBtn = btn;
    currentBtn.disabled = false;
  });
};
const endGame = (outcome) => {
  setTimeout(() => {
    if (outcome === "win")
      winModal(currentAnswer);
    else
      defeatModal(currentAnswer);
  }, 500);
};
const checkLetter = (currentBtn, btnLetter) => {
  const currentBtnElem = currentBtn;
  currentBtnElem.disabled = true;
  if (currentAnswer.includes(btnLetter)) {
    [...currentAnswer].forEach((currentLetter, index) => {
      if (currentLetter === btnLetter) {
        const currentLetterElem = document.querySelectorAll(".quiz__answer-letter")[index];
        currentLetterElem.textContent = currentLetter;
        currentLetterElem.style.borderBottom = "none";
        guessedLettersArr.push(currentLetter);
      }
    });
  } else {
    document.querySelectorAll(".man-part")[wrongGuessCount].style.opacity = 1;
    wrongGuessCount += 1;
    document.querySelector(".quiz__wrong").innerHTML = `Number of incorrect answers: <span class="quiz__wrong-accent">${wrongGuessCount} / ${MAX_ATTEMPTS}</span>`;
  }
  if (wrongGuessCount === MAX_ATTEMPTS) {
    endGame("defeat");
    document.querySelector(".keyboard").querySelectorAll(".keyboard__btn").forEach((btn) => {
      const currBtn = btn;
      currBtn.disabled = true;
    });
  }
  if (guessedLettersArr.length === currentAnswer.length)
    endGame("win");
};
const mouseCheckLetter = (e) => {
  const key = e.key.toUpperCase();
  const keyCode = e.keyCode || e.code;
  if (/^[A-Z]/.test(key) && keyCode >= 65 && keyCode <= 90) {
    const keyboardBtns = document.querySelectorAll(".keyboard__btn");
    let currBtn;
    keyboardBtns.forEach((btn) => {
      if (btn.textContent === key)
        currBtn = btn;
    });
    if (!currBtn.disabled)
      checkLetter(currBtn, key);
  }
};
const mouseCheckWrapper = (e) => mouseCheckLetter(e);
const startGame = () => {
  showModal();
  const { question, answer } = data[Math.floor(Math.random() * data.length)];
  document.querySelector(".quiz__question").textContent = question;
  document.querySelector(".quiz__wrong").innerHTML = `Number of incorrect answers: <span class="quiz__wrong-accent">0 / ${MAX_ATTEMPTS}</span>`;
  currentAnswer = answer;
  restartGame();
  document.removeEventListener("keydown", mouseCheckWrapper);
  document.addEventListener("keydown", mouseCheckWrapper);
};
const keyboard = "";
const keyboardBox = new BaseCreateElement("div", ["keyboard"]);
const keyboardBoxElem = keyboardBox.elem;
for (let i = 65; i <= 90; i += 1) {
  const keyboardBtn = new BaseCreateElement("button", ["btn-reset", "keyboard__btn"]);
  const keyboardBtnElem = keyboardBtn.elem;
  const btnLetter = String.fromCharCode(i);
  keyboardBtnElem.textContent = btnLetter;
  keyboardBtnElem.addEventListener("click", (e) => checkLetter(e.target, btnLetter));
  keyboardBoxElem.append(keyboardBtnElem);
}
const quiz = "";
const quizBox = new BaseCreateElement("div", ["quiz"]);
const quizBoxElem = quizBox.elem;
const questionTitle = new BaseCreateElement("h2", ["quiz__question"]);
const questionTitleElem = questionTitle.elem;
const wrongGuess = new BaseCreateElement("span", ["quiz__wrong"]);
const wrongGuessElem = wrongGuess.elem;
const answerBox = new BaseCreateElement("div", ["quiz__answer"]);
const answerBoxElem = answerBox.elem;
quizBoxElem.append(questionTitleElem, wrongGuessElem, answerBoxElem);
const game = "";
const gameSection = new BaseCreateElement("section", ["game"]);
const gameSectionElem = gameSection.elem;
const gameContainer = new BaseCreateElement("div", ["container", "game__container"]);
const gameContainerElem = gameContainer.elem;
gameContainerElem.append(gallowsElem, quizBoxElem, keyboardBoxElem);
gameSectionElem.append(gameContainerElem);
const modal$1 = "";
const modal = new BaseCreateElement("div", ["modal", "visible"]);
const modalElem = modal.elem;
const modalOverlay = new BaseCreateElement("div", ["modal__overlay", "visible"]);
const modalOverlayElem = modalOverlay.elem;
const modalContent = new BaseCreateElement("div", ["modal__content", "visible"]);
const modalContentElem = modalContent.elem;
const modalTitle = new BaseCreateElement("h2", ["modal__content-title"]);
const modalTitleElem = modalTitle.elem;
const modalSubtitle = new BaseCreateElement("h3", ["modal__content-subtitle"]);
const modalSubtitleElem = modalSubtitle.elem;
const playBtn = new BaseCreateElement("button", ["btn-reset", "modal__content-btn"]);
const playBtnElem = playBtn.elem;
playBtnElem.textContent = "Play again";
playBtnElem.addEventListener("click", () => startGame());
modalContentElem.append(modalTitleElem, modalSubtitleElem, playBtnElem);
modalOverlayElem.append(modalContentElem);
modalElem.append(modalOverlayElem);
const logoSrc = "" + new URL("logo-de83227a.svg", import.meta.url).href;
const logo$1 = "";
const logo = new BaseCreateElement("a", ["logo"]);
const logoElem = logo.elem;
logoElem.href = "./";
const logoImg = new BaseCreateElement("img", ["logo__img"], { src: logoSrc, alt: "logo" });
const logoImgElem = logoImg.elem;
logoElem.append(logoImgElem);
const title$1 = "";
const title = new BaseCreateElement("h1", ["header__title"]);
const titleElem = title.elem;
titleElem.textContent = "Hangman";
const header$1 = "";
const header = new BaseCreateElement("header", ["header"]);
const headerElem = header.elem;
const headerContainer = new BaseCreateElement("div", ["container", "header__container"]);
const headerContainerElem = headerContainer.elem;
headerContainerElem.append(logoElem, titleElem);
headerElem.append(headerContainerElem);
const app = document.createElement("div");
app.classList.add("site-container");
app.append(headerElem, gameSectionElem, modalElem);
document.body.append(app);
alert("Make sure you use the en layout of the keyboard.");
startGame();
//# sourceMappingURL=main-39bd1338.js.map
