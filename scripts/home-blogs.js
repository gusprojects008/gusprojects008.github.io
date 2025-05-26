document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const blogsContainer = document.getElementById("blogs-container");
  let blogs = [];

  fetch('/scripts/blogs.json')
    .then(response => response.json())
    .then(data => {
      blogs = data;
      displayBlogs(blogs);
      })
    .catch(error => console.error("Error to the load the blogs", error));

  function displayBlogs(blogsToDisplay) {
    blogsContainer.innerHTML = '';
    blogsToDisplay.forEach(blog => {
      const blogPreview = document.createElement("div");
      blogPreview.classList.add('blog-preview');     
          
      const blogLink = document.createElement('a');
      blogLink.href = `/blogs/contents/${blog.filename}`;
      blogLink.textContent = blog.title || 'Untitled Blog';

      const blogImagePreview = document.createElement('img');
      blogImagePreview.src = blog.image || '/images/backgrounds/notFound.png';
      blogImagePreview.alt = `Preview for ${blog.title || 'Untitled Blog'}`;
      blogPreview.appendChild(blogImagePreview);
      blogPreview.appendChild(blogLink);
      blogsContainer.appendChild(blogPreview);
    });
  };

  function searchBlogs(query) {
    const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(query.toLowerCase())
    );
    displayBlogs(filteredBlogs);
  }

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    searchBlogs(query);
  });
  
  searchInput.addEventListener("input", () => {
    if (!searchInput.value.trim()) {
      displayBlogs(blogs);
    }
  });
});



