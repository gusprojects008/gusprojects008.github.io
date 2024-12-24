// Javascript

// Buttons change theme
document.getElementById("toggle-theme").addEventListener('click', function() {
  const body = document.body;
  const button = document.getElementById("toggle-theme");

  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");

  if (body.classList.contains("light-theme")) {
    button.className = "button-theme-light";
    button.textContent = "Dark Mode";
  } else {
      button.className = "button-theme-dark";
      button.textContent = "Light Mode";
  }
});

let text_welcome = "Welcome to Cyberspace!";
const text_welcome_output = document.getElementById("welcome_output"); // welcome_text output

function typing_effect(text, output) {
  let index = 0;
  const delay = 50;
  const cursor = document.createElement("span");
  cursor.className = "cursorBlink";
  cursor.textContent = "|";
  function write() {
    if (index < text.length) {
      output.textContent += text[index];
      index++;
      setTimeout(write, delay);
    }
    else {
      output.appendChild(cursor);
    }
  }
  write(); // start write effect in element
}

typing_effect(text_welcome, text_welcome_output);
