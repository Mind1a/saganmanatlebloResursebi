import booksData from "./Books.json" assert { type: "json" };
import {
  body,
  books,
  tavfurcelibtn,
  logoBtn,
  settingBtns,
  aboutProject,
  head,
  nav,
  lessonSection,
  header,
  headContent,
  gzamkvlevi,
  menu,
  burgerBtn,
  activeBurger,
  burgBookWrapper,
} from "./variable.js";

let title = ""; // to save title of book
let checkCanvas = false; //to check whether startCanvas() funciton has called

export function ShowBooks(books, booksData) {
  for (const [index, [bookname, data]] of Object.entries(
    Object.entries(booksData)
  )) {
    let bookWrapper = document.createElement("div");
    //
    bookWrapper.classList.add("card-wrapper");
    bookWrapper.innerHTML = `
    <div class="card" onclick="showLesson(this)">
     <img src="./static/images/book-relative/book.svg" id="${index}" alt="${bookname}">
     <img src="${data.img}" alt="${bookname}" class="cover" id="bookCover${index}">
     <h3 class="card-title">${bookname}</h3>
    </div>
    <a target="_blank" href=${booksData[bookname].bookPdfUrl}>
    <img class="downloadBtn"   src="./static/images/icons/download.svg" alt="download-btn">
    </a>
    `;

    books.appendChild(bookWrapper);
  }
}

//click on setting button will show about projects and hide everything else
for (const settingBtn of settingBtns) {
  settingBtn.addEventListener("click", () => {
    header.classList.remove("showBgColor");
    books.classList.add("hide");
    aboutProject.classList.remove("hide");
    tavfurcelibtn.classList.remove("hide");
    nav.classList.add("hide");
    settingBtns[0].classList.add("hide");
    lessonSection.classList.add("hide");
    headContent.classList.remove("hide");
    gzamkvlevi.classList.add("hide");
    headContent.innerHTML = "<h4>პროექტის შესახებ</h4>";
  });
}

// shows main page on click function
function goMainPage() {
  title = ""
  header.classList.remove("showBgColor");
  books.classList.remove("hide");
  aboutProject.classList.add("hide");
  tavfurcelibtn.classList.add("hide");
  nav.classList.add("hide");
  settingBtns[0].classList.remove("hide");
  lessonSection.classList.add("hide");
  gzamkvlevi.classList.add("hide");
  headContent.classList.add("hide");
  if (checkCanvas) {
    resetDaakavshire();
  }
}
//click on home button will show main page and hide everything else
tavfurcelibtn.addEventListener("click", goMainPage);

//click on logo button will show main page and hide everything else
logoBtn.addEventListener("click", goMainPage);

//shows lessons for each book on click them
export function showLesson(lesson) {
  for (const child of lesson.children) {
    if (child.tagName === "H3") {
      title = child.innerText; // get name of book
    }
  }

  header.classList.add("showBgColor");
  books.classList.add("hide");
  tavfurcelibtn.classList.remove("hide");
  nav.classList.remove("hide");
  lessonSection.classList.remove("hide");

  headContent.classList.remove("hide");
  gzamkvlevi.classList.remove("hide");
  headContent.innerHTML = `<div><h3>${title}</h3> <img src="${booksData[title]["img"]}"></div>`;

  showLessonSection("moemzade");
}
// change active lesson title opacity

const activeLesson = (lesson) => {
  const lessons = document.querySelectorAll(".menu li");
  const currentLesson = document.getElementById(lesson);
  lessons.forEach((les) => {
    les.style.opacity = "100%";
  });
  currentLesson.style.opacity = "50%";
};

// show each lesson chosen by header (left nav bar)

