import re

with open('gameplay.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace background particles
stars_html = """      <!-- Cyber Grid Background -->
      <div class="cyber-grid"></div>

      <!-- Background Stars -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.85] z-0">
        <!-- Star particles -->
        <div class="star-particle" style="left: 10%; top: 15%; width: 3px; height: 3px; animation-duration: 2s; animation-delay: 0s;"></div>
        <div class="star-particle" style="left: 25%; top: 35%; width: 4px; height: 4px; animation-duration: 3s; animation-delay: 1s;"></div>
        <div class="star-particle" style="left: 45%; top: 10%; width: 2px; height: 2px; animation-duration: 2.5s; animation-delay: 0.5s;"></div>
        <div class="star-particle" style="left: 70%; top: 20%; width: 3px; height: 3px; animation-duration: 4s; animation-delay: 2s;"></div>
        <div class="star-particle" style="left: 85%; top: 40%; width: 5px; height: 5px; animation-duration: 3.5s; animation-delay: 1.5s;"></div>
        <div class="star-particle" style="left: 15%; top: 60%; width: 3px; height: 3px; animation-duration: 2.8s; animation-delay: 0.2s;"></div>
        <div class="star-particle" style="left: 35%; top: 75%; width: 4px; height: 4px; animation-duration: 3.2s; animation-delay: 0.8s;"></div>
        <div class="star-particle" style="left: 60%; top: 65%; width: 2px; height: 2px; animation-duration: 2.1s; animation-delay: 1.2s;"></div>
        <div class="star-particle" style="left: 80%; top: 85%; width: 3px; height: 3px; animation-duration: 3.9s; animation-delay: 0.4s;"></div>
        <div class="star-particle" style="left: 95%; top: 55%; width: 4px; height: 4px; animation-duration: 2.4s; animation-delay: 0.7s;"></div>
        <div class="star-particle" style="left: 5%; top: 80%; width: 2px; height: 2px; animation-duration: 3.1s; animation-delay: 1.1s;"></div>
        <div class="star-particle" style="left: 55%; top: 90%; width: 3px; height: 3px; animation-duration: 2.6s; animation-delay: 1.9s;"></div>
        <div class="star-particle" style="left: 40%; top: 45%; width: 5px; height: 5px; animation-duration: 4.2s; animation-delay: 0.3s;"></div>
        <div class="star-particle" style="left: 90%; top: 15%; width: 2px; height: 2px; animation-duration: 2.9s; animation-delay: 1.4s;"></div>
        <div class="star-particle" style="left: 20%; top: 95%; width: 3px; height: 3px; animation-duration: 3.7s; animation-delay: 0.9s;"></div>
        
        <!-- Subtle Purple/Blue glowing large orbs in the background -->
        <div class="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_15px_3px_#00d4ff] opacity-40"></div>
        <div class="absolute bottom-[30%] right-[20%] w-3 h-3 rounded-full bg-[#b300ff] shadow-[0_0_20px_4px_#b300ff] opacity-30"></div>
        <div class="absolute top-[60%] left-[80%] w-2 h-2 rounded-full bg-[#ff0055] shadow-[0_0_15px_3px_#ff0055] opacity-20"></div>
      </div>
"""

# The section starts with "<!-- Background Particles -->" and ends before "    </div>" followed by "          >local_fire_department</span" which seems like malformed HTML from previous version. Let's just find the bounds.
# Line 43 is "      <!-- Background Particles -->"
# Line 265 is "    </div>" 
# Better yet, regex substitution using re.DOTALL

pattern = re.compile(r'      <!-- Background Particles -->.*?</div>\s*</div>\s*(?:>local_fire_department</span\s*>\s*<span[^>]*>local_fire_department</span\s*>\s*)*.*?(?=<!-- HUD \(Top\) -->)', re.DOTALL)

# Let's check what we are replacing exactly
# The bad HTML is between <!-- Background Particles --> and <!-- HUD (Top) -->

new_content = re.sub(pattern, stars_html + "    </div>\n\n    ", content)

with open('gameplay.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated HTML successfully")
