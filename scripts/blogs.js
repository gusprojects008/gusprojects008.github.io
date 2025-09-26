document.addEventListener("DOMContentLoaded", () => {
  const blogsContainer = document.getElementById("blogs-container");
  const expandBtn = document.getElementById("expand-blogs");

  let blogsData = [];
  let blogsLoaded = false;

  fetch("/scripts/blogs.json")
    .then((res) => res.json())
    .then((data) => (blogsData = data))
    .catch((err) => console.error("Error loading blogs", err));

  expandBtn.addEventListener("click", () => {
    const isExpanded = blogsContainer.classList.toggle("expanded");
    blogsContainer.classList.toggle("collapsed", !isExpanded);
    expandBtn.querySelector(".arrow").classList.toggle("expanded", !isExpanded);

    if (isExpanded && !blogsLoaded) {
      displayBlogsWithAnimation(blogsData);
      blogsLoaded = true;
    } else {
      blogsLoaded = false;
    }
  });

  function displayBlogsWithAnimation(blogs) {
    blogsContainer.innerHTML = "";

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

    blogs.forEach((blog) => {
      const blogPreview = document.createElement("div");
      blogPreview.classList.add("blog-preview", "hidden");

      const blogLink = document.createElement("a");
      blogLink.href = `/blogs/${blog.filename}`;
      blogLink.textContent = blog.title || "Untitled Blog";

      const blogImagePreview = document.createElement("img");
      blogImagePreview.src = blog.image || "/statics/images/blogs/notFound.png";
      blogImagePreview.alt = `Preview for ${blog.title || "Untitled Blog"}`;

      blogPreview.appendChild(blogImagePreview);
      blogPreview.appendChild(blogLink);
      blogsContainer.appendChild(blogPreview);

      observer.observe(blogPreview);
    });
  }
});
