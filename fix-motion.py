import os, re

files = [
    'components/ui/animated-text.tsx',
    'app/components/HeroSection.tsx',
    'app/components/ContactSection.tsx',
    'app/components/ProjectCard.tsx',
    'app/components/TestimonialsSection.tsx',
    'app/components/WhyChooseUs.tsx',
    'app/components/WhyUsSection.tsx',
    'app/components/WorkSection.tsx'
]

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace 'import { motion }' with 'import { m }'
        content = re.sub(r'import\s+\{\s*([^}]*?)\bmotion\b([^}]*?)\}\s+from\s+[\'\"]framer-motion[\'\"]', r'import {\1m\2} from "framer-motion"', content)
        # Replace '<motion.' with '<m.'
        content = content.replace('<motion.', '<m.')
        # Replace '</motion.' with '</m.'
        content = content.replace('</motion.', '</m.')
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Fixed {f}')
