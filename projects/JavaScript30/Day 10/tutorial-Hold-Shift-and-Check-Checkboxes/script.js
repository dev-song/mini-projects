let lastChecked;
const checkboxesNodeList = document.querySelectorAll('.inbox input[type="checkbox"]');
const checkboxes = Array.from(checkboxesNodeList);
console.log(checkboxes);

function handleCheck(e) {
    /* Tutorial Solution */

    // let inBetween = false;
    
    // // Check if the shift key is down && the input is checked
    // if(e.shiftKey && this.checked) {
    //     checkboxes.forEach(checkbox => {
    //         if (checkbox === this || checkbox === lastChecked) {
    //             inBetween = !inBetween;
    //         }
    //         if (inBetween) {
    //             checkbox.checked = true;
    //         }
    //     })
    // }


    
    /* My Solution */
    if (e.shiftKey && lastChecked) {
        const former = checkboxes.indexOf(lastChecked);
        const latter = checkboxes.indexOf(this);

        checkboxes.forEach((checkbox, index) => {
            if (former < latter) {
                checkbox.checked = index >= former && index <= latter ? true : false; 
            } else {
                checkbox.checked = index <= former && index >= latter ? true : false;
            }
        })
    }
    
    lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));