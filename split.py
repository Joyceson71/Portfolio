import re
import os

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Extract parts using regex
header_match = re.search(r'(.*?<!-- ======= HEADER ======= -->.*?</header>)', content, re.DOTALL)
header = header_match.group(1)

# Update nav links in header
header = header.replace('href="#home"', 'href="index.html"')
header = header.replace('href="#about"', 'href="about.html"')
header = header.replace('href="#skills"', 'href="skills.html"')
header = header.replace('href="#project"', 'href="projects.html"')
header = header.replace('href="#contact"', 'href="contact.html"')

footer_match = re.search(r'(<!-- ======= FOOTER ======= -->.*)', content, re.DOTALL)
footer = footer_match.group(1)

# Extract sections
home_match = re.search(r'(<!-- ======= HOME ======= -->.*?</section>)', content, re.DOTALL)
about_match = re.search(r'(<!-- ======= ABOUT ======= -->.*?</section>)', content, re.DOTALL)
skills_match = re.search(r'(<!-- ======= SKILLS ======= -->.*?</section>)', content, re.DOTALL)
projects_match = re.search(r'(<!-- ======= PROJECTS ======= -->.*?</section>)', content, re.DOTALL)
contact_match = re.search(r'(<!-- ======= CONTACT ======= -->.*?</section>)', content, re.DOTALL)

def write_page(filename, section_html):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(header + "\n\n    " + section_html + "\n\n    " + footer)

# Write separate pages
write_page("index.html", home_match.group(1))
write_page("about.html", about_match.group(1))
write_page("skills.html", skills_match.group(1))
write_page("projects.html", projects_match.group(1))
write_page("contact.html", contact_match.group(1))

print("Split completed successfully!")
