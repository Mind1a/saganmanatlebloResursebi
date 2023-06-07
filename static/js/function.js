import booksData from './Books.json' assert {type: 'json'};
import { books, tavfurcelibtn, settingsbtn, aboutProject, head, nav, lessonSection, header } from "./variable.js";

let title = ''; // to save title of book

// renders books on main page
export function ShowBooks(books, booksData) {
    for (const [index, [bookname, data]] of Object.entries(Object.entries(booksData))) {
        let book = document.createElement('div');
        book.classList.add('card');
        book.setAttribute('onclick', 'showLesson(this)'); //show lessons on books click
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
settingsbtn.addEventListener('click', () => {
    header.classList.remove('showBgColor');
    books.classList.add('hide');
    aboutProject.classList.remove('hide');
    tavfurcelibtn.classList.remove('hide');
    nav.classList.add('hide');
    settingsbtn.classList.add('hide');
    lessonSection.classList.add('hide');
    head.innerHTML = '<h4>პროექტის შესახებ</h4>';
})

//click on home button will show main page and hide everything else
tavfurcelibtn.addEventListener('click', () => {
    header.classList.remove('showBgColor');
    books.classList.remove('hide');
    aboutProject.classList.add('hide');
    tavfurcelibtn.classList.add('hide');
    nav.classList.add('hide');
    settingsbtn.classList.remove('hide');
    lessonSection.classList.add('hide');
    head.innerHTML = '';
})

//shows lessons for each book on click them
export function showLesson(lesson) {
    title = lesson.children[2].innerText; // get name of book

    header.classList.add('showBgColor');
    books.classList.add('hide');
    tavfurcelibtn.classList.remove('hide');
    nav.classList.remove('hide');
    lessonSection.classList.remove('hide');

    head.innerHTML = `<h3>${title}</h3> <img src="${booksData[title]['img']}">`;

    showLessonSection('moemzade');
}

// show each lesson chosen by header (left nav bar)
export function showLessonSection(section) {
    let sections = booksData[title];

    switch (section) {
        case 'moemzade':
            let moemzadeParags = '';
            let moemzadeQuestions = '';

            sections[section]['p'].forEach(p => {
                if (typeof p == 'string') {
                    moemzadeParags += `<p>${p}</p>`;
                } else {
                    moemzadeParags += `<strong>${p['strong']}</strong>`;
                }
            });
            sections[section]['li'].forEach(li => {
                moemzadeQuestions += `<li>${li}</li>`;
            });

            lessonSection.innerHTML = `
            <h2>კითხვისთვის მზადება:</h2>
            <img src="${sections[section]['image']}" class="lessonLogo" alt="kitxvistvis mzadeba">
            <div class="right-block">
            ${moemzadeParags}
            <strong>თემატური კითხვები:</strong>
            <ul>
            ${moemzadeQuestions}
            </ul>
            </div>
            `;
            break;

        case 'waikitxe':
            let waikitxeParags1 = '';
            let waikitxeParags2 = '';
            let waikitxeParags3 = '';

            sections[section]['p1'].forEach((p) => {
                waikitxeParags1 += `<p>${p}</p>`;
            });
            waikitxeParags1 += `<img src="${sections[section]["images"][0]}" alt="kitxvistvis mzadeba">`;

            sections[section]['p2'].forEach((p) => {
                waikitxeParags2 += `<p>${p}</p>`;
            });
            waikitxeParags2 += `<img src="${sections[section]["images"][1]}" alt="kitxvistvis mzadeba">`;
            waikitxeParags2 += `<img src="${sections[section]["images"][2]}" alt="kitxvistvis mzadeba">`;

            sections[section]['p3'].forEach((p) => {
                waikitxeParags3 += `<p>${p}</p>`;
            });
            waikitxeParags3 += `<img src="${sections[section]["images"][3]}" alt="kitxvistvis mzadeba">`;

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

        case 'upasuxe':
            let upasuxeQuestions = '';
            sections[section]['li'].forEach(li => {
                upasuxeQuestions += `<li>${li}</li>`;
            });

            lessonSection.innerHTML = `
            <h2>${sections[section]['title']}:</h2>
            <img src="${sections[section]['image']}" class="lessonLogo" alt="${sections[section]['title']}">
            <div class="right-block">
            <ol>${upasuxeQuestions}</ol>
            </div>
            `;
            break;

        case 'sheavse':
            lessonSection.innerHTML = 'sheavse';
            break;

        case 'sheqmeni':
            lessonSection.innerHTML = `
            <h2>${sections[section]['title']}:</h2>
            <img src="${sections[section]['image']}" class="lessonLogo" alt="${sections[section]['title']}">
            <div class="right-block">
            <p>${sections[section]['p']}</p>
            </div>
            `;
            break;
    }
}

//for waikitxe section shows and hide paragraps on click arrow
export function toggleParags() {
    const part2 = document.querySelectorAll('.part2');
    const part3 = document.querySelectorAll('.part3');

    if (part2[0].classList.contains('hide')) {
        part2.forEach(p => {
            p.classList.remove('hide')
        });
    } else if (part3[0].classList.contains('hide')) {
        part3.forEach(p => {
            p.classList.remove('hide')
        });
        document.querySelector('.fa-chevron-down').classList.add('upDown');
    } else {
        part2.forEach(p => {
            p.classList.add('hide')
        });
        part3.forEach(p => {
            p.classList.add('hide')
        });
        document.querySelector('.fa-chevron-down').classList.remove('upDown');
    }
}