export function showLessonSection(section) {
  body.style.overflow = "auto";
  if(!section) return;
  let sections = booksData[title];

  activeLesson(section);

  switch (section) {
    case "gzamkvlevi":
      lessonSection.innerHTML = `<div class="gzamkvlevi-header">
          <img src='./static/images/icons/00_mastavlebllisGzamkvlevi.svg' alt='Maswavleblis gzamkvlevi logo'/>
          <h2>რეკომენდაცია მასწავლებლებისთვის:</h2>
          </div>`;
      for (let aqtivoba in sections.gzamkvlevi) {
        lessonSection.innerHTML += `
        <div class="gzamkvlevi-box">
        <div class="gzamkvlevi-subheading-box">
        <img src="${sections.gzamkvlevi[aqtivoba].logo}" alt="Aqtivoba logo"/>
          <h3 class="gzamkvlevi-subheading">აქტივობა #${sections.gzamkvlevi[aqtivoba].id}</h3>
        </div> 
        <div class="gzamkvlevi-content">
          <h2 class="gzamkvlevi-title">${sections.gzamkvlevi[aqtivoba].title}</h2>
          <p class="gzamkvlevi-text">${sections.gzamkvlevi[aqtivoba].description}</p>
         </div>
         </div>`;
      }
      break;
    case "moemzade":
      let moemzadeParags = "";
      let moemzadeQuestions = "";
      const moemzadePdfUrl = document.querySelector(".moemzade-pdf-link");

      moemzadePdfUrl.href = sections.moemzade.assignmentPdfUrl;

      sections[section]["p"].forEach((p) => {
        if (typeof p == "string") {
          moemzadeParags += `<p>${p}</p>`;
        } else {
          moemzadeParags += `<strong>${p["strong"]}</strong>`;
        }
      });
      sections[section]["li"].forEach((li) => {
        moemzadeQuestions += `<li>${li}</li>`;
      });
      lessonSection.innerHTML = `
            <h2>${sections[section]["title"]}</h2>
            <img src="${sections[section]["image"]}" class="lessonLogo" alt="kitxvistvis mzadeba">
            <div class="right-block">
            ${moemzadeParags}
            <strong>თემატური კითხვები:</strong>
            <ul>
            ${moemzadeQuestions}
            </ul>
            </div>
            `;
      break;

    case "waikitxe":
      let waikitxeParags1 = "";
      let waikitxeParags2 = "";
      let waikitxeParags3 = "";

      const waikitxePdfUrl = document.querySelector(".waikitxe-pdf-link");

      waikitxePdfUrl.href = sections.waikitxe.assignmentPdfUrl;

      sections[section]["p1"].forEach((p) => {
        waikitxeParags1 += `<p>${p}</p>`;
      });
      waikitxeParags1 += `<img src="${sections[section]["images"][0]}" alt="kitxvistvis mzadeba">`;

      sections[section]["p2"].forEach((p) => {
        waikitxeParags2 += `<p>${p}</p>`;
      });
      sections[section]["p3"].forEach((p) => {
        waikitxeParags3 += `<p>${p}</p>`;
      });

      if (
        title == "ნაპოლეონი" ||
        title == "თამარას წიგნი" ||
        title == "მოპარული ვარსკვლავი"
      ) {
        waikitxeParags2 += `<img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags3 += `<img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">`;
      } else if (title == "ანგელოზის ერთი დღე") {
        waikitxeParags2 += ` 
          <div class="img-container">
            <img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">
            <img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">
            <img src="${sections[section]["images"][3]}" alt="kitxvistvis mzadeba">
          </div>
         `;
        waikitxeParags3 += `<img src="${sections[section]["images"][4]}" alt="kitxvistvis mzadeba">`;
      } else {
        waikitxeParags2 += `<img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags2 += `<img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags3 += `<img src="${sections[section]["images"][3]}" alt="kitxvistvis mzadeba">`;
      }

      lessonSection.innerHTML = `
      <div class="${section} ${title}">
            <div class="waikitxe-header">
            <h2>${sections[section].waikitxeTitle}</h2>
            <span>${sections[section].waikitxeAuthor}</span>
            </div>
            <div class="part1">
            ${waikitxeParags1}
            </div>
            <div class="part2 hide">
            ${waikitxeParags2}
            </div>
            <div class="part3 hide">
            ${waikitxeParags3}
            </div>
            <i class="fa-solid fa-chevron-down" onclick="toggleParags()"></i>
            </div>
            `;
      break;

    case "upasuxe":
      const upasuxePdfUrl = document.querySelector(".upasuxe-pdf-link");

      upasuxePdfUrl.href = sections.upasuxe.assignmentPdfUrl;

      let upasuxeQuestions = "";
      sections[section]["li"].forEach((li) => {
        upasuxeQuestions += `<li>${li}</li>`;
      });

      lessonSection.innerHTML = `
      <div class="upasuxe">
      <h2>${sections[section]["title"]}:</h2>
      <img src="${sections[section]["image"]}" class="lessonLogo" alt="${sections[section]["title"]}">
      <div class="right-block">
          <ol>${upasuxeQuestions}</ol>
        </div>
      </div>
            `;
      break;

    case "sheavse":
      if (title == "პეგასი") {
        pegasiSheavse();
      } else if (title === "დიდი მოგზაური") {
        didiMogzauriSheavse();
      } else if (title === "ნაპოლეონი") {
        napoleoniSheavse();
      } else if (title === "ანგელოზის ერთი დღე") {
        angeloziSheavse();
      } else if (title === "თამარას წიგნი") {
        tamaraSheavse();
      } else if (title === "მოპარული ვარსკვლავი") {
        varskvlaviSheavse();
      }

      break;

    case "sheqmeni":
      const sheqmeniPdfUrl = document.querySelector(".sheqmeni-pdf-link");

      sheqmeniPdfUrl.href = sections.sheqmeni.assignmentPdfUrl;

      const sectionTitle = sections[section]["title"];

      let sheqmeniHTML = ``;

      if (sectionTitle === "მითოლოგიური პერსონაჟი") {
        sheqmeniHTML += `
         <ul> 
          <li>${sections[section]["p"][0]}</li>
          <li>${sections[section]["p"][1]}</li>
         </ul>

        `;
      } else if (sectionTitle === "შენი მოგზაურობა") {
        sheqmeniHTML += `
          <p>${sections[section]["p"][0]}</p>
          <div class="sheqmeni-mogzauri">
            <span>მოყევი:</span>
            <ul> 
              <li>${sections[section]["p"][1].questions[0]}</li>
              <li>${sections[section]["p"][1].questions[1]}</li>
              <li>${sections[section]["p"][1].questions[2]}</li>
            </ul>
          </div>
        `;
      } else if (sectionTitle === "გახდი თანაავტორი") {
        sheqmeniHTML += `
          <div class="sheqmeni-varskvlavi">
            <span>${sections[section]["p"][0]}</span>
            <ul>
              <li>${sections[section]["p"][1].questions[0]}</li>
              <li>${sections[section]["p"][1].questions[1]}</li>
              <li>${sections[section]["p"][1].questions[2]}</li>
            </ul>
          </div>
        `;
      } else {
        sections[section]["p"].forEach((para) => {
          sheqmeniHTML += `
            <p>${para}</p>
          `;
        });
      }
      lessonSection.innerHTML = `
            <h2>${sections[section]["title"]}:</h2>
            <img src="${sections[section]["image"]}" class="lessonLogo" alt="${sections[section]["title"]}">
            <div class="right-block">
              ${sheqmeniHTML}
            </div>
            `;
      break;

    default:
      if (title == "პეგასი") {
        pegasiSheavse(section);
      } else if (title == "დიდი მოგზაური") {
        didiMogzauriSheavse(section);
      } else if (title == "ნაპოლეონი") {
        napoleoniSheavse(section);
      } else if (title == "ანგელოზის ერთი დღე") {
        angeloziSheavse(section);
      } else if (title == "თამარას წიგნი") {
        tamaraSheavse(section);
      } else if (title === "მოპარული ვარსკვლავი") {
        varskvlaviSheavse(section);
      }
      break;
  }

  activeBurger.classList.remove("active-burger");
}

//for waikitxe section, shows and hide paragraps on click arrow
export function toggleParags() {
  const part2 = document.querySelectorAll(".part2");
  const part3 = document.querySelectorAll(".part3");

  if (part2[0].classList.contains("hide")) {
    part2.forEach((p) => {
      p.classList.remove("hide");
    });
  } else if (part3[0].classList.contains("hide")) {
    part3.forEach((p) => {
      p.classList.remove("hide");
    });
    document.querySelector(".fa-chevron-down").classList.add("upDown");
  } else {
    part2.forEach((p) => {
      p.classList.add("hide");
    });
    part3.forEach((p) => {
      p.classList.add("hide");
    });
    document.querySelector(".fa-chevron-down").classList.remove("upDown");
  }
}

function didiMogzauriSheavse(e) {
  let section = booksData["დიდი მოგზაური"]["sheavse"];
  let subsection = e ? e : "დააკავშირე";
  let options = "";

  switch (subsection) {
    case "დააკავშირე":
      const daakavshirePdfUrl = document.querySelector(".daakavshire-pdf-link");
      daakavshirePdfUrl.href = section["დააკავშირე"].assignmentPdfUrl;

      const leftBlock = section[subsection]["daakavshire_left_block"];
      const rightBlock = section[subsection]["daakavshire_right_block"];

      let leftBlockHtml = "";
      leftBlock.forEach((item) => {
        leftBlockHtml += `<p>${item}</p>`;
      });

      let rightBlockHtml = "";
      rightBlock.forEach((item) => {
        rightBlockHtml += `<p>${item}</p>`;
      });

      lessonSection.innerHTML = `
            <h2>${section[subsection]["title"]}</h2>
            <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
            <div class="right-block">
            <div id="daakavshireWrapper">
            <div class="daakavshire">
                <div class="daakavshire_left_block">${leftBlockHtml}</div>
                <canvas id="canvas"></canvas>
                <div class="daakavshire_right_block">${rightBlockHtml}</div>
                </div>
            </div>
            ${addButtons(2)}
            </div>
            `;
      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkMogzauriDaakavshire);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetDaakavshire);
      startCanvas();
      break;

    case "ჩასვი":
      const chasviPdfUrl = document.querySelector(".chasvi-pdf-link");
      chasviPdfUrl.href = section["ჩასვი"].assignmentPdfUrl;

      section[subsection]["p"].forEach((p) => {
        options += `
            <div class="checkList">
            <input type="number" min=1 max=4> <p>${p}</p>
            </div>
            `;
      });

      lessonSection.innerHTML = `
      <h2>${section[subsection]["title"]}:</h2>
            <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
            <div class="right-block">
            ${options}
            ${addButtons(2)}
            </div>
            `;

      let inputs = document.querySelectorAll(".right-block input");

      // Logic to avoid same number in different inputs
      inputs.forEach((input) => {
        input.addEventListener("input", function () {
          let currentInput = input;
          let val = parseInt(input.value[0]);
          let length = input.value.length;

          let duplicateInput = [...inputs].find(
            (item) => item !== currentInput && item.value === currentInput.value
          );

          if (val < 1 || val > 4 || isNaN(val) || duplicateInput) {
            input.value = "";
          } else if (length > 1) {
            input.value = "";
            input.value = val;
          }
        });
      });

      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkMogzauriChasvi);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetMogzauriChasvi);
      break;

    case "შეავსე":
      const sheavsePdfUrl = document.querySelector(".sheavse-pdf-link");
      sheavsePdfUrl.href = section["შეავსე"].assignmentPdfUrl;

      lessonSection.innerHTML = `
        <h2>${section[subsection]["title"]}:</h2>
        <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
        <div class="right-block mogzaurisheavse">
        <svg height="420" width="650">
        <polygon points="5,410 320,5 645,410" />
            <line x1="175" y1="190" x2="465" y2="190" />
            <line x1="90" y1="300" x2="555" y2="300" />
            </svg>
            <div class="svgContent">
            <div id="sityva">
                <p>სიტყვა</p>
                <input placeholder="სიტყვა">
            </div>
            <div id="ganmarteba">
                <p>განმარტება</p>
                <input placeholder="განმარტება">
            </div>
            <div id="winadadeba">
                <p>წინადადება</p>
                <input placeholder="წინადადება">
            </div>
            </div>
            <div class="sityvebi">
            <ol>
            <li>პატიოსანი</li>
            <li>სახიფათო</li>
            </ol>
            </div>
            ${addButtons(1)}
            </div>
            `;
      document.querySelector("#tavidan").addEventListener("click", function () {
        for (let i of document.querySelector(".svgContent").children) {
          i.children[1].value = "";
        }
      });
      break;
  }
}

