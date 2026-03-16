document.addEventListener("DOMContentLoaded", () => {
  const mindmapsContainer = document.getElementById("mindmaps-container");
  const expandBtn = document.getElementById("expand-mindmaps");

  let mindmapsData = [];
  let mindmapsLoaded = false;

  fetch("/scripts/mindmaps.json")
    .then((res) => res.json())
    .then((data) => (mindmapsData = data))
    .catch((err) => console.error("Error loading mindmaps", err));

  expandBtn.addEventListener("click", () => {
    const isExpanded = mindmapsContainer.classList.toggle("expanded");
    mindmapsContainer.classList.toggle("collapsed", !isExpanded);
    expandBtn.querySelector(".arrow").classList.toggle("expanded", !isExpanded);

    if (isExpanded && !mindmapsLoaded) {
      displayBlogsWithAnimation(mindmapsData);
      mindmapsLoaded = true;
    } else {
      mindmapsLoaded = false;
    }
  });

  function displayBlogsWithAnimation(mindmaps) {
    mindmapsContainer.innerHTML = "";

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("fade-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    mindmaps.forEach((mindmap) => {
      const mindmapPreview = document.createElement("div");
      mindmapPreview.classList.add("mindmap-preview", "hidden");

      const mindmapLink = document.createElement("a");
      mindmapLink.href = `/mindmaps/${mindmap.filename}`;
      mindmapLink.textContent = mindmap.title || "Untitled Blog";

      const mindmapImagePreview = document.createElement("img");
      mindmapImagePreview.src = mindmap.image || "/statics/images/mindmaps/notFound.png";
      mindmapImagePreview.alt = `Preview for ${mindmap.title || "Untitled Blog"}`;

      mindmapPreview.appendChild(mindmapImagePreview);
      mindmapPreview.appendChild(mindmapLink);
      mindmapsContainer.appendChild(mindmapPreview);

      observer.observe(mindmapPreview);
    });
  }
});
