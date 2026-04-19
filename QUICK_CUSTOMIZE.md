# Quick Customization Guide

## 🎨 Common Customizations

### 1️⃣ Change Company Name
**Location**: `index.html` (Find and replace all)
```html
<!-- Find: TalentiqueX Web Solutions -->
<!-- Replace with: Your Company Name -->
```
**Files to update**:
- Line 4: Title tag
- Line 19: Logo text
- Line 84: Navbar logo
- Footer sections
- All references throughout

### 2️⃣ Change Colors (Dark Theme → Light or Custom)
**Location**: `css/style.css` - Lines 1-20
```css
:root {
    --primary: #00d4ff;      /* Change to any color hex */
    --secondary: #7b2cbf;    /* Purple accent */
    --accent: #ff006e;       /* Pink accent */
    --success: #00ff88;      /* Green accent */
    --dark-bg: #0a0e27;      /* Background color */
}
```

### 3️⃣ Update Contact Information
**Location**: `index.html`
- Phone: Search for "+1 (555) 123-4567"
- Email: Search for "hello@talentiquex.com"
- Address: Search for "123 Tech Street"
- WhatsApp: Search for "wa.me/919876543210"

### 4️⃣ Add Your Logo
**Steps**:
1. Save logo as `assets/images/logo.png`
2. Keep size around 200x100px
3. Use PNG with transparency
4. Logo automatically appears in navbar and footer

### 5️⃣ Update Hero Section Text
**Location**: `index.html` - Lines 88-95
```html
<h1 class="hero-title">Your Heading Here</h1>
<p class="hero-subtitle">Your subheading here</p>
```

### 6️⃣ Add/Edit Services
**Location**: `index.html` - Services Section
```html
<div class="service-card glass-effect">
    <div class="service-icon">
        <i class="fas fa-icon-name"></i>  <!-- Change icon -->
    </div>
    <h3>Service Name</h3>  <!-- Change name -->
    <p>Service description here...</p>  <!-- Change description -->
    <a href="#" class="service-link">Learn more <i class="fas fa-arrow-right"></i></a>
</div>
```
**Available Icons** (Font Awesome):
- `fa-globe` - Web
- `fa-shopping-cart` - E-commerce
- `fa-laptop-code` - Development
- `fa-palette` - Design
- `fa-mobile-alt` - Mobile
- `fa-rocket` - Performance
[See all: fontawesome.com/icons](https://fontawesome.com/icons)

### 7️⃣ Update Portfolio Projects
**Location**: `index.html` - Portfolio Section
```html
<div class="portfolio-card glass-effect">
    <div class="portfolio-image">
        <img src="your-project-image.jpg" alt="Project Name">
        <div class="overlay">
            <a href="your-project-link.com" class="view-btn">View Project</a>
        </div>
    </div>
    <h3>Project Title</h3>
    <p>Project description</p>
</div>
```

### 8️⃣ Change Testimonials
**Location**: `index.html` - Testimonials Section
```html
<div class="testimonial-card glass-effect">
    <div class="stars">
        <i class="fas fa-star"></i>  <!-- Add/remove for rating -->
    </div>
    <p class="testimonial-text">"Testimonial text here..."</p>
    <div class="testimonial-author">
        <h4>Client Name</h4>
        <p>Client Title, Company</p>
    </div>
</div>
```

### 9️⃣ Update Footer
**Location**: `index.html` - Footer Section
- Company description (Line ~650)
- Links under each column
- Contact information
- Social media links

### 🔟 Set WhatsApp Button
**Location**: `index.html` - Search for `wa.me/`
```html
<!-- Change: +919876543210 (India format) -->
<!-- To your WhatsApp number: +1-555-123-4567 -->
<a href="https://wa.me/15551234567">WhatsApp Us</a>
```

---

## 📱 Font & Typography

### Change Main Font
**Location**: `css/style.css` - Line 12
```css
font-family: 'Poppins', sans-serif;
/* Options: 'Inter', 'Roboto', 'Montserrat', 'Playfair Display' */
```

**To use different Google Font**:
1. Go to [fonts.google.com](https://fonts.google.com)
2. Select font and copy link
3. Replace link in `index.html` line 10

### Adjust Font Sizes
**Location**: `css/style.css`
```css
.hero-title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    /* min-size: 2.5rem | preferred: 8vw | max: 4.5rem */
}
```

---

## 🎬 Animation Customization

### Adjust Animation Speed
**Location**: `css/style.css`
```css
:root {
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    /* Change 0.3s to 0.5s for slower, 0.1s for faster */
}
```

### Toggle Animations On/Off
**Location**: `js/scroll-animations.js`
```javascript
// Comment out to disable:
new ScrollAnimations();  // Disable scroll animations
new TiltCard();         // Disable tilt effect
```

---

## � Additional Resources
```python
MAIL_SERVER = 'smtp.gmail.com'
MAIL_USERNAME = 'your-email@gmail.com'
MAIL_PASSWORD = 'your-app-password'
```

### Modify Contact Form Fields
**Location**: `index.html` - Search "contactForm"
Then add new fields:
```html
<div class="form-group">
    <input type="text" id="company" placeholder="Company Name" required>
    <small class="error-msg" id="companyError"></small>
</div>
```

**Update validation in `js/main.js`**:
```javascript
const company = document.getElementById('company').value.trim();
if (company.length < 2) {
    showError('companyError', 'Company name required');
    isValid = false;
}
```

---

## 📊 Enable Analytics

### Google Analytics
**Location**: `index.html` - Add before `</head>`
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```
(Replace GA_ID with your ID from Google Analytics)

---

## 🎯 SEO Optimization

### Meta Tags
**Location**: `index.html` - Add in `<head>`
```html
<meta name="description" content="Your company description here">
<meta name="keywords" content="web development, design, services">
<meta name="author" content="Your Name">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="image-url.jpg">
```

### Structured Data
**Location**: `index.html` - Add in `<head>`
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TalentiqueX",
  "url": "https://yourdomain.com",
  "logo": "logo-url.png",
  "contact": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "Customer Service"
  }
}
</script>
```

---

## 📈 Performance Tips

### 1. Minify CSS/JS (Production)
```bash
# Use online tools or:
npm install -g minify
minify css/style.css > css/style.min.css
```

### 2. Optimize Images
```bash
# Use ImageOptim (Mac) or FileOptimizer (Windows)
# Or use online: tinypng.com
```

### 3. Enable Gzip Compression
**Location**: `backend/app.py`
```python
from flask_compress import Compress
Compress(app)
```

### 4. Cache Static Assets
**Location**: `backend/app.py`
```python
@app.after_request
def add_header(response):
    response.cache_control.max_age = 3600
    return response
```

---

## 🚀 Deployment Checklist

Before going live:
- [ ] Update company name and branding
- [ ] Change all contact information
- [ ] Add actual portfolio projects
- [ ] Update testimonials with real clients
- [ ] Add company logo
- [ ] Set DEBUG = False
- [ ] Change SECRET_KEY
- [ ] Set up email notifications
- [ ] Test contact form
- [ ] Test on mobile devices
- [ ] Set up SSL/HTTPS
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Test all links
- [ ] Verify responsive design

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Styling not updating | Clear browser cache: Ctrl+Shift+Delete |
| Portfolio images not showing | Check image path in HTML |
| Form not submitting | Check browser console for JavaScript errors |
| WhatsApp button no link | Check phone number format (include country code) |
| Colors not changing | Make sure to change in :root section |
| Animations too fast | Increase transition duration in css/style.css |

---

## 📚 Additional Resources

- **Font Awesome Icons**: https://fontawesome.com/icons
- **Google Fonts**: https://fonts.google.com
- **Color Palettes**: https://coolors.co
- **CSS Animations**: https://animate.style
- **Responsive Design**: https://github.com/twbs/bootstrap

---

**Quick Copy-Paste Templates Available Upon Request!**

For more specific customizations, refer to the main README.md or DEPLOYMENT.md files.

---

**Last Updated**: March 2024
