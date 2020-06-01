const menuButtons = document.querySelectorAll('.link-menu-category');
const menuCategories = document.querySelectorAll('.menu-contents');

menuButtons.forEach(curBtn => curBtn.addEventListener('click', e => {
    e.preventDefault();

    const category = curBtn.textContent;
    const categoryId = 'menu' + category;
    
    menuButtons.forEach(btn => {
        if (btn === curBtn) {
            btn.classList.add('blue');
            btn.classList.remove('white');
        } else {
            btn.classList.add('white');
            btn.classList.remove('blue');
        }
    })

    menuCategories.forEach(cat => {
        if (cat.id === categoryId) {
            cat.classList.add('active');
            cat.classList.remove('inactive');
        } else {
            cat.classList.add('inactive');
            cat.classList.remove('active');
        }
    })

}))