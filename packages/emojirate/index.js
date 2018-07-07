
class Emojirate extends HTMLElement {
	constructor() {
		super();
		var shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
	<style>
	button {
		background-color: transparent;
		border: 0;
	}

	button:focus {
		outline: 0;
	}

	button {
		font-size: 40px;
		transition: transform .2s;
	}

	button:hover {
		transform: scale(1.3) rotate(10deg);
		transition: transform .2s;
		filter: none !important;
		z-index: 2;
	}

	div {
		display: inline-flex;
		border-radius: 50px;
		padding: 10px;
		background-color: rgb(230,230,230);
	}

	:host([rating=hate]) .hate {
		transform: scale(1.4) rotate(10deg);
		background-color: rgb(200,200,200);
		border-radius: 50%;
		filter: none !important;
		z-index: 1;
	}

	:host([rating=dislike]) .dislike {
		transform: scale(1.4) rotate(10deg);
		background-color: rgb(200,200,200);
		border-radius: 50%;
		filter: none !important;
		z-index: 1;
	}

	:host([rating=neutral]) .neutral {
		transform: scale(1.4) rotate(10deg);
		background-color: rgb(200,200,200);
		border-radius: 50%;
		filter: none !important;
		z-index: 1;
	}

	:host([rating=like]) .like {
		transform: scale(1.4) rotate(10deg);
		background-color: rgb(200,200,200);
		border-radius: 50%;
		filter: none !important;
		z-index: 1;
	}

	:host([rating=love]) .love {
		transform: scale(1.4) rotate(10deg);
		background-color: rgb(200,200,200);
		border-radius: 50%;
		filter: none !important;
		z-index: 1;
	}

	</style>
	<div>
	<button class="hate">💩</button>
	<button class="dislike">👎</button>
	<button class="neutral">😐</button>
	<button class="like">👍</button>
	<button class="love">😍</button>
	</div>
	`;
	}

	static get observedAttributes() {
		return ['rating'];
	}

	get rating() {
		return this.getAttribute('rating');
	}

	set rating(val) {
		if (val) {
			this.setAttribute('rating', val);
		} else {
			this.removeAttribute('rating');
		}
	}

	connectedCallback() {
		var hate = new Event('hate');
		var dislike = new Event('dislike');
		var neutral = new Event('neutral');
		var like = new Event('like');
		var love = new Event('love');

		var buttons = this.shadowRoot.querySelectorAll('button');

		var div = this.shadowRoot.querySelector('div');
		div.addEventListener('click', function () {
			buttons.forEach(button => {
				button.style.filter = 'grayscale(.6)';
			});
		}, {once: true});

		buttons[0].addEventListener('click', () => {
			this.dispatchEvent(hate);
			this.setAttribute('rating', 'hate');
		});
		buttons[1].addEventListener('click', () => {
			this.dispatchEvent(dislike);
			this.setAttribute('rating', 'dislike');
		});
		buttons[2].addEventListener('click', () => {
			this.dispatchEvent(neutral);
			this.setAttribute('rating', 'neutral');
		});
		buttons[3].addEventListener('click', () => {
			this.dispatchEvent(like);
			this.setAttribute('rating', 'like');
		});
		buttons[4].addEventListener('click', () => {
			this.dispatchEvent(love);
			this.setAttribute('rating', 'love');
		});
	}
}

customElements.define('emoji-rate', Emojirate);

export default Emojirate;