function pegasiSheavse(e) {
  let section = booksData["პეგასი"]["sheavse"];
  let subsection = e ? e : "დააკავშირე";

  switch (subsection) {
    case "დააკავშირე":
      const daakavshirePdfUrl = document.querySelector(".daakavshire-pdf-link");
      daakavshirePdfUrl.href = section["დააკავშირე"].assignmentPdfUrl;

      const leftBlock = section[subsection]["daakavshire_left_block"];
      const rightBlock = section[subsection]["daakavshire_right_block"];

      let leftBlockHtml = "";
      leftBlock.forEach((item) => {
        leftBlockHtml += `<p>${item}</p>`;
      });

      let rightBlockHtml = "";
      rightBlock.forEach((item) => {
        rightBlockHtml += `<p>${item}</p>`;
      });

      lessonSection.innerHTML = `
      <h2>${section[subsection]["title"]}</h2>
      <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
      <div class="right-block">
            <div id="daakavshireWrapper">
            <div class="daakavshire">
                <div class="daakavshire_left_block">${leftBlockHtml}</div>
                <canvas id="canvas"></canvas>
                <div class="daakavshire_right_block">${rightBlockHtml}</div>
                </div>
            </div>
            ${addButtons(2)}
            </div>
            `;
      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkPegasiDaakavshire);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetDaakavshire);
      startCanvas();
      break;

    case "ჩასვი":
      const chasviPdfUrl = document.querySelector(".chasvi-pdf-link");
      chasviPdfUrl.href = section["ჩასვი"].assignmentPdfUrl;

      lessonSection.innerHTML = `
            <h2>${section[subsection]["title"]}</h2>
            <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
            <div class="test">
            <div class="leftSentences">
            <ol>
            <li class="sentence" data-sentence-id="1">${
              section[subsection]["p1"][0]
            }<span class="drop-zone">${".".repeat(13)}</span></li>
            <li class="sentence" data-sentence-id="2">${
              section[subsection]["p1"][1]
            }<span class="drop-zone">${".".repeat(13)}</span></li>
            <li class="sentence" data-sentence-id="3">${
              section[subsection]["p1"][2]
            }<span class="drop-zone">${".".repeat(13)}</span></li>
            <li class="sentence" data-sentence-id="4">${
              section[subsection]["p1"][3]
            }<span class="drop-zone">${".".repeat(13)}</span></li>
           </ol>
      
           <div class="words">
           <p>სიტყვები</p>
           <div class="wordsInner">
           ${section[subsection]["სიტყვები"]
             .map(
               (word) =>
                 `<div class="word" draggable="true" data-value="${word}">${word}</div>`
             )
             .join("")}
           </div>
         </div>
            <div>
            </div>
            </div>
            ${addButtons(2)}
            `;
      const words = document.querySelectorAll(".word");
      words.forEach((word) => {
        word.addEventListener("dragstart", handleDragStart);
      });

      function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.textContent);
      }

      const dropZones = document.querySelectorAll(".drop-zone");
      dropZones.forEach((dropZone) => {
        dropZone.addEventListener("dragover", handleDragOver);
      });

      function handleDragOver(event) {
        event.preventDefault();
      }
      dropZones.forEach((dropZone) => {
        dropZone.addEventListener("drop", handleDrop);
      });

      function handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        event.target.textContent = data;

        const originalWord = document.querySelector(
          `.word[data-value="${data}"]`
        );
        originalWord.parentNode.removeChild(originalWord);
      }

      document
        .querySelector("#dasruleba")
        .addEventListener("click", handleCheck);
      document.querySelector("#tavidan").addEventListener("click", handleReset);

      function handleCheck() {
        const correctMatches = {
          1: "დასაგემოვნებლად",
          2: "იკვებებიან",
          3: "გზავნილს",
          4: "ხელაწერი",
        };
        const dropZones = document.querySelectorAll(".drop-zone");
        dropZones.forEach((dropZone) => {
          const dataValue = dropZone.textContent.trim();
          const correctMatch =
            correctMatches[
              dropZone.closest(".sentence").dataset.sentenceId
            ].trim();
          if (dataValue === correctMatch) {
            dropZone.classList.add("correct");
          } else {
            dropZone.classList.add("incorrect");
          }
        });
      }
      function createWords() {
        const wordsContainer = document.querySelector(".words");
        wordsContainer.innerHTML = `
                  <p>სიტყვები</p>
                  <div class="wordsInner">
                    ${section[subsection]["სიტყვები"]
                      .map(
                        (word) =>
                          `<div class="word" draggable="true" data-value="${word}">${word}</div>`
                      )
                      .join("")}
                  </div>
                  `;
        const words = document.querySelectorAll(".word");
        words.forEach((word) => {
          word.addEventListener("dragstart", handleDragStart);
        });
      }

      function handleReset() {
        const dropZones = document.querySelectorAll(".drop-zone");
        dropZones.forEach((dropZone) => {
          dropZone.textContent = ".".repeat(13);
          dropZone.classList.remove("correct", "incorrect");
        });
        createWords();
      }
      break;

    case "შეავსე":
      const sheavsePdfUrl = document.querySelector(".sheavse-pdf-link");
      sheavsePdfUrl.href = section["შეავსე"].assignmentPdfUrl;

      lessonSection.innerHTML = `
        <h2>${section[subsection]["title"]}</h2>
            <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
            <div class='gridRow3'>
            <p>${section[subsection]["p"]}</p>
            <div class="tableContainer">
            <div class="row">
            <div class="cell title">
            <h4>მითი</h4>
            </div>
            <div class="cell title">
            <h4>ზღაპარი</h4>
            </div>
            </div>
            <div class="row">
            <div class="cell">
            <input class='sheavseInput' placeholder='ჩაწერე პასუხი'>
            </div>
            <div class="cell">
            <input class='sheavseInput' placeholder='ჩაწერე პასუხი'>
            </div>
            </div>
            <div class="row">
            <div class="cell">
            <input class='sheavseInput' placeholder='ჩაწერე პასუხი'>
            </div>
            <div class="cell">
            <input class='sheavseInput' placeholder='ჩაწერე პასუხი'>
            </div>
            </div>
            </div>
            ${addButtons(1)}
            </div>
            `;
      const button = document.querySelector("#tavidan");
      button.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".sheavseInput");
        inputs.forEach(function (input) {
          input.value = "";
        });
      });
      break;
  }
}

function napoleoniSheavse(e) {
  let section = booksData["ნაპოლეონი"]["sheavse"];
  let subsection = e ? e : "დააკავშირე";

  switch (subsection) {
    case "დააკავშირე":
      const daakavshirePdfUrl = document.querySelector(".daakavshire-pdf-link");
      daakavshirePdfUrl.href = section["დააკავშირე"].assignmentPdfUrl;

      const leftBlock = section[subsection]["daakavshire_left_block"];
      const rightBlock = section[subsection]["daakavshire_right_block"];

      let leftBlockHtml = "";
      leftBlock.forEach((item) => {
        leftBlockHtml += `<p>${item}</p>`;
      });

      let rightBlockHtml = "";
      rightBlock.forEach((item) => {
        rightBlockHtml += `<p>${item}</p>`;
      });

      lessonSection.innerHTML = `
            <h2>${section[subsection]["title"]}</h2>
            <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
            <div class="right-block">
            <div id="daakavshireWrapper">
            <div class="daakavshire">
                <div class="daakavshire_left_block">${leftBlockHtml}</div>
                <canvas id="canvas"></canvas>
                <div class="daakavshire_right_block">${rightBlockHtml}</div>
                </div>
            </div>
            ${addButtons(2)}
            </div>
            `;
      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkNapoleoniDaakavshire);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetDaakavshire);
      startCanvas();
      break;

    case "ჩასვი":
      const chasviPdfUrl = document.querySelector(".chasvi-pdf-link");
      chasviPdfUrl.href = section["ჩასვი"].assignmentPdfUrl;

      lessonSection.innerHTML = `
      <h2>${section[subsection]["title"]}</h2>
      <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
      <div class="chasvi">
        <div class="chasvi-wrapper">
          <div class="chasvi-box">
            <h3>ვითარება</h3>
            <div class="input-box">
              <textarea class='sheavseInput small' placeholder='ჩაწერე პასუხი'></textarea>
            </div>
          </div>
          <div class="chasvi-box">
          <h3>ადგილი</h3>
          <div class="input-box">
          <textarea class='sheavseInput small' placeholder='ჩაწერე პასუხი'></textarea>
          </div>
          </div>
        </div>
        <img src="${section[subsection]["img"]}">
        <div class="chasvi-box">
        <h3>პერსონაჟი</h3>
          <div class="input-box">
            <textarea class='sheavseInput small' placeholder='ჩაწერე პასუხი'></textarea>
            </div>
        </div>
        <img src="${section[subsection]["img"]}">
        <div class="chasvi-box">
        <h3>პრობლემა</h3>
        <div class="input-box">
          <textarea class='sheavseInput big' id="input1" placeholder='ჩაწერე პასუხი'></textarea>
          </div>
        </div>
        <img src="${section[subsection]["img"]}">
        <div class="chasvi-box">
          <h3>პრობლემის გადაწყვეტა</h3>
          <div class="input-box">
          <textarea class='sheavseInput big' id="input2" placeholder='ჩაწერე პასუხი'></textarea>
          </div>
        </div>
        ${addButtons(1)}
      </div>
        `;

      document.getElementById("input1").addEventListener("input", function () {
        autoResize(this);
      });

      document.getElementById("input2").addEventListener("input", function () {
        autoResize(this);
      });

      document
        .querySelector("#tavidan")
        .addEventListener("click", resetNapoleoniChasvi);
      break;

    case "შეავსე":
      const sheavsePdfUrl = document.querySelector(".sheavse-pdf-link");
      sheavsePdfUrl.href = section["შეავსე"].assignmentPdfUrl;

      const sqemaBlock = section[subsection]["sqemaLines"];

      let sqemaLeftHtml = ``;
      let sqemaRightHtml = ``;

      sqemaBlock.forEach((item) => {
        sqemaLeftHtml += `
        <p class="sqemaLine" >${item}</p>
        `;
      });
      sqemaBlock.forEach((item) => {
        sqemaRightHtml += `
        <input type="text" placeholder="განმარტება">
        `;
      });

      lessonSection.innerHTML = `
      <h2>${section[subsection]["title"]}:</h2>
      <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
      <div class="napoleoniSeavse"> 
      <div class="sqemaWrapper">
      <div class="sqemaLeft" >
      ${sqemaLeftHtml}
      </div>
      <div class="sqemaRight" >
      ${sqemaRightHtml}
      </div>
      </div>
        ${addButtons(1)}
      </div>
        `;
      const button = document.querySelector("#tavidan");
      button.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".sqemaRight input");
        inputs.forEach(function (input) {
          input.value = "";
        });
      });
      break;
  }
}

function angeloziSheavse(e) {
  let section = booksData["ანგელოზის ერთი დღე"]["sheavse"];
  let subsection = e ? e : "დააკავშირე";

  switch (subsection) {
    case "დააკავშირე":
      const leftBlock = section[subsection]["daakavshire_left_block"];
      const rightBlock = section[subsection]["daakavshire_right_block"];
      const correctMatches = section[subsection]["correct_matches"];

      const daakavshirePdfUrl = document.querySelector(".daakavshire-pdf-link");
      daakavshirePdfUrl.href = section["დააკავშირე"].assignmentPdfUrl;

      lessonSection.innerHTML = `
        <h2>${section[subsection]["title"]}</h2>
        <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
        <p class="angelozi-daakavshire-dsc">${
          section[subsection]["description"]
        }</p>
        <div class="angeloziDaakavshire"> 
        <div class="objects-container"> 
        ${generateObjects(leftBlock)}
        </div>
        <div class="droppable-container">
          <div class="droppable-top-container"> 
          ${droppableBox(0)}
          </div>
          <div class="droppable-bottom-container"> 
          ${droppableBox(3)}
          </div> 
        
        </div>
          <div class="objects-container"> 
        ${generateObjects(rightBlock)}

          </div>
          <div class="buttons"> 
          ${addButtons(2)}
          </div>
          </div>
        `;

      function generateObjects(block) {
        let objectsDiv = ``;
        block.forEach((obj, index) => {
          objectsDiv += `
              <div class="object">
                <img id="img-${block[index][2]}" class="draggable-img" draggable="true" src="${obj[0]}">
                <p id="para-${block[index][2]}"  draggable="true" >${obj[1]}</p>
              </div>
            `;
        });
        return objectsDiv;
      }

      function droppableBox(num) {
        let droppableBox = ``;
        for (let i = num; i < num + 3; i++) {
          droppableBox += `
              <div class="droppable-box"> 
                <div class="number">${i + 1}</div> 
                <div class="droppable-top drop-zone-angel"> </div>
                <div class="droppable-bottom drop-zone-angel"> </div>
              </div>
            `;
        }
        return droppableBox;
      }
      const dropZone = document.querySelectorAll(".drop-zone-angel");

      attachDragStart();
      function attachDragStart() {
        const images = document.querySelectorAll(".draggable-img");
        const paragraps = document.querySelectorAll(".object p");
        images.forEach((image) => {
          image.addEventListener("dragstart", handleDragStart);
        });
        paragraps.forEach((p) => {
          p.addEventListener("dragstart", handleDragStart);
        });

        //
        dropZone.forEach((dropZone) => {
          dropZone.addEventListener("dragover", handleDragOver);
        });

        dropZone.forEach((dropZone) => {
          dropZone.addEventListener("drop", handleDrop);
        });
      }

      function handleDragStart(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id);
      }

      const imageDropZones = document.querySelectorAll(".droppable-top");
      const paraDropZones = document.querySelectorAll(".droppable-bottom");

      function handleDragOver(ev) {
        ev.preventDefault();
      }

      function handleDrop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text/plain");
        const source = document.getElementById(data);

        if (ev.target.innerHTML == " ") {
          if (
            data.includes("img") &&
            ev.target.classList.contains("droppable-top")
          ) {
            ev.target.appendChild(source);
          } else if (
            data.includes("para") &&
            ev.target.classList.contains("droppable-bottom")
          ) {
            ev.target.appendChild(source);
          }
        } else {
          return;
        }
      }

      document
        .querySelector("#dasruleba")
        .addEventListener("click", handleCheck);
      document.querySelector("#tavidan").addEventListener("click", handleReset);

      const dropBoxes = document.querySelectorAll(".droppable-box");
      function handleCheck() {
        dropBoxes.forEach((box, index) => {
          let top = box.querySelector(".droppable-top");
          let bottom = box.querySelector(".droppable-bottom");

          let imgId;
          let paraId;

          let correctImg = correctMatches[index][0];
          let correctPara = correctMatches[index][1];

          if (top.querySelector("img")) {
            imgId = top.querySelector("img").id;
            if (correctImg == imgId) {
              top.classList.add("correctImg");
            } else {
              top.classList.add("incorrectImg");
            }
          }
          if (bottom.querySelector("p")) {
            paraId = bottom.querySelector("p").id;
            if (correctPara == paraId) {
              bottom.querySelector("p").classList.add("correct");
            } else {
              bottom.querySelector("p").classList.add("wrong");
            }
          }
        });
      }
      function handleReset() {
        imageDropZones.forEach((zone) => {
          zone.innerHTML = " ";
          zone.classList.remove("correctImg", "incorrectImg");
        });
        paraDropZones.forEach((zone) => {
          zone.innerHTML = " ";
        });
        let columns = document.querySelectorAll(".objects-container");
        columns[0].innerHTML = generateObjects(leftBlock);
        columns[1].innerHTML = generateObjects(rightBlock);

        attachDragStart();
      }
      break;
    case "ჩასვი":
      const sqemaBlock = section[subsection]["sqemaLines"];

      const chasviPdfUrl = document.querySelector(".chasvi-pdf-link");
      chasviPdfUrl.href = section["ჩასვი"].assignmentPdfUrl;

      let sqemaLeftHtml = ``;
      let sqemaRightHtml = ``;

      sqemaBlock.forEach((item) => {
        sqemaLeftHtml += `
        <p class="sqemaLine p-angelozi" >${item}</p>
        `;
      });
      sqemaBlock.forEach(() => {
        sqemaRightHtml += `
        <input type="text" placeholder="განმარტება" class="input-angelozi">
        `;
      });

      lessonSection.innerHTML = `
      <h2>${section[subsection]["title"]}:</h2>
      <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
      <div class="napoleoniSeavse"> 
      <p class="sub-title">${section[subsection]["p"]}</p>
      <div class="wrapper-angelozi">

       <div class="sqemaWrapper"> 

        <div class="sqemaLeft">
        ${sqemaLeftHtml}
        </div>

        <div class="sqemaRight" >
        ${sqemaRightHtml}
        </div>

       </div>  
      
      
        ${addButtons(1)}
      </div>
        `;
      const button = document.querySelector("#tavidan");
      button.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".sqemaRight input");
        inputs.forEach(function (input) {
          input.value = "";
        });
      });
      break;
    case "შეავსე":
      const sheavsePdfUrl = document.querySelector(".sheavse-pdf-link");
      sheavsePdfUrl.href = section["შეავსე"].assignmentPdfUrl;

      lessonSection.innerHTML = `
    <h2>${section[subsection]["title"]}</h2>
    <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
    <div class="chasvi">
      <p>${section[subsection]["p"]}</p>
      <div class="chasvi-box">
        <h3>რა მოხდა ჯერ</h3>
        <div class="input-box">
          <textarea class='sheavseInput mid' id="input1" placeholder='ჩაწერე პასუხი'></textarea>
        </div>
      </div>
      <img src="${section[subsection]["img"]}">
      <div class="chasvi-box">
        <h3>რა მოხდა შემდეგ</h3>
        <div class="input-box">
          <textarea class='sheavseInput mid' id="input2" placeholder='ჩაწერე პასუხი'></textarea>
        </div>
      </div>
      <img src="${section[subsection]["img"]}">
      <div class="chasvi-box">
        <h3>რა მოხდა ბოლოს</h3>
        <div class="input-box">
          <textarea class='sheavseInput mid' id="input3" placeholder='ჩაწერე პასუხი'></textarea>
        </div>
      </div>
      ${addButtons(1)}
    </div>
    </div>
      `;

      document.getElementById("input1").addEventListener("input", function () {
        autoResize(this);
      });

      document.getElementById("input2").addEventListener("input", function () {
        autoResize(this);
      });

      document.getElementById("input3").addEventListener("input", function () {
        autoResize(this);
      });

      document
        .querySelector("#tavidan")
        .addEventListener("click", resetNapoleoniChasvi);
      break;
  }
}
function tamaraSheavse(e) {
  let section = booksData["თამარას წიგნი"]["sheavse"];
  let subsection = e ? e : "დააკავშირე";
  let options = "";

  switch (subsection) {
    case "დააკავშირე":
      const daakavshirePdfUrl = document.querySelector(".daakavshire-pdf-link");
      daakavshirePdfUrl.href = section["დააკავშირე"].assignmentPdfUrl;

      const leftBlock = section[subsection]["daakavshire_left_block"];
      const rightBlock = section[subsection]["daakavshire_right_block"];

      let leftBlockHtml = "";
      leftBlock.forEach((item) => {
        leftBlockHtml += `<p>${item}</p>`;
      });

      let rightBlockHtml = "";
      rightBlock.forEach((item) => {
        rightBlockHtml += `<p>${item}</p>`;
      });

      lessonSection.innerHTML = `
            <h2>${section[subsection]["title"]}</h2>
            <div class="tamara-sheavse-desc">
             <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
             <p>${section[subsection]["description"]}</p>
            </div>
            <div class="right-block tamara-daakavshire">
            <div id="daakavshireWrapper">
            <div class="daakavshire">
                <div class="daakavshire_left_block">${leftBlockHtml}</div>
                <canvas id="canvas"></canvas>
                <div class="daakavshire_right_block">${rightBlockHtml}</div>
                </div>
            </div>
            ${addButtons(2)}
            </div>
            `;
      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkTamaraDaakavshire);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetDaakavshire);
      startCanvas();
      break;
    case "ჩასვი":
      const chasviPdfUrl = document.querySelector(".chasvi-pdf-link");
      chasviPdfUrl.href = section["ჩასვი"].assignmentPdfUrl;

      lessonSection.innerHTML = `
          <h2>${section[subsection]["title"]}</h2>
          <div class="tamara-sheavse-desc">
            <img src="${
              section[subsection]["img"]
            }" class="lessonLogo" alt="sheavse logo">
            <p>${section[subsection]["description"]}</p> 
          </div>
          <div class="t-vocabulary-box">
            <div class="vocabulary-top">
               ${getWords(section[subsection]["vocabulary_top"])}
            </div>
            <div class="vocabulary-bottom">
               ${getWords(section[subsection]["vocabulary_bottom"])}
            </div>
          </div>
          <div class="graph-wrapper">
            <div class="column column-left">
              ${dropZonesTamara(section[subsection]["key_words"])}
            </div>
            <div class="column column-right">
              ${dropZonesTamara(section[subsection]["key_words"])}
            </div>
          </div>
          ${addButtons(2)}
        `;

      //Generate vocabulary
      function getWords(list) {
        return list
          .map(
            (word) =>
              `<p data-value="${word}" class="tamara-word" draggable="true">${word}</p>`
          )
          .join("");
      }
      //Generate Graph list
      function dropZonesTamara(words) {
        return words
          .map(
            (word) =>
              `<div>
                  <span class="key-word">${word}</span>
                  <span class="tamara-drop-zone">${".".repeat(41)}</span>
                </div>
                `
          )
          .join("");
      }

      //Logic for dragging
      attachDragStart();

      function attachDragStart() {
        const tamaraWords = document.querySelectorAll(".tamara-word");
        const zones = document.querySelectorAll(".tamara-drop-zone");

        tamaraWords.forEach((word) => {
          word.addEventListener("dragstart", handleDragStart);
        });
        zones.forEach((dropZone) => {
          dropZone.addEventListener("dragover", handleDragOver);
        });
        // dnt y want somebody
        zones.forEach((dropzone) => {
          dropzone.addEventListener("drop", handleDrop);
        });
      }

      function handleDragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.textContent);
      }

      function handleDragOver(e) {
        e.preventDefault();
      }

      function handleDrop(e) {
        if (e.target.nodeName === "SPAN") {
          e.preventDefault();

          const data = e.dataTransfer.getData("text/plain");
          e.target.getContext = data;

          const originalWord = document.querySelector(
            `.tamara-word[data-value="${data}"]`
          );

          e.target.innerHTML = "";
          e.target.classList.add("droppedZone");

          e.target.appendChild(originalWord);
        }
      }

      document
        .querySelector("#dasruleba")
        .addEventListener("click", handleCheck);
      document.querySelector("#tavidan").addEventListener("click", handleReset);

      //Check correct answers
      function handleCheck() {
        const correctLeft = {
          1: "სანდრო",
          2: "მზრუნველი",
          3: "დაეხმარა თამარას ოცნებების ასრულებაში",
        };
        const correctRight = {
          1: "თამარა",
          2: "გამჭრიახი",
          3: "მოიფიქრა, როგორ უნდა შეენახა ოცნებები ყუთში",
        };
        const leftList = document.querySelectorAll(
          ".column-left div .tamara-drop-zone"
        );
        const rightList = document.querySelectorAll(
          ".column-right div .tamara-drop-zone"
        );

        // The cas When left column starts with character "Tamara"
        if (leftList[0].textContent === correctRight[1]) {
          console.log("Tamara-left");

          leftList.forEach((zone, index) => {
            if (zone.querySelector("p")) {
              const text = zone.querySelector("p");
              if (text.textContent === correctRight[index + 1]) {
                text.classList.add("correct");
              } else {
                text.classList.add("wrong");
              }
            }
          });

          rightList.forEach((zone, index) => {
            if (zone.querySelector("p")) {
              const text = zone.querySelector("p");
              if (text.textContent === correctLeft[index + 1]) {
                text.classList.add("correct");
              } else {
                text.classList.add("wrong");
              }
            }
          });
        }
        // The case when right column starts with character "Tamara"
        else if (rightList[0].textContent === correctRight[1]) {
          rightList.forEach((zone, index) => {
            if (zone.querySelector("p")) {
              const text = zone.querySelector("p");
              if (text.textContent === correctRight[index + 1]) {
                text.classList.add("correct");
              } else {
                text.classList.add("wrong");
              }
            }
          });

          leftList.forEach((zone, index) => {
            if (zone.querySelector("p")) {
              const text = zone.querySelector("p");
              if (text.textContent === correctLeft[index + 1]) {
                text.classList.add("correct");
              } else {
                text.classList.add("wrong");
              }
            }
          });
        }
      }
      //reset words and zones
      function handleReset() {
        const zones = document.querySelectorAll(".tamara-drop-zone");
        zones.forEach((zone) => {
          zone.innerHTML = `${".".repeat(41)}`;
          zone.classList.remove("droppedZone");
        });
        const topWords = document.querySelector(".vocabulary-top");
        const bottomWords = document.querySelector(".vocabulary-bottom");

        topWords.innerHTML = getWords(section[subsection]["vocabulary_top"]);
        bottomWords.innerHTML = getWords(
          section[subsection]["vocabulary_bottom"]
        );
        attachDragStart();
      }
      break;
    case "შეავსე":
      const sheavsePdfUrl = document.querySelector(".sheavse-pdf-link");
      sheavsePdfUrl.href = section["შეავსე"].assignmentPdfUrl;

      const sheavseTitle = section[subsection]["title"];
      const sheavseDesc = section[subsection]["description"];

      lessonSection.innerHTML = `
            <h2>${sheavseTitle}</h2>
            <div class="tamara-sheavse-desc">
              <img src="${
                section[subsection]["img"]
              }" class="lessonLogo" alt="sheavse logo">
              <p>${sheavseDesc}</p>
            </div>
            <div class="tamara-sheavse">
              <svg class="circle circle-left" width="654" height="563"></svg>
              <svg class="circle circle-right" width="654" height="563"></svg>
              <div class="graph">
                ${genList()}
              </div>
              </div>
              ${addButtons(1)}
          `;

      document
        .querySelector("#tavidan")
        .addEventListener("click", handleResetSheavse);
      function genList() {
        let code = ``;
        for (let i = 0; i < 3; i++) {
          code += `
              <div class="graph-list">
                  <input type="text" placeholder="ჩაწერე სიტყვა">
                  <input type="text" placeholder="ჩაწერე სიტყვა">
                  <input type="text" placeholder="ჩაწერე სიტყვა">
                </div>
              `;
        }
        return code;
      }

      function handleResetSheavse() {
        const inputList = document.querySelectorAll(".graph-list input");
        inputList.forEach((input) => {
          input.value = "";
        });
      }
      break;
  }
}

function varskvlaviSheavse(e) {
  let section = booksData["მოპარული ვარსკვლავი"]["sheavse"];
  let subsection = e ? e : "დააკავშირე";

  const title = section[subsection]["title"];
  switch (subsection) {
    case "დააკავშირე":
      const daakavshirePdfUrl = document.querySelector(".daakavshire-pdf-link");
      daakavshirePdfUrl.href = section["დააკავშირე"].assignmentPdfUrl;

      const checkText = section[subsection]["daakavshire_text"];
      const img = section["img"];

      lessonSection.innerHTML = `
      <h2>${title}</h2>
      <img src="${img}" class="lessonLogo" alt="sheavse">
      <div class="varskvlavi-sheavse" >
        ${genCheckList(checkText)}
      </div>
      ${addButtons(2)}
    `;

      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkVarskvlaviDaakavshire);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetVarskvlaviSheavse);

      break;
    case "ჩასვი":
      const chasviPdfUrl = document.querySelector(".chasvi-pdf-link");
      chasviPdfUrl.href = section["ჩასვი"].assignmentPdfUrl;

      const chasviText = section[subsection]["chasvi_text"];

      lessonSection.innerHTML = `
      <h2>${title}</h2>
      <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
      <div class="varskvlavi-sheavse">
        ${genCheckList(chasviText)}
      </div>
      ${addButtons(2)}
    `;
      document
        .querySelector("#dasruleba")
        .addEventListener("click", checkVarskvlaviChasvi);
      document
        .querySelector("#tavidan")
        .addEventListener("click", resetVarskvlaviSheavse);
      break;
    case "შეავსე":
      const sheavsePdfUrl = document.querySelector(".sheavse-pdf-link");
      sheavsePdfUrl.href = section["შეავსე"].assignmentPdfUrl;

      const sqemaList = section[subsection]["sqema_lines"];

      lessonSection.innerHTML = `
      <h2>${section[subsection]["title"]}</h2>
      <img src="${section["img"]}" class="lessonLogo" alt="sheavse">
      <div class="varskvlavi-sheavse">
        ${genInputLines()}
      </div>
      ${addButtons(1)}
      `;

      document
        .querySelector("#tavidan")
        .addEventListener("click", resetVarskSheavse);

      function resetVarskSheavse() {
        const inputs = document.querySelectorAll(".sqema-line input");

        inputs.forEach((line) => {
          line.value = "";
        });
      }
      function genInputLines() {
        let fullList = ``;
        sqemaList.forEach((line) => {
          fullList += `
            <div class="sqema-line">
              <span>${line}</span>
              <input type="text" placeholder="განმარტება">
            </div>
          `;
        });
        return fullList;
      }

      break;
  }
}

function addButtons(amount) {
  if (amount == 2) {
    return `
    <div id="dasrulebaTavidan">
        <h4 id="dasruleba">დასრულება</h4>
        <h4 id="tavidan">თავიდან</h4>
    </div>
    `;
  } else {
    return `
    <div id="dasrulebaTavidan">
        <h4 id="tavidan">თავიდან</h4>
    </div>
    `;
  }
}

function genCheckList(checktext) {
  let fullList = ``;
  checktext.forEach((text) => {
    fullList += `
        <div class="check-line">
          <input class="regular-checkbox" type="checkbox">
          <p>${text}</p>
        </div>
        `;
  });
  return fullList;
}

function checkMogzauriChasvi() {
  let pasuxebi = booksData["დიდი მოგზაური"]["sheavse"]["ჩასვი"]["pasuxebi"];

  document.querySelectorAll(".checkList").forEach((inpt, idx) => {
    if (inpt.children[0].value == pasuxebi[idx]) {
      inpt.children[1].classList.add("correct");
    } else {
      inpt.children[1].classList.add("wrong");
    }
  });
}

function resetMogzauriChasvi() {
  document.querySelectorAll(".checkList").forEach((inpt) => {
    inpt.children[0].value = null;
    inpt.children[1].classList.remove("correct");
    inpt.children[1].classList.remove("wrong");
  });
}

function resetNapoleoniChasvi() {
  document.querySelectorAll(".sheavseInput").forEach((input) => {
    input.value = "";
  });
}
function checkVarskvlaviChasvi() {
  const checkBoxList = document.querySelectorAll(".regular-checkbox");
  let answers =
    booksData["მოპარული ვარსკვლავი"]["sheavse"]["ჩასვი"]["correct_matches"];
  checkBoxList.forEach((box, index) => {
    if (box.checked) {
      if (answers[index + 1]) {
        box.classList.add("correct-back");
      } else {
        box.classList.add("incorrect-back");
      }
    }
  });
}
function checkPegasiDaakavshire() {
  const daakavshire_left_block = document.querySelector(
    ".daakavshire_left_block"
  );
  const daakavshire_right_block = document.querySelector(
    ".daakavshire_right_block"
  );

  daakavshire_left_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });
  daakavshire_right_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });

  if (Object.keys(chosen).length) {
    for (const [key, value] of Object.entries(chosen)) {
      if (value == correctPegasiDaakavshireAnswers[key]) {
        existingLines[key].StrokeColor = "green";
        daakavshire_left_block.children[key - 1].style.color = "green";
        daakavshire_right_block.children[value - 1].style.color = "green";
      } else {
        existingLines[key] ? (existingLines[key].StrokeColor = "red") : null;
      }
    }
  }

  ended = true;
  draw();
}

function checkMogzauriDaakavshire() {
  const daakavshire_left_block = document.querySelector(
    ".daakavshire_left_block"
  );
  const daakavshire_right_block = document.querySelector(
    ".daakavshire_right_block"
  );

  daakavshire_left_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });
  daakavshire_right_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });

  if (Object.keys(chosen).length) {
    for (const [key, value] of Object.entries(chosen)) {
      if (value == correctMogzauriDaakavshireAnswers[key]) {
        existingLines[key].StrokeColor = "green";
        daakavshire_left_block.children[key - 1].style.color = "green";
        daakavshire_right_block.children[value - 1].style.color = "green";
      } else {
        existingLines[key] ? (existingLines[key].StrokeColor = "red") : null;
      }
    }
  }

  ended = true;
  draw();
}

function checkNapoleoniDaakavshire() {
  const daakavshire_left_block = document.querySelector(
    ".daakavshire_left_block"
  );
  const daakavshire_right_block = document.querySelector(
    ".daakavshire_right_block"
  );

  daakavshire_left_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });
  daakavshire_right_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });

  if (Object.keys(chosen).length) {
    for (const [key, value] of Object.entries(chosen)) {
      if (value == correctNapoleoniDaakavshireAnswers[key]) {
        existingLines[key].StrokeColor = "green";
        daakavshire_left_block.children[key - 1].style.color = "green";
        daakavshire_right_block.children[value - 1].style.color = "green";
      } else {
        existingLines[key] ? (existingLines[key].StrokeColor = "red") : null;
      }
    }
  }

  ended = true;
  draw();
}
function checkTamaraDaakavshire() {
  const daakavshire_left_block = document.querySelector(
    ".daakavshire_left_block"
  );
  const daakavshire_right_block = document.querySelector(
    ".daakavshire_right_block"
  );

  daakavshire_left_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });
  daakavshire_right_block.childNodes.forEach((element) => {
    element.style.color = "red";
  });

  if (Object.keys(chosen).length) {
    for (const [key, value] of Object.entries(chosen)) {
      if (value == correctTamaraDaakavshireAnswers[key]) {
        console.log("green");
        existingLines[key].StrokeColor = "green";
        daakavshire_left_block.children[key - 1].style.color = "green";
        daakavshire_right_block.children[value - 1].style.color = "green";
      } else {
        console.log("red");
        existingLines[key] ? (existingLines[key].StrokeColor = "red") : null;
      }
    }
  }

  ended = true;
  draw();
}
function checkVarskvlaviDaakavshire() {
  const checkBoxList = document.querySelectorAll(".regular-checkbox");

  checkBoxList.forEach((box, index) => {
    if (box.checked) {
      if (correctVarskvlaviDaakavshire[index + 1]) {
        box.classList.add("correct-back");
      } else {
        box.classList.add("incorrect-back");
      }
    }
  });
}
function resetVarskvlaviSheavse() {
  const checkBoxList = document.querySelectorAll(".regular-checkbox");
  checkBoxList.forEach((box) => {
    box.classList.remove("correct-back", "incorrect-back");
    box.checked = false;
  });
}
function resetDaakavshire() {
  existingLines = [];
  chosen = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
  ended = false;
  for (let i of document.querySelector(".daakavshire_left_block").children) {
    i.style.color = "black";
  }
  for (let i of document.querySelector(".daakavshire_right_block").children) {
    i.style.color = "black";
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  checkCanvas = false;
}

burgerBtn.addEventListener("click", () => {
  let burgBookHtml = ``;
  const booksNames = Object.keys(booksData)

  burgBookHtml = booksNames.filter(name => {
    if(title){
      return name === title
    }
    return name
  }).map(data => {
    return `
    <div class="book-division" id=${booksNames.indexOf(data)}>
       <div onclick="showLesson(this)" class="book-about">
         <img src=${booksData[data].img} alt="">
         <h3>${booksData[data].burgerTitle}</h3>
       </div>
       <div class="book-ready" id="moemzade" >
         <img src="static/images/icons/02_moemzade.svg" alt="">
         <h3>მოემზადე</h3>
         </div>
         <div class="book-read" id="waikitxe">
         <img src="static/images/icons/02_waikitxe.svg" alt="">
         <h3>წაიკითხე</h3>
         </div>
         <div class="book-answer" id="upasuxe">
         <img src="static/images/icons/03_upasuxe.svg" alt="">
         <h3>უპასუხე</h3>
         </div>
         <div class="book-create" id="sheqmeni">
         <img src="static/images/icons/04_shekmeni.svg" alt="">
         <h3>შექმენი</h3>
         </div>
         </div>
         `;
  }).join("")

  activeBurger.classList.toggle("active-burger");
  activeBurger.classList.contains("active-burger") ? body.style.overflow = "hidden" : body.style.overflow = "auto";
  burgBookWrapper.innerHTML = burgBookHtml;

  const list = document.getElementsByClassName("book-division");
  const titles = booksNames.filter(name => {
    if(title){
      return name === title
    }
    return name
  })

  for (let i = 0; i < list.length; i++) {
    for (let t = 0; t < 5; t++) {
      list[i].children[t].addEventListener("click", function () {
        title = titles[i];
        books.classList.add("hide");
        aboutProject.classList.add("hide");
        lessonSection.classList.remove("hide");
        showLessonSection(list[i].children[t].getAttribute("id"));
      });
    }
  }
});

export function closeBurger(e) {
  if (
    activeBurger.classList.contains("active-burger") &&
    !e.target.closest(".active-burger") &&
    !e.target.closest(".burger-menu")
  ) {
    activeBurger.classList.remove("active-burger");
  }
}

// document.body.addEventListener('click', closeBurger);

export function updateActiveBurgerVisibility() {
  if (window.innerWidth >= 960) {
    activeBurger.classList.remove("active-burger");
  }
}
//canvas functions START
let canvas = null;
let wrapper = null;
let bounds = null;
let ctx = null;
let ended = false;

// Correct answers for Daakavshire assignment
let correctPegasiDaakavshireAnswers =
  booksData["პეგასი"]["sheavse"]["დააკავშირე"]["swori_pasuxebi"];

let correctMogzauriDaakavshireAnswers =
  booksData["დიდი მოგზაური"]["sheavse"]["დააკავშირე"]["swori_pasuxebi"];

let correctNapoleoniDaakavshireAnswers =
  booksData["ნაპოლეონი"]["sheavse"]["დააკავშირე"]["swori_pasuxebi"];

let correctTamaraDaakavshireAnswers =
  booksData["თამარას წიგნი"]["sheavse"]["დააკავშირე"]["swori_pasuxebi"];
let correctVarskvlaviDaakavshire =
  booksData["მოპარული ვარსკვლავი"]["sheavse"]["დააკავშირე"]["swori_pasuxebi"];
let chosen = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

let startX = 0;
let startY = 0;
let mouseX = 0;
let mouseY = 0;
let isDrawing = false;
let existingLines = {};

function startCanvas() {
  checkCanvas = true;
  wrapper = document.getElementById("daakavshireWrapper");
  canvas = document.getElementById("canvas");
  canvas.width = 180;
  canvas.height = wrapper.offsetHeight;
  canvas.onmousedown = onmousedown;
  canvas.onmouseup = onmouseup;
  canvas.onmousemove = onmousemove;

  bounds = canvas.getBoundingClientRect();

  ctx = canvas.getContext("2d");

  draw();
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 180, 555);

  ctx.lineWidth = 2;

  for (let line of Object.values(existingLines)) {
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.strokeStyle = line.StrokeColor;
    ctx.stroke();
  }

  if (isDrawing) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }
}

function onmousedown(e) {
  if (
    e.button === 0 &&
    e.clientX - bounds.left <= 24 &&
    e.clientX - bounds.left >= 8 &&
    !ended
  ) {
    bounds = canvas.getBoundingClientRect();
    if (!isDrawing) {
      startX = e.clientX - bounds.left;
      startY = e.clientY - bounds.top;
      if (startY >= 6 && startY <= 18 && !chosen["1"]) {
        chosen["1"] = null;
        isDrawing = true;
      } else if (startY >= 105 && startY <= 117 && !chosen["2"]) {
        chosen["2"] = null;
        isDrawing = true;
      } else if (startY >= 202 && startY <= 215 && !chosen["3"]) {
        chosen["3"] = null;
        isDrawing = true;
      } else if (startY >= 300 && startY <= 313 && !chosen["4"]) {
        chosen["4"] = null;
        isDrawing = true;
      } else if (startY >= 399 && startY <= 412 && !chosen["5"]) {
        chosen["5"] = null;
        isDrawing = true;
      } else if (startY >= 496 && startY <= 509 && !chosen["6"]) {
        chosen["6"] = null;
        isDrawing = true;
      }
    }

    draw();
  }
}

function onmouseup(e) {
  if (e.button === 0) {
    bounds = canvas.getBoundingClientRect();

    if (
      isDrawing &&
      e.clientX - bounds.left >= 156 &&
      e.clientX - bounds.left <= 173
    ) {
      if (mouseY >= 6 && mouseY <= 18 && !Object.values(chosen).includes(1)) {
        for (const [key, value] of Object.entries(chosen)) {
          if (value == null) {
            chosen[key] = 1;
            existingLines[key] = {
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              StrokeColor: "black",
            };
          }
        }
        isDrawing = false;
      } else if (
        mouseY >= 105 &&
        mouseY <= 117 &&
        !Object.values(chosen).includes(2)
      ) {
        for (const [key, value] of Object.entries(chosen)) {
          if (value == null) {
            chosen[key] = 2;

            existingLines[key] = {
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              StrokeColor: "black",
            };
          }
        }
        isDrawing = false;
      } else if (
        mouseY >= 202 &&
        mouseY <= 215 &&
        !Object.values(chosen).includes(3)
      ) {
        for (const [key, value] of Object.entries(chosen)) {
          if (value == null) {
            chosen[key] = 3;

            existingLines[key] = {
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              StrokeColor: "black",
            };
          }
        }
        isDrawing = false;
      } else if (
        mouseY >= 300 &&
        mouseY <= 313 &&
        !Object.values(chosen).includes(4)
      ) {
        for (const [key, value] of Object.entries(chosen)) {
          if (value == null) {
            chosen[key] = 4;
            existingLines[key] = {
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              StrokeColor: "black",
            };
          }
        }
        isDrawing = false;
      } else if (
        mouseY >= 399 &&
        mouseY <= 412 &&
        !Object.values(chosen).includes(5)
      ) {
        for (const [key, value] of Object.entries(chosen)) {
          if (value == null) {
            chosen[key] = 5;

            existingLines[key] = {
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              StrokeColor: "black",
            };
          }
        }
        isDrawing = false;
      } else if (
        mouseY >= 496 &&
        mouseY <= 509 &&
        !Object.values(chosen).includes(6)
      ) {
        for (const [key, value] of Object.entries(chosen)) {
          if (value == null) {
            chosen[key] = 6;

            existingLines[key] = {
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              StrokeColor: "black",
            };
          }
        }
        isDrawing = false;
      }
      draw();
    }
  }
}

function onmousemove(e) {
  bounds = canvas.getBoundingClientRect();
  mouseX = e.clientX - bounds.left;
  mouseY = e.clientY - bounds.top;

  if (isDrawing) {
    draw();
  }
}
//canvas functions END

// Makes a textarea element grow in height dynamically with the amount of text entered
function autoResize(element) {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
}

// Displays each section of menu and 'Maswavleblis Gzamkvlevi'
menu.addEventListener("click", (e) => {
  let listItem = e.target.closest("li");
  if (listItem) {
    let id = listItem.getAttribute("id");
    let el = document.getElementById(id);
    el.onClick = showLessonSection(id);
  }
});

gzamkvlevi.addEventListener("click", () => {
  showLessonSection("gzamkvlevi");
});
