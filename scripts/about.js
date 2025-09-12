document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = [
    { selector: "#menu-area", animation: "fade-in" },
    { selector: "#about-me", animation: "slide-right-3s" },
    { selector: "#skills", animation: "slide-left-3s" },
    { selector: "#github-container", animation: "slide-right-3s" },
    { selector: "#cta-github", animation: "slide-left-3s" },
    { selector: "form#contact", animation: "slide-right-3s" }
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const animation = el.dataset.animation;

        if (entry.isIntersecting) {
          el.classList.remove("hidden-element");
          el.classList.add(animation);
        } else {
          el.classList.remove(animation);
          el.classList.add("hidden-element");
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToAnimate.forEach(({ selector, animation }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.dataset.animation = animation;
      el.classList.add("hidden-element");
      observer.observe(el);
    }
  });

  const cache = {};
  let tooltipBox;

  function createTooltip() {
    tooltipBox = document.createElement("div");
    tooltipBox.className = "wiki-tooltip";
    document.body.appendChild(tooltipBox);
  }

  async function fetchWikiSummary(term) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${term}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      return {
        extract: data.extract || "No summary available.",
        link: data.content_urls.desktop.page
      };
    } catch {
      return {
        extract: "Could not load preview.",
        link: `https://en.wikipedia.org/wiki/${term}`
      };
    }
  }

  function showTooltip(term, e) {
    const { extract, link } = cache[term];
    tooltipBox.innerHTML = `
      <div>${extract}</div>
      <a href="${link}" target="_blank" rel="noopener noreferrer">Read on Wikipedia</a>
    `;
    tooltipBox.style.left = e.pageX + 15 + "px";
    tooltipBox.style.top = e.pageY + 15 + "px";
    tooltipBox.style.opacity = "1";
  }

  function moveTooltip(e) {
    tooltipBox.style.left = e.pageX + 15 + "px";
    tooltipBox.style.top = e.pageY + 15 + "px";
  }

  function hideTooltip() {
    tooltipBox.style.opacity = "0";
  }

  createTooltip();

  document.querySelectorAll("abbr.wiki").forEach(abbr => {
    const term = abbr.dataset.wiki;

    async function ensureCache() {
      if (!cache[term]) {
        cache[term] = await fetchWikiSummary(term);
      }
    }

    abbr.addEventListener("mouseenter", async e => {
      await ensureCache();
      showTooltip(term, e);
    });

    abbr.addEventListener("mousemove", moveTooltip);
    abbr.addEventListener("mouseleave", hideTooltip);

    abbr.addEventListener("click", async e => {
      e.preventDefault();
      await ensureCache();
      showTooltip(term, e);
    });
  });

  const form = document.getElementById("contact");
  const statusEl = document.getElementById("status-email");
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    if (!hcaptcha.getResponse()) {
      document.body.classList.add("sent-failure-email");
      setTimeout(() => document.body.classList.remove("sent-failure-email"), 1500);
      statusEl.innerText = "Please confirm the captcha.";
      statusEl.className = "status-failure-email";
      return;
    } else if (typeof hcaptcha === "undefined") {
      document.body.classList.add("sent-failure-email");
      setTimeout(() => document.body.classList.remove("sent-failure-email"), 1500);
      statusEl.innerText = "captcha not loaded.";
      statusEl.className = "status-failure-email";
      return;
    }
  
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    document.body.classList.add("sending-email");
  
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    }).then(res => {
      if (res.ok) {
        document.body.classList.add("sent-success-email");
        setTimeout(() => document.body.classList.remove("sent-success-email"), 1500);
        statusEl.innerText = "Email sent successfully!";
        statusEl.className = "status-success-email";
        form.reset();
        hcaptcha.reset();
      } else {
        throw new Error("Server returned " + res.status);
      }
    }).catch(error => {
      document.body.classList.add("sent-failure-email");
      setTimeout(() => document.body.classList.remove("sent-failure-email"), 1500);
      statusEl.innerText = "Error sending email.";
      statusEl.className = "status-failure-email";
      console.error(error);
    }).finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send";
      document.body.classList.remove("sending-email");
    });
  });
});

/*document.getElementById("contact").addEventListener("submit", function(event) {
  emailjs.init("ahNPnUobgwiO3nheM");
  event.preventDefault();

  const statusEl = document.getElementById("status-email");

  emailjs.sendForm("service_mgyx22j", "template_myg5wbk", this)
    .then(() => {
      document.body.classList.add("sent-success-email");
      setTimeout(() => {
        document.body.classList.remove("sent-success-email");
      }, 1500);

      statusEl.innerText = "Email sent successfully!";
      statusEl.className = "status-success-email";
      this.reset();
    }, (error) => {
      document.body.classList.add("sent-failure-email");
      setTimeout(() => {
        document.body.classList.remove("sent-failure-email");
      }, 1500);

      statusEl.innerText = "Error sending email (see console)";
      statusEl.className = "status-failure-email";
      console.error(JSON.stringify(error));
    });
});*/
