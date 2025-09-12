document.addEventListener("DOMContentLoaded", () => {
  const blogsWrapper = document.getElementById("blogs-container-wrapper");
  const blogsContainer = document.getElementById("blogs-container");
  const expandBtn = document.getElementById("expand-blogs");

  let blogsData = [];
  let blogsLoaded = false;

  fetch('/scripts/blogs.json')
    .then(response => response.json())
    .then(data => {
      blogsData = data;
    })
    .catch(error => console.error("Error loading blogs", error));

  expandBtn.addEventListener("click", () => {
    const isExpanded = blogsContainer.classList.toggle("expanded");
    blogsContainer.classList.toggle("collapsed", !isExpanded);
    expandBtn.querySelector(".arrow").classList.toggle("expanded", !isExpanded);

    if (isExpanded && !blogsLoaded) {
      displayBlogsWithAnimation(blogsData);
      blogsLoaded = true;
    }
  });

  function displayBlogsWithAnimation(blogs) {
    blogsContainer.innerHTML = '';
    blogs.forEach((blog, index) => {
      const blogPreview = document.createElement("div");
      blogPreview.classList.add('blog-preview', 'hidden');

      const blogLink = document.createElement('a');
      blogLink.href = `/blogs/${blog.filename}`;
      blogLink.textContent = blog.title || 'Untitled Blog';

      const blogImagePreview = document.createElement('img');
      blogImagePreview.src = blog.image || '/statics/images/blogs/notFound.png';
      blogImagePreview.alt = `Preview for ${blog.title || 'Untitled Blog'}`;

      blogPreview.appendChild(blogImagePreview);
      blogPreview.appendChild(blogLink);
      blogsContainer.appendChild(blogPreview);

      setTimeout(() => {
        blogPreview.classList.remove('hidden');
        blogPreview.classList.add('fade-in');
      }, index * 300);
    });
  }
});
