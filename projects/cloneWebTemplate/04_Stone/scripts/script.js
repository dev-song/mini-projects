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