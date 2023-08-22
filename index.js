const body = document.querySelector('body');
const books = document.querySelector('.book');
const addBook = document.querySelector('input[type=button]');
const modalContainer = document.querySelector('.modal-cont');
const close = document.querySelector('.close');



const title = document.querySelector('input[name=title]');
const author = document.querySelector('input[name=author]');
const pages = document.querySelector('input[name=pages]');
const read = document.querySelector('select[name=read]');
const add = document.querySelector('button[class=add-book]')


let myLibrary = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;  
}

let newBook = new Book();

const form = document.querySelector('form');
const errMsg = document.createElement('div');


add.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();

    books.style.justifyContent = 'flex-start';
    books.style.alignItems = 'center';

    if(title.value === '' || author.value ==='' || pages.value ===''){
        return;
    }

    if(myLibrary.find(book => book.title === title.value)){
        errMsg.textContent = 'Book already exist!';
        errMsg.style.color = 'red';
        errMsg.style.marginLeft = '15px';

        const firstC = form.firstChild;

        form.insertBefore(errMsg,firstC);
        return;
    }
    newBook = new Book(title.value, author.value, pages.value, read.value);
    addNewBook();
    title.value = '';
    author.value = '';
    pages.value = '';

     books.innerHTML = `<table>
            <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Read?</th>
            </tr>
        </table>`;

    myLibrary.forEach((book ,i)=> {
       

        books.firstElementChild.innerHTML +=
        `
            <tr>
                <td class='serialNumber'>${i+1}.</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td class='removeRow'>
                <button onclick='readToggle(event)' class='read-toggle' data-index='${i}'>${book.read} </button>
                <button onclick='remove(event)' class='remove' data-index='${i}'>Remove</button>
                </td>
        
            </tr>  
        `;
    

    })
    if(myLibrary.find(book => book.title !== title.value) && form.firstChild.textContent === 'Book already exist!'){
        const firstChild = form.firstChild;
        form.removeChild(firstChild);
    }
});



function remove(event){
    myLibrary.splice(event.target.getAttribute('data-index'),1);

    if(myLibrary.length === 0){
        return books.innerHTML = `
        <div class="book">
            <p>Welcome to online book store!</p>
            <p>Use the add-a-book-button to add list of books,
                you will like to keep record of.
            </p>
        </div>
        `
    }

    books.innerHTML = `<table>
    <tr>
        <th></th>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read?</th>
    </tr>
</table>`;

myLibrary.forEach((book ,i)=> {


books.firstElementChild.innerHTML +=
`
    <tr>
        <td class='serialNumber'>${i+1}.</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td class='removeRow'>
        <button onclick='readToggle(event)' class='read-toggle' data-index='${i}'>${book.read} </button>
        <button onclick='remove(event)' class='remove' data-index='${i}'>Remove</button>
        </td>
    </tr>  
 `;
})
}

let isRead = false;

function readToggle(event){


    if(isRead && event.target.textContent !== 'no' ){
        event.target.textContent = 'no';
        myLibrary[event.target.getAttribute('data-index')].read = 'no'
    }
    else if(isRead && event.target.textContent !== 'yes'){
        event.target.textContent = 'yes';
        myLibrary[event.target.getAttribute('data-index')].read = 'yes'


    }
    else if(!isRead && event.target.textContent !== 'no'){
        event.target.textContent = 'no';
        myLibrary[event.target.getAttribute('data-index')].read = 'no'

    }
    else if(!isRead && event.target.textContent !== 'yes'){
        event.target.textContent = 'yes';
        myLibrary[event.target.getAttribute('data-index')].read = 'yes'


    }
    isRead = !isRead;
}    
    



addBook.addEventListener('click', function(e){
    e.stopPropagation();

    modalContainer.style.display = 'block';
})

close.addEventListener('click', function(){
    modalContainer.style.display = 'none';

    title.value = '';
    author.value = '';
    pages.value = '';

    if(form.firstChild.textContent === 'Book already exist!'){
        const firstChild = form.firstChild;
        form.removeChild(firstChild);
    }
})

window.addEventListener('click', function(e){
    if(e.target.className === 'modal-cont'){
    modalContainer.style.display ='none';

    title.value = '';
    author.value = '';
    pages.value = '';

    if(form.firstChild.textContent === 'Book already exist!'){
        const firstChild = form.firstChild;
        form.removeChild(firstChild);
    }
    }
})


function addNewBook(){
    myLibrary.push(newBook);
 
}





  


