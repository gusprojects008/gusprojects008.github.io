const blogPreviewContainer = document.getElementById('blogs-container');

fetch('/scripts/getBlogsPreview.php')
  .then(response => response.json())
  .then(blogs => {
    blogs.forEach(blog => {
      const blogPreview = document.createElement('div');
      blogPreview.classList.add('blog-preview');
      
      const blogLink = document.createElement('a');
      blogLink.href = `/blogs/contents/${blog.filename}`;
      blogLink.textContent = blog.title || 'Untitled Blog';

      const blogImagePreview = document.createElement('img');
      blogImagePreview.src = blog.image || '/images/backgrounds/notFound.png';
      blogImagePreview.alt = `Preview for ${blog.title || 'Untitled Blog'}`;
      blogPreview.appendChild(blogImagePreview);
      blogPreview.appendChild(blogLink);
      blogPreviewContainer.appendChild(blogPreview);
    });
  })
  .catch(error => {
    console.log("Error to fetching blogs", error);
  });
