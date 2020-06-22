function rotateImages(delay) {
    const container = document.querySelector('.intro > .container-main');
    
	setInterval(function() {
		container.style.transition = 'all .8s ease-in-out';
		container.style.transform = 'translateX(-100%)';
		
		setTimeout(function() {
			container.style.transition = 'none';
			container.style.transform = 'translateX(0)';

			let first = container.firstElementChild;
			container.appendChild(first);
		}, 800);
	}, delay);
}

const buttons = document.querySelectorAll('.container-testimonial-slider > button');

function moveTestimonials(button) {
    const container = document.querySelector('.container-testimonials');
    const direction = button.dataset.direction;
    const transition = 'all .5s ease-in-out';
    const width = window.innerWidth;

    if (direction === "left") {
        const length = container.children.length;
        let firstToLast = container.children[length - 1];
        container.insertBefore(firstToLast, container.firstElementChild);

        if (width > 960) {
            let secondToLast = container.children[length - 1];
            container.insertBefore(secondToLast, container.firstElementChild);
        }
    
        container.style.transition = 'none';
        container.style.transform = 'translateX(-100%)';
    
        setTimeout(function() {
            container.style.transition = transition;
            container.style.transform = 'translateX(0%)';
        }, 0)
    } else if (direction === "right") {
        container.style.transition = transition;
        container.style.transform = 'translateX(-100%)';
        
        setTimeout(function() {
            container.style.transition = 'none';
            container.style.transform = 'translateX(0)';
    
            let first = container.children[0];
            container.appendChild(first);

            if (width > 960) {
                let second = container.children[0];
                container.appendChild(second);
            }
        }, 500);
    }
}

function init() {
    rotateImages(3200);
    buttons.forEach(elm => elm.addEventListener('click', function() {
        moveTestimonials(elm);
    }));
}

window.addEventListener('DOMContentLoaded', init);