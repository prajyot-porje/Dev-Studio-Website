const fs = require('fs');
const files = [
    'app/components/TestimonialsSection.tsx',
    'app/components/ProjectCard.tsx',
    'app/components/WhyChooseUs.tsx',
    'app/components/WorkSection.tsx',
    'app/components/WhyUsSection.tsx',
    'components/ui/ripple-element.tsx',
    'components/ui/dot-pattern.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let text = fs.readFileSync(f, 'utf8');
        // Replace motion with m in the import line
        text = text.replace(/import\s+\{([^}]*?)(\bmotion\b)([^}]*?)\}\s+from\s+['"]framer-motion['"]/g, (match, p1, p2, p3) => {
            return `import {${p1}m${p3}} from 'framer-motion'`;
        });
        text = text.replace(/<motion\./g, '<m.');
        text = text.replace(/<\/motion\./g, '</m.');
        fs.writeFileSync(f, text);
        console.log(`Fixed ${f}`);
    }
});
