import booksData from './Books.json' assert {type: 'json'};
import { ShowBooks, showLesson, showLessonSection, toggleParags, downloadPDF } from "./function.js";

ShowBooks(books, booksData);

window.showLesson = showLesson;
window.showLessonSection = showLessonSection;
window.toggleParags = toggleParags;

const buttons = document.querySelectorAll('.book-download-btn');

buttons.forEach((btn) => 
{
    btn.addEventListener('click', () => 
    {
        let path = btn.id;
        downloadPDF(path);
    })
})