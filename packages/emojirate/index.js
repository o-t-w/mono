
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

	.outer {
		display: inline-flex;
		border-radius: 50px;
		padding: 10px;
		background-color: rgb(230,230,230);
		margin-top: 30px;
		position: relative;
	}

	:host {
		font-family: system-ui;
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

	// button:before {
	// 	content: "love!";
	// 	display: block;
	// 	font-size: 16px;
	// 	position: absolute;
	// 	top: -35px;
	// 	border-radius: 15px;
	// 	padding: 5px 10px 5px 10px;
	// 	background-color: rgb(30,30,30);
	// 	color: rgb(240,240,240);
	// }

	// button {
	// 	position: relative;
	// }

	.inner {
		position: absolute;
		top: -30px;
		width: 94%;
		max-width: 100%;
		text-align: center;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 20%;
		box-sizing: border-box;
	}

	.inner span {
		opacity: 0;
		box-sizing: border-box;
		width: 100%;
		border-radius: 15px;
		padding: 2px 2px 2px 2px;
		background-color: rgb(30,30,30);
		color: rgb(240,240,240);
	}

	</style>
	<div class="outer">
	<div class="inner">	<span>hate</span><span>dislike</span><span>meh</span><span>like</span><span>love</span>
	</div>
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

		var ratings = [hate, dislike, neutral, like, love];

		let dispatchAndSetAttribute = rating => {
			this.dispatchEvent(rating);
			this.setAttribute('rating', rating.type);
		};

		buttons.forEach((button, index) => {
			button.addEventListener('click', () => {
				dispatchAndSetAttribute(ratings[index]);
			});
		});

		var spans = Array.from(this.shadowRoot.querySelectorAll('span'));

		buttons.forEach((button, index) => {
			button.addEventListener('mouseenter', () => {
				spans[index].style.opacity = 1;
			});
		});
		buttons.forEach((button, index) => {
			button.addEventListener('mouseleave', () => {
				spans[index].style.opacity = 0;
			});
		});
	}
}

customElements.define('emoji-rate', Emojirate);

export default Emojirate;
