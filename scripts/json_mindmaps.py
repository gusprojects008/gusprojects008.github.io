import os
import re
import json

mindmaps_dir = "../mindmaps"
mindmaps_data = []

def scan_dir_contents():
    if os.path.isdir(mindmaps_dir):
        for mindmap_name in os.listdir(mindmaps_dir):
            if mindmap_name.endswith(".md"):
               mindmap_path = os.path.join(mindmaps_dir, mindmap_name)

               with open(mindmap_path, "r", encoding="utf-8") as mindmap_file:
                   mindmap_content = mindmap_file.read()

                   title_match = re.search(r"^#\s+(.*)", mindmap_content, re.MULTILINE)
                   title = title_match.group(1) if title_match else "Untitled mindmap"

                   img_match = re.search(r"!\[.*?\]\((.*?)\)", mindmap_content)
                   img = img_match.group(1) if img_match else "/statics/images/mindmaps/notFound.png"

                   #mindmap_name = mindmap_name.replace(".md", "")
                   mindmap_name = mindmap_name.removesuffix(".md")

                   mindmaps_data.append({
                       "title": title,
                       "filename": mindmap_name,
                       "image": img
                   })

scan_dir_contents()

mindmaps_data.sort(key=lambda x: x["title"].lower())

mindmaps_data.sort(key=lambda x: (x["image"] == "/statics/images/mindmaps/notFound.png", x["title"] == "Untitled mindmap", x["title"].lower()))

with open("mindmaps.json", "w", encoding="utf-8") as json_file:
    json.dump(mindmaps_data, json_file, ensure_ascii=False, indent=2)

print("Generated JSON file of mindmaps mindmaps.json")
