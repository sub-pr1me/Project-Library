/// MOVIE LIBRARY
const myLibrary = [];

/// OBJECT CONSTRUCTOR
function Movie(title, director, year, watched) {
    this.title = title;
    this.director = director;
    this.year = year;
    this.watched = watched;
};
Movie.prototype.info = function() {
    return `"${this.title}" (${this.year}) by ${this.director} | ${this.watched}`;
};

/// FORM DIALOG DISPLAY
const dialog = document.getElementById('dialog');
const wrapper = document.querySelector('.wrapper');
const submitButton = document.querySelector('.add_btn');
const cancelButton = document.querySelector('.close_btn');

const showSubmitDialog = (show) => show ? dialog.showModal() : dialog.close();

submitButton.addEventListener('click', () => showSubmitDialog(true));
cancelButton.addEventListener('click', () => {
    showSubmitDialog(false);
    let myForm = document.querySelector('.form');
    myForm.reset();
});
dialog.addEventListener('click', (e) => !wrapper.contains(e.target) && dialog.close());

/// FORM DATA SUBMISSION
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formArray = new FormData(form);

    let formObject = {};

    for (item of formArray) {
        formObject[item[0]] = item[1];
    };

    /// ADDING MOVIE TO THE LIBRARY
    function addMovieToLibrary() {

        let x = myLibrary.length;

        for (i = x-1; i<x; i++) {        
            
            let a = formObject.title;
            let b = formObject.director;
            let c = formObject.year;
            let d = formObject.watched;

            obj = new Movie(a, b, c, d);
            myLibrary.push(obj);
        };    
    };

    addMovieToLibrary();
    dialog.close();
    let myForm = document.querySelector('.form');
    myForm.reset();  
    addEntry();
});

/// LIBRARY DISPLAY
const library = document.getElementById('lib');
function newEntry(i) {
        let entry = document.createElement('div');
        entry.className = "entry";

        let btns = document.createElement('div');
        btns.className = "btns";
        
        let text = document.createElement('div');
        text.className = "text";
        text.textContent = myLibrary[i].info();

        let erase = document.createElement('button');
        erase.className = "erase";
        erase.textContent = "Delete";

        let change = document.createElement('button');
        change.className = "change";
        if (myLibrary[i].watched === 'Watched') {
            change.textContent = `Mark as 'Not watched'`;
        } else {
            change.textContent = `Mark as 'Watched'`;
        };

        entry.appendChild(text);
        entry.appendChild(btns);
        btns.appendChild(change);
        btns.appendChild(erase);
        library.appendChild(entry);
};

function addEntry() {  
    let x = myLibrary.length;
    for (i = x-1; i<x; i++) {
        newEntry(i)
    };
};

/// ERASING MOVIE FROM THE LIBRARY
function removeIndex(index) {
    myLibrary.splice(index, 1);
};

function getIndex(arr, text) {
    for (item of arr) {
        if (item.info() == text) {
            return arr.indexOf(item)
        }
    }
};

library.addEventListener('click', (e) => {
    if (e.target.classList.contains('erase')) {

        let text = e.target.parentNode.parentNode.firstChild.textContent;        
        removeIndex(getIndex(myLibrary, text));
        e.target.parentNode.parentNode.remove();                
    };
});







