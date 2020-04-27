const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// check if data is in the localStorage on page load
    // if data doesn't exist, assign an empty array to items
const items = Json.parse(localStorage.getItem('items')) || [];

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

    // save data to the local storage
        // 1st parameter: key, 2nd parameter: data to be saved
        // 2nd parameter string type, so object-type data should be stringified to be saved
    localStorage.setItem('items', JSON.stringify(items));
    
    // 'this' refers 'form' elm, and form elm has reset method
    this.reset();
}

// creates actual HTML
    // additional performance improvement is possible,
    // as it recreates entire list by every execution,
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

// load and show itemsList on page load
populateList(items, itemsList);