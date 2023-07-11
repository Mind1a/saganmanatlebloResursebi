import booksData from "./Books.json" assert { type: "json" };
import {
  books,
  tavfurcelibtn,
  logoBtn,
  settingsbtn,
  aboutProject,
  head,
  nav,
  lessonSection,
  header,
  headContent,
  gzamkvlevi,
  menu,
} from "./variable.js";

let title = ""; // to save title of book
let checkCanvas = false; //to check whether startCanvas() funciton has called

// renders books on main page
export function ShowBooks(books, booksData) {
  for (const [index, [bookname, data]] of Object.entries(
    Object.entries(booksData)
  )) {
    let book = document.createElement("div");
    book.classList.add("card");
    book.setAttribute("onclick", "showLesson(this)"); //show lessons on books click
    book.innerHTML = `
        <img src="./static/images/book-relative/book.svg" id="${index}" alt="${bookname}">
        <img src="${data.img}" alt="${bookname}" class="cover" id="bookCover${index}">
        <h3 class="card-title">${bookname}</h3>
        <img class="downloadBtn" src="./static/images/icons/download.svg" alt="download-btn">
        `;

    books.appendChild(book);
  }
}

//click on setting button will show about projects and hide everything else
settingsbtn.addEventListener("click", () => {
  header.classList.remove("showBgColor");
  books.classList.add("hide");
  aboutProject.classList.remove("hide");
  tavfurcelibtn.classList.remove("hide");
  nav.classList.add("hide");
  settingsbtn.classList.add("hide");
  lessonSection.classList.add("hide");
  headContent.classList.remove("hide");
  gzamkvlevi.classList.add("hide");
  headContent.innerHTML = "<h4>პროექტის შესახებ</h4>";
});

// shows main page on click function
function goMainPage() {
  header.classList.remove("showBgColor");
  books.classList.remove("hide");
  aboutProject.classList.add("hide");
  tavfurcelibtn.classList.add("hide");
  nav.classList.add("hide");
  settingsbtn.classList.remove("hide");
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
  title = lesson.children[2].innerText; // get name of book

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

// show each lesson chosen by header (left nav bar)
export function showLessonSection(section) {
  let sections = booksData[title];

  switch (section) {
    case "gzamkvlevi":
      lessonSection.innerHTML = `<div class="gzamkvlevi-header">
          <img src='./static/images/icons/00_mastavlebllisGzamkvlevi.svg' alt='Maswavleblis gzamkvlevi logo'/>
          <h2>რეკომენდაცია მასწავლებლებისთვის</h2>
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

      if (title == "ნაპოლეონი") {
        waikitxeParags2 += `<img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags3 += `<img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">`;
      }
      else if (title == "ანგელოზის ერთი დღე")
      {
        waikitxeParags2 +=
        ` 
          <div class="img-container">
            <img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">
            <img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">
            <img src="${sections[section]["images"][3]}" alt="kitxvistvis mzadeba">
          </div>
         `;
        waikitxeParags3 += `<img src="${sections[section]["images"][4]}" alt="kitxvistvis mzadeba">`;
      }else if(title == "თამარას წიგნი")
      {
        waikitxeParags2 += `<img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags3 += `<img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">`;
      }
       else {
        waikitxeParags2 += `<img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags2 += `<img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">`;
        waikitxeParags3 += `<img src="${sections[section]["images"][3]}" alt="kitxvistvis mzadeba">`;
      }

      lessonSection.innerHTML = `
      <div class="${section} ${title}">
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
      let upasuxeQuestions = "";
      sections[section]["li"].forEach((li) => {
        upasuxeQuestions += `<li>${li}</li>`;
      });

      lessonSection.innerHTML = `
      <div class="upasuxe">
        <h2>${sections[section]["title"]}:</h2>
        <div class="right-block">
        <img src="${sections[section]["image"]}" class="lessonLogo" alt="${sections[section]["title"]}">
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
      } else if (title === "თამარას წიგნი" ) {
        tamaraSheavse();
      }

      break;

    case "sheqmeni":
      lessonSection.innerHTML = `
            <h2>${sections[section]["title"]}:</h2>
            <img src="${sections[section]["image"]}" class="lessonLogo" alt="${sections[section]["title"]}">
            <div class="right-block">
            <p>${sections[section]["p"]}</p>
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
      }
      break;
  }
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
      console.log(subsection)
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
            <div class="tamara-daakavshire-desc">
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
        lessonSection.innerHTML = `chasvi`
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
  if (e.button === 0 && e.clientX - bounds.left <= 23 && !ended) {
    bounds = canvas.getBoundingClientRect();
    if (!isDrawing) {
      startX = e.clientX - bounds.left;
      startY = e.clientY - bounds.top;
      if (startY >= 20 && startY <= 35 && !chosen["1"]) {
        chosen["1"] = null;
        isDrawing = true;
      } else if (startY >= 110 && startY <= 125 && !chosen["2"]) {
        chosen["2"] = null;
        isDrawing = true;
      } else if (startY >= 200 && startY <= 215 && !chosen["3"]) {
        chosen["3"] = null;
        isDrawing = true;
      } else if (startY >= 295 && startY <= 310 && !chosen["4"]) {
        chosen["4"] = null;
        isDrawing = true;
      } else if (startY >= 380 && startY <= 400 && !chosen["5"]) {
        chosen["5"] = null;
        isDrawing = true;
      } else if (startY >= 475 && startY <= 490 && !chosen["6"]) {
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

    if (isDrawing && e.clientX - bounds.left >= 155) {
      if (mouseY >= 20 && mouseY <= 35 && !Object.values(chosen).includes(1)) {
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
        mouseY >= 110 &&
        mouseY <= 125 &&
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
        mouseY >= 200 &&
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
        mouseY >= 295 &&
        mouseY <= 310 &&
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
        mouseY >= 380 &&
        mouseY <= 400 &&
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
        mouseY >= 475 &&
        mouseY <= 490 &&
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
