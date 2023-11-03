/* OPEN AND CLOSE ADD NEW AUTHOR SECTION ============================= */ 
const add_New_Author_Btn = document.getElementById('add_New_Author_btn');
const add_New_Author_Btn_close = document.getElementById('add_New_Author_Btn_close');
const add_New_Author_Section = document.getElementById('add_New_Author');


add_New_Author_Btn.addEventListener('click', () => {
    add_New_Author_Section.classList.add('show');
});

add_New_Author_Btn_close.addEventListener('click', () => {
    add_New_Author_Section.classList.remove('show');
});



/* OPEN AND CLOSE EDIT AUTHOR SECTION ============================= */
const modify_Author_btn = document.querySelectorAll('.modify_Author_btn');
const modify_Author_Btn_close = document.querySelector('#modify_Author_Btn_close');
console.log(modify_Author_Btn_close)
const modify_Author = document.getElementById('modify_Author');

for (let i = 0; i < modify_Author_btn.length; i++) {
    modify_Author_btn[i].addEventListener('click', () => {
        modify_Author.classList.add('show');
        });
}


modify_Author_Btn_close.addEventListener('click', () => {
    modify_Author.classList.remove('show');
    });
