const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
    // stop page from reloading
        // by default, form reloads the page or send the data to external source
    e.preventDefault();

    // 'this' refers 'form' elm
        // it narrows down where to search
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        // in ES6, writing key-only in object means key and value are same
        text,
        done: false
    };

    items.push(item);
    // 'this' refers 'form' elm, and form elm has reset method
    this.reset();
}

// 'submit' event listener not only mouse input, but also keyboard input
addItems.addEventListener('submit', addItem);