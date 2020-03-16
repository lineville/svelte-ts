<script lang="ts">
  let userInput = "";
  let textBlock = "The quick brown fox jumps over the lazy sheep dog.";
  let currentWord = 0;
  let words = textBlock.split(" ");
  $: completedWords = words.slice(0, currentWord);
  $: incompleteWords = words.slice(currentWord);
  let inputBorderClass = "normal";
  // let startTime = Time.now();

  function handleKeydown(event: any) {
    if (event.keyCode == 32) {
      event.preventDefault();
      if (userInput === words[currentWord]) {
        userInput = "";
        currentWord++;
        inputBorderClass = "normal";
      } else {
        inputBorderClass = "warning";
      }
    }
  }
</script>

<style>
  input {
    width: 200px;
  }

  input.normal {
    outline-color: aqua;
  }

  input.warning {
    outline-color: red;
  }

  mark.red {
    color: #ff0000;
    background: none;
  }

  mark.green {
    color: green;
    background: none;
    text-decoration: underline;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div>
  <p>
    <mark class="green">{completedWords.join(' ')}</mark>
    <mark class="red">{incompleteWords.join(' ')}</mark>
  </p>
</div>
<div>
  <span>
    <input class={inputBorderClass} type="text" bind:value={userInput} />
  </span>
</div>
