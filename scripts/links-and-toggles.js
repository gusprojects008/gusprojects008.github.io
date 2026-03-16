document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  if (!document.querySelector("footer")) {
    body.insertAdjacentHTML("beforeend", `
      <footer>
        <a href="https://github.com/gusprojects008" target="_blank" rel="noopener noreferrer">
          <img class="images_footer" src="/statics/images/icons/github_logo_icon_169115.png" alt="Github Logo">
        </a>
        <a href="https://www.youtube.com/@msk0-e2b" target="_blank" rel="noopener noreferrer">
          <img class="images_footer" src="/statics/images/icons/YouTube_23392.png" alt="Youtube Logo">
        </a>
        <a href="/statics/images/icons/session-account-id-2025-08-31T04_34_16.442Z.jpg" target="_blank" rel="noopener noreferrer">
          <abbr title="Contact me through session!, a secure and private communication App!">
            <img class="images_footer" src="/statics/images/icons/480px-Session_App_Logo.svg.png" alt="Session app Logo">
          </abbr>
        </a>
      </footer>
    `);
  }
  const button = document.createElement("button");
  button.id = "change-theme";
  button.className = "change-theme change-theme-dark";
  body.appendChild(button);

  body.classList.add("dark-theme");

  button.addEventListener("click", function () {
    body.classList.toggle("light-theme");
    body.classList.toggle("dark-theme");

    button.className = body.classList.contains("light-theme")
      ? "change-theme change-theme-light"
      : "change-theme change-theme-dark";
  });
});

