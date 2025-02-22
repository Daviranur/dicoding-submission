// nambahin button update
let buttonUpdate = document.createElement('button');
buttonUpdate.textContent = data.isComplete ? `Belum Selesai` : `Selesai di baca`;
buttonUpdate.classList.add('buttons');
buttonUpdate.setAttribute('data-testid','bookItemIsCompleteButton');
buttonUpdate.setAttribute('data-bookId','completeBookLlist');
buttonUpdate.addEventListener('click',function(){
    bookStatus(data.id);
});
listItem.appendChild(buttonUpdate);



// fungsi buat update button
function bookStatus(id){
    let data = getNewBook();
    let book = data.findIndex(book => book.id === id);

    if(book !== -1){
        data[book].isComplete = !data[book].isComplete;
        localStorage.setItem(keyStorage,JSON.stringify(data));
        renderListBook();
    }
}