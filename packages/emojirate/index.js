
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
	}

	div {
		display: inline-flex;
		border-radius: 20px;
		padding: 10px;
		background-color: rgb(230,230,230);
	}

	:host([rating=hate]) .hate {
		transform: scale(1.4) rotate(10deg);
	}

	:host([rating=dislike]) .dislike {
		transform: scale(1.4) rotate(10deg);
	}

	:host([rating=like]) .like {
		transform: scale(1.4) rotate(10deg);
	}

	:host([rating=love]) .love {
		transform: scale(1.4) rotate(10deg);
	}

	</style>
	<div>
	<button class="hate">💩</button>
	<button class="dislike">👎</button>
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
		var like = new Event('like');
		var love = new Event('love');

		var buttons = this.shadowRoot.querySelectorAll('button');
		buttons[0].addEventListener('click', () => {
			this.dispatchEvent(hate);
			this.setAttribute('rating', 'hate');
		});
		buttons[1].addEventListener('click', () => {
			this.dispatchEvent(dislike);
			this.setAttribute('rating', 'dislike');
		});
		buttons[2].addEventListener('click', () => {
			this.dispatchEvent(like);
			this.setAttribute('rating', 'like');
		});
		buttons[3].addEventListener('click', () => {
			this.dispatchEvent(love);
			this.setAttribute('rating', 'love');
		});
	}
}

customElements.define('emoji-rate', Emojirate);

export default Emojirate;
