# Levi.art - Professional Portfolio Website

A modern, responsive portfolio website for Levi M. Mulama - professional charcoal and graphite portrait artist based in Nairobi, Kenya. This website showcases custom portrait services, art mentorship programs, and creative projects.

## Live Website
**https://levi-mulama.github.io/levi.art_website/**

## Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Portfolio Gallery** - Filterable gallery showcasing charcoal and graphite portraits
- **Contact Form** - Integrated with Formspree for reliable message delivery
- **Service Showcase** - Custom portraits, art classes, and mentorship programs
- **Pricing Information** - Transparent A-size based pricing structure
- **Blog Section** - Art tips, tutorials, and behind-the-scenes content
- **Donation System** - Support for artistic mission and community projects
- **SEO Optimized** - Proper meta tags, semantic HTML, and structured data
- **Accessibility** - WCAG 2.1 compliant with proper ARIA labels
- **Performance** - Optimized loading, lazy images, and efficient code

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6.5.0
- **Fonts**: Google Fonts (Poppins)
- **Forms**: Formspree integration
- **Hosting**: GitHub Pages
- **Responsive**: CSS Grid & Flexbox

## Project Structure

```
levi-art-website/
├── index.html                  # Homepage
├── README.md                   # Project documentation
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # Site structure for SEO
├── .gitignore                  # Git ignore file
├── assets/
│   ├── css/
│   │   ├── main.css           # Core styles and layout
│   │   ├── components.css     # Reusable UI components
│   │   └── responsive.css     # Media queries
│   ├── js/
│   │   ├── main.js            # Core functionality
│   │   ├── portfolio.js       # Portfolio features
│   │   └── contact.js         # Contact form logic
│   └── images/
│       ├── logo/              # Brand logos
│       ├── hero/              # Hero section images
│       ├── about/             # About page images
│       ├── portfolio/         # Portfolio artwork images
│       ├── blog/              # Blog post images
│       └── icons/             # Favicon files
└── pages/
    ├── about.html             # About page
    ├── portfolio.html         # Portfolio gallery
    ├── contact.html           # Contact & commission page
    ├── thank-you.html         # Form success page
    └── 404.html               # Error page
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/levi-mulama/levi.art_website.git
   cd levi.art_website
   ```

2. **Add your images**
   Place your images in the appropriate folders under `assets/images/`

3. **Configure Formspree**
   - Sign up at https://formspree.io
   - Get your form endpoint
   - Update the form action in `pages/contact.html`

4. **Test locally**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
   
   Then open `http://localhost:8000` in your browser

5. **Deploy to GitHub Pages**
   - Push to your GitHub repository
   - Enable GitHub Pages in repository settings
   - Select main branch as source

## Image Requirements

### Portfolio Images
- **Format**: JPG or PNG
- **Minimum Resolution**: 1200x800px
- **Recommended**: 1920x1280px for best quality
- **Optimization**: Compress images for web (TinyPNG, ImageOptim)

### Logo Files
- Orange logo: `levi-art-logo-orange.png`
- Black logo: `levi-art-logo-black.png`
- Dimensions: 200x80px (transparent background)

### Favicon
- 32x32px and 16x16px PNG files
- Place in `assets/images/icons/`

## Customization

### Colors
Edit CSS variables in `assets/css/main.css`:
```css
:root {
    --primary-color: #ff5311;      /* Brand orange */
    --primary-dark: #e6440d;       /* Darker orange */
    --text-dark: #111111;          /* Main text */
    --text-light: #666666;         /* Secondary text */
    --bg-white: #ffffff;           /* White background */
    --bg-gray: #f8f8f8;           /* Light gray background */
}
```

### Typography
Change fonts in the `<head>` section of HTML files:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update the CSS:
```css
body {
    font-family: 'YourFont', sans-serif;
}
```

### Contact Information
Update contact details in:
- Footer sections in all HTML files
- Contact page (`pages/contact.html`)
- WhatsApp button links

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- All images use lazy loading
- CSS is modularized for faster loading
- JavaScript is split into functional modules
- Fonts use `font-display: swap` for faster rendering
- Minimal external dependencies

## SEO Features

- Semantic HTML5 markup
- Meta tags for social sharing (Open Graph)
- Descriptive alt text for images
- Clean URL structure
- XML sitemap included
- Robots.txt configured
- Fast loading times

## Accessibility Features

- WCAG 2.1 AA compliant
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratios meet standards
- Focus indicators on interactive elements

## Development Guidelines

### CSS
- Use CSS variables for consistent theming
- Follow BEM naming convention where appropriate
- Mobile-first approach for responsive design
- Avoid !important declarations

### JavaScript
- Use ES6+ features
- Avoid inline event handlers where possible
- Handle errors gracefully
- Comment complex logic
- Keep functions focused and single-purpose

### HTML
- Semantic HTML5 elements
- Proper document structure
- Accessibility attributes
- Clean, readable code

## Common Tasks

### Adding Portfolio Items
1. Add image to `assets/images/portfolio/`
2. Open `pages/portfolio.html`
3. Copy existing portfolio item structure
4. Update image path, title, description, and category

### Updating Pricing
Edit the pricing section in `pages/contact.html`

### Adding Blog Posts
Edit the blog preview section in `index.html`

### Modifying Navigation
Update the navigation menu in all HTML files (consistent structure)

## Known Limitations

- Form submissions require Formspree account
- No backend database (static site)
- Weather widget uses fallback data (API removed for security)
- Blog posts are hardcoded (no CMS integration)
- Portfolio filtering requires manual categorization

## Future Enhancements

- [ ] Implement blog CMS integration
- [ ] Add lightbox gallery for portfolio
- [ ] Integrate payment gateway for commissions
- [ ] Add testimonials section
- [ ] Implement newsletter backend
- [ ] Add portfolio image upload system
- [ ] Create admin dashboard
- [ ] Add multi-language support

## Troubleshooting

### Form Not Submitting
- Verify Formspree endpoint is correct
- Check browser console for errors
- Ensure all required fields are filled

### Images Not Loading
- Check file paths are correct
- Verify images are in correct folders
- Check file extensions match HTML references
- Ensure images are optimized (not too large)

### Styling Issues
- Clear browser cache
- Check CSS file paths
- Verify no conflicting styles
- Test in different browsers

## Contributing

This is a personal portfolio website. However, if you notice bugs or have suggestions:
1. Open an issue on GitHub
2. Describe the problem or enhancement
3. Include screenshots if applicable

## License

© 2025 levi.art | All rights reserved

This website and its content are proprietary. Unauthorized copying or distribution is prohibited.

## Contact

**Levi M. Mulama**
- Email: leviart9@gmail.com
- Phone: +254 705 501 237
- Location: Nairobi, Kenya
- Website: https://levi-mulama.github.io/levi.art_website/

**Social Media**
- Instagram: [@leviar.t](https://www.instagram.com/leviar.t/)
- Facebook: [Levi Mulama](https://www.facebook.com/levimulama.mulama)
- TikTok: [@leviart_](https://www.tiktok.com/@leviart_)
- X (Twitter): [@_LeviArt_](https://x.com/_LeviArt_)

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Formspree for form handling
- GitHub Pages for hosting

---

**Version**: 2.0  
**Last Updated**: September 2025  
**Status**: Active Development

For technical support or inquiries, contact: leviart9@gmail.com