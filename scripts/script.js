// Javascript

let text_welcome = "Welcome to Cyberspace! haha (:";
const output = document.getElementById("welcome_text"); // welcome_text Id

function write_effect(text, output) {
  let index = 0;
  const delay = 150;

  function write() {
    if (index < text.length) {
      output.textContent += text[index];
      index++;
      setTimeout(write, delay);
    }
  }
  write(); // start write effect in element
}

write_effect(text_welcome, output)
