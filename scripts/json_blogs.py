import os
import re
import json

blogs_dir = "../blogs/contents"

blogs_data = []

def scan_dir_contents():
    if os.path.isdir(blogs_dir):
       for blog_name in os.listdir(blogs_dir):
           if blog_name.endswith('.html'):
              blog_path = os.path.join(blogs_dir, blog_name)

              with open(blog_path, "r", encoding="utf-8") as blog_file:
                   blog_content = blog_file.read()
                   title_match = re.search(r"<title>(.*?)</title>", blog_content, re.IGNORECASE)
                   title = title_match.group(1) if title_match else "Untitled blog"

                   img_match = re.search(r'<img[^>]+src="([^">]+)"', blog_content, re.IGNORECASE)
                   img = img_match.group(1) if img_match else "../images/backgrounds/notFound.png"

                   blogs_data.append({
                     'title': title,
                     'filename': blog_name,
                     'image': img
                   })

output_file = "blogs.json"

with open(output_file, "w", encoding="utf-8") as json_file:
     scan_dir_contents()
     json.dump(blogs_data, json_file, ensure_ascii=False, indent=2)
     

print(f"Generated JSON file of blogs {output_file}")
