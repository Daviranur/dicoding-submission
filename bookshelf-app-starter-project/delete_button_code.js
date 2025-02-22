// namabahin button delete
let buttonHapus = document.createElement('button');
buttonHapus.textContent = `Hapus Buku`;
buttonHapus.classList.add('buttons');
buttonHapus.setAttribute('data-testid','bookItemDeleteButton');
buttonHapus.setAttribute('data-bookId','incompleteBookList');
buttonHapus.addEventListener('click',function(){
    hapusBuku(data.id);
});
listItem.appendChild(buttonHapus);



// function buat tombol hapus
function hapusBuku(id){
    let hapus = getNewBook();
    let idData = hapus.filter((book) => book.id !== id);

    localStorage.setItem(keyStorage,JSON.stringify(hapus));
    localStorage.removeItem(hapus);
    renderListBook();
}
