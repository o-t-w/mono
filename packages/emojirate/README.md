# Emoji Rater

Rate things with emoji rather than stars 

![screenshot showing the emojirate component](./emojirate.png)

## Usage
```
	<emoji-rate></emoji-rate>

<script type="module">
	import './emojirate/index.js'
</script>
```

Unfortunately there is in not yet a way for a custom element to automatically pass its data to a form submission. Instead, something like the following is necessary:

```
var emojirate = document.querySelector('emoji-rate');
var formData = new FormData();
formData.append('rating', emojirate.rating);
```

The `emoji-rate` element also will dispatch a custom "rating" event: 

```
var emojirate = document.querySelector('emoji-rate');
emojirate.addEventListener('rating', function(e) {console.log(e.target.rating)});
```
