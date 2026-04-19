# Deployment Guide - TalentiqueX Web Solutions

Complete guide to deploy your website to production.

## Local Testing

### Frontend Only (No Backend)
1. Open `index.html` directly in browser
2. Website works immediately
3. Contact form shows success message locally (no backend)

### With Backend

1. **Install Python** (if not already installed)
   - Download from python.org
   - Make sure to add Python to PATH

2. **Open Command Prompt/Terminal**
```bash
cd "TalentiqueX Web Solutions"
```

3. **Create Virtual Environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux
```

4. **Install Dependencies**
```bash
pip install -r backend/requirements.txt
```

5. **Run Server**
```bash
python backend/app.py
```

6. **Access Website**
```
http://localhost:5000
```

---

## Deploy to Hosting

### Option 1: Netlify (Frontend Only)

#### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub account
3. Create new site from Git
4. Select your repository
5. Set build command: Leave empty
6. Set publish directory: `.` (root)
7. Deploy!

#### Connect Custom Domain:
- Go to Domain Settings
- Add your domain
- Follow DNS instructions

### Option 2: Vercel (Frontend)

#### Steps:
1. Go to [vercel.com](https://vercel.com)
2. Import project from Git
3. Deploy
4. Vercel handles everything automatically

### Option 3: GitHub Pages (Frontend Only)

#### Steps:
1. Push code to GitHub
2. Go to Settings -> Pages
3. Select source: Deploy from branch
4. Select `main` branch and `/ (root)`
5. Click Save
6. Website available at: `username.github.io/repo-name`

---

## Backend Deployment

### Option 1: Heroku (Recommended)

#### Prerequisites:
- Heroku account (free)
- Heroku CLI installed
- Git installed

#### Steps:

1. **Create Heroku App**
```bash
heroku login
heroku create your-app-name
```

2. **Create Procfile**
```bash
echo "web: python backend/app.py" > Procfile
```

3. **Create runtime.txt**
```bash
echo "python-3.11.0" > runtime.txt
```

4. **Update requirements.txt**
```bash
pip freeze > backend/requirements.txt
```

5. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

6. **View Logs**
```bash
heroku logs --tail
```

### Option 2: PythonAnywhere

#### Steps:
1. Sign up at [pythonanywhere.com](https://pythonanywhere.com)
2. Upload files via web interface
3. Configure Flask app in web tab
4. Set up WSGI file
5. Enable web app

### Option 3: AWS (Advanced)

#### Requirements:
- AWS account
- EC2 instance
- RDS for database

#### Process:
1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Python and dependencies
4. Upload code
5. Configure Gunicorn & Nginx
6. Use Route 53 for domain
7. Set up CloudFront CDN

#### Commands:
```bash
sudo apt update
sudo apt install python3-pip python3-venv
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
```

### Option 4: DigitalOcean (Recommended for Beginners)

#### Steps:
1. Create Droplet (Ubuntu 20.04 or 22.04)
2. SSH into droplet
3. Install dependencies:
```bash
sudo apt update && sudo apt upgrade
sudo apt install python3-pip python3-venv nginx
```

4. Deploy code:
```bash
git clone your-repo.git
cd your-repo
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

5. Configure Nginx as reverse proxy
6. Use domain registrar to point domain to droplet IP

---

## Frontend + Backend (Full Stack)

### Vercel + Heroku

1. **Deploy Frontend to Vercel** (steps above)
2. **Deploy Backend to Heroku** (steps above)
3. **Update API URL in JavaScript**

In `js/main.js`, update:
```javascript
// Change this:
const response = await fetch('/api/contact', {

// To this:
const response = await fetch('https://your-heroku-app.herokuapp.com/api/contact', {
```

### Firebase + Cloud Run

1. Set up Firebase project
2. Deploy frontend to Firebase Hosting
3. Deploy backend to Cloud Run
4. Update API URLs

---

## Environment Variables

### For Production

Create `.env` file:
```
FLASK_ENV=production
SECRET_KEY=your-very-secure-key-here
DEBUG=False
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

### Update config.py
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = os.environ.get('DEBUG', False)
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    # ... etc
```

---

## Database Backup

### SQLite
```bash
# Backup
sqlite3 backend/data/leads.db ".backup 'backup_leads.db'"

# Restore
sqlite3 backend/data/leads.db ".restore 'backup_leads.db'"
```

### Set up Automatic Backups
```bash
# Create backup script
#!/bin/bash
sqlite3 /path/to/leads.db ".backup '/path/to/backup_$(date +%Y%m%d_%H%M%S).db'"
```

---

## Security Checklist

- [ ] Change DEBUG to False
- [ ] Set strong SECRET_KEY
- [ ] Enable HTTPS
- [ ] Set proper CORS origins
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Use strong database passwords
- [ ] Validate all inputs server-side
- [ ] Use WAF for additional protection

---

## Post-Deployment

### Monitoring
- Set up error logging (Sentry)
- Monitor performance (New Relic, DataDog)
- Track uptime (UptimeRobot)

### Maintenance
- Update dependencies regularly
- Monitor database size
- Check server logs
- Backup database regularly
- Review user submissions

### Analytics
- Set up Google Analytics
- Track conversions
- Monitor user behavior
- Analyze traffic sources

---

## Performance Optimization

### CDN (Content Delivery)
- Use CloudFlare
- Cache static assets
- Enable compression

### Database
- Add indexes to frequently queried fields
- Archive old leads
- Use connection pooling

### Code
- Remove console.logs in production
- Minify CSS/JS
- Compress images
- Enable gzip

---

## Troubleshooting

### 500 Internal Server Error
1. Check logs: `heroku logs --tail`
2. Verify database exists
3. Check environment variables
4. Restart app

### Form Not Submitting
1. Verify backend URL is correct
2. Check CORS settings
3. Look at browser console errors
4. Verify database permissions

### Database Locked Error
1. Close all other connections
2. Restart server
3. Check for long-running queries

---

## Support

For deployment issues:
- Check documentation of your hosting provider
- Review error logs carefully
- Ask on Stack Overflow
- Contact hosting support

---

**Last Updated**: March 2024
**Version**: 1.0
