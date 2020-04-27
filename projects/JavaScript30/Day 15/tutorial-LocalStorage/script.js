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
    populateList(items, itemsList);
    // 'this' refers 'form' elm, and form elm has reset method
    this.reset();
}

// creates actual HTML
    // it recreates entire list every time it's executed
    // so if you can improve performance by updating the last one only
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        // label and input can be linked through id-for
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `
    }).join('');
}

// 'submit' event listener not only mouse input, but also keyboard input
addItems.addEventListener('submit', addItem);