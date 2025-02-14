// Do your work here...
console.log('Hello, world!');

// kita buat local storage dulu
const keyStorage = 'BOOK_STORAGE';
const bookForm = document.getElementById('bookForm');
const inCompleteBook = document.getElementById('incompleteBookList');
const completeBook = document.getElementById('completeBookList');

function checkStorage(){
    return typeof(Storage) !== 'undefined';
};

function inputNewBook(book){
    if(checkStorage()){
        let dataBook = [];

        if(localStorage.getItem(keyStorage) !==null){
            dataBook = JSON.parse(localStorage.getItem(keyStorage));
        };

        dataBook.unshift(book);
        localStorage.setItem(keyStorage,JSON.stringify(dataBook));
    };
};
function getNewBook(){
    if(checkStorage()){
        return JSON.parse(localStorage.getItem(keyStorage)) || [];
    }else{
        return [];
    };
};

function renderListBook(){
    let dataBook = getNewBook();

    inCompleteBook.innerHTML ='';
    completeBook.innerHTML ='';

    for(let data of dataBook){
        let listItem = document.createElement('div');
        listItem.classList.add('bookName');
        listItem.dataset.bookid = data.id;
        listItem.setAttribute('data-testid','bookItem');
        
        let title = document.createElement('h3');
        title.textContent = data.title;
        title.setAttribute('data-testid','bookItemTitle');
        listItem.appendChild(title);

        let author = document.createElement('p');
        author.textContent = `Penulis: ${data.author}`;
        author.setAttribute('data-testid','bookItemAuthor');
        listItem.appendChild(author);

        let year = document.createElement('p');
        year.textContent = `Tahun: ${data.year}`;
        year.setAttribute('data-testid','bookItemYear');
        listItem.appendChild(year);

        // nambahin button
        let button = document.createElement('button');
        button.textContent = data.isComplete ?  `Belum Selesai` : `Selesai dibaca`;
        button.classList.add('buttons');
        button.setAttribute('data-testid','bookItemIsCompleteButton');
        button.setAttribute('data-bookId','completeBookList');
        button.addEventListener('click',function(){
            bookStatus(data.id);
        })
        listItem.appendChild(button);

        let button2 = document.createElement('button');
        button2.textContent = `Hapus Buku`;
        button2.classList.add('buttons');
        button2.setAttribute('data-testid','bookItemDeleteButton');
        button2.setAttribute('data-bookId','incompleteBookList');
        button2.addEventListener('click', function(){
            hapusBuku(data.id);
        });
        listItem.appendChild(button2);

        let button3 = document.createElement('button');
        button3.textContent = `Edit Buku`;
        button3.classList.add('buttons');
        listItem.appendChild(button3);

        if (data.isComplete) {
            completeBook.appendChild(listItem);  // Add to completed list
        } else {
            inCompleteBook.appendChild(listItem);  // Add to incomplete list
        }
    }
}

// button for add to bookshelf
bookForm.addEventListener('submit',function(event){
    event.preventDefault();
    const id = Date.now().toString();
    const judul = document.getElementById('bookFormTitle').value;
    const penulis = document.getElementById('bookFormAuthor').value;
    const tahun = parseInt(document.getElementById('bookFormYear').value);
    const check = document.getElementById('bookFormIsComplete').checked;
    const newBook = {
        id: id,
        title: judul,
        author: penulis,
        year: tahun,
        isComplete: check,
    };
    inputNewBook(newBook);
    renderListBook();
    this.reset();
});


function hapusBuku(id){
    // ngambil data dulu dari database 
    let hapus = getNewBook();
    // trus di filter id buku nya 
    let idData = hapus = hapus.filter((book) => book.id !== id)

    // baru di set lagi
    localStorage.setItem(keyStorage,JSON.stringify(hapus));
    // nah abistu di hapus baru dari storage sama dari rak
    localStorage.removeItem(hapus);
    renderListBook();

    console.log(hapus);
};

function bookStatus(id){
    let data = getNewBook();
    // initu buat nyari index dari si id bukunya,sama ga id yng ketemu sma id dicari
    let book = data.findIndex(book => book.id === id);
     
    // nah initu klo semisal bkunya udh bener ketemu sama kya yng di cari maka nnt hasilnya itu bukan (-1)
    if(book !== -1){
        // nah udh deh klo udh ketemu nnt status bukunya itu bisa di rubah = klo ''belum selesai' jadi 'selesai'
        // klo 'selesai' jadi 'belum selesai'
        data[book].isComplete = !data[book].isComplete;

        // udh deh di set lagii
        localStorage.setItem(keyStorage,JSON.stringify(data));
        renderListBook();
    }
}



window.addEventListener('load',function(){
    renderListBook();
});