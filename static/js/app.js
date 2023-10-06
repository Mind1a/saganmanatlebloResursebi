import booksData from './Books.json' assert {type: 'json'};
import { 
    ShowBooks, 
    showLesson, 
    showLessonSection, 
    toggleParags,
    updateActiveBurgerVisibility,
    closeBurger  
    } from "./function.js";

ShowBooks(books, booksData);

window.showLesson = showLesson;
window.showLessonSection = showLessonSection;
window.toggleParags = toggleParags;
window.addEventListener('resize', updateActiveBurgerVisibility);
document.body.addEventListener('click', closeBurger);

