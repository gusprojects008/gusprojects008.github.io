// Javascript

// Buttons change theme
document.getElementById("toggle-theme").addEventListener('click', function() {
  const body = document.body;
  const button = document.getElementById("toggle-theme");

  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");

  if (body.classList.contains("light-theme")) {
     button.className = "button-theme button-theme-light";
  } else {
      button.className = "button-theme button-theme-dark";
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const button = document.getElementById("toggle-theme");

  body.classList.add("dark-theme");
  button.className = "button-theme button-theme-dark";
});

document.addEventListener('DOMContentLoaded', function() {
  const readBlogs = document.getElementById('read_blogs');
  const useTools = document.getElementById('use_tools');
  const useToolsH2 = useTools.querySelector('h2');
  const useToolsP = useTools.querySelector('p');
  
  function ElementInViewPort(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  function handleScrool() {
    if (ElementInViewPort(readBlogs)) {
      readBlogs.classList.remove('hidden-rb');
      readBlogs.classList.add('slide-up');
    /*  window.removeEventListener('scroll', handleScrool);*/
    }
    if (ElementInViewPort(useTools)) {
      useToolsH2.classList.remove('hidden-rb');
      useToolsH2.classList.add('slide-left-3s');
      useToolsP.classList.remove('hidden-rb');
      useToolsP.classList.add('slide-left-5s');
    };
  };
  readBlogs.classList.add('hidden-rb');
  useToolsH2.classList.add('hidden-rb');
  useToolsP.classList.add('hidden-rb');
  window.addEventListener('scroll', handleScrool); 
  handleScrool();
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
