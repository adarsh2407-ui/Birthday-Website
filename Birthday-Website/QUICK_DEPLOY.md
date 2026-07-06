# Quick Start Deployment Guide

Choose your hosting platform and follow the steps below.

## 🚀 Fastest: Netlify (2 minutes)

1. Go to https://app.netlify.com/drop
2. Drag and drop the `Birthday-Website` folder
3. Done! Get your live URL instantly

## 🎯 Best for GitHub Users: GitHub Pages (5 minutes)

1. Push your code to GitHub:
   ```bash
   git init
   git add Birthday-Website
   git commit -m "Birthday website"
   git remote add origin https://github.com/YOUR-USERNAME/birthday.git
   git branch -M main
   git push -u origin main
   ```

2. Go to Settings → Pages → Source → Deploy from branch → Select main
3. Share your URL: `https://YOUR-USERNAME.github.io/birthday/`

## ⚡ Alternative: Vercel (3 minutes)

1. Go to https://vercel.com/new
2. Import your GitHub/GitLab repository
3. Select `Birthday-Website` as root directory
4. Click Deploy
5. Get your live URL

## 🔥 Alternative: Firebase Hosting (5 minutes)

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize and deploy:
   ```bash
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 📱 Self-Hosted: Upload to Your Server

### Via FTP/SFTP:
1. Connect to your server using FTP client (FileZilla, WinSCP)
2. Navigate to web root (usually `public_html` or `www`)
3. Upload `Birthday-Website` folder contents
4. Ensure `.htaccess` file is included

### Via SSH/Terminal:
```bash
scp -r Birthday-Website/* username@server:/var/www/html/birthday/
```

### Via cPanel (if available):
1. Login to cPanel
2. File Manager → Navigate to public_html
3. Upload folder
4. Extract if zipped

## ✅ Post-Deployment Testing

After uploading:
1. Open your URL in a browser
2. Wait for loading screen (0.9s)
3. Try entering password: `Suhana2407`
4. Navigate through scenes with arrows
5. Click music button to play audio
6. Check console (F12) for errors

## 🎨 Customize Before Deployment

Edit `Birthday-Website/data/config.js`:
```javascript
window.CONFIG = {
  girlName: 'Suhani',          // Her name
  nickname: 'Mote',            // Nickname
  myName: 'Adarsh',            // Your name
  password: 'Suhana2407',       // Change this!
  birthday: '2026-07-07T00:00:00',  // Birthday date
  anniversary: '2018-07-05',    // Anniversary date
  // Update photo/video/music paths...
};
```

## 🔐 Change Password

1. Edit `Birthday-Website/data/config.js`
2. Change this line:
   ```javascript
   password: 'YourNewPassword'
   ```
3. Save and redeploy
4. No special characters needed!

## 🎵 Add Your Music

1. Replace or add to: `assets/music/track1.mp3`
2. Update in `data/config.js`:
   ```javascript
   favoriteSong: 'assets/music/track1.mp3'
   ```

## 📸 Add Your Photos

1. Add photos to: `Birthday-Website/assets/images/`
2. Update paths in `data/config.js`:
   ```javascript
   photoPaths: [
     'assets/images/photo1.jpg',
     'assets/images/photo2.jpg',
     'assets/images/photo3.jpg'
   ]
   ```

## 🎬 Add Your Videos

1. Add video to: `Birthday-Website/assets/videos/memory1.mp4`
2. Update in `data/config.js`:
   ```javascript
   videoPaths: ['assets/videos/memory1.mp4']
   ```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Password doesn't work | Check for spaces, refresh page |
| No music playing | Click music button, allow autoplay |
| Photos not showing | Verify file paths in config.js |
| Scenes won't load | Clear browser cache (Ctrl+Shift+Del) |
| Mobile looks weird | Test in Chrome mobile view (F12) |

## 📊 Deployment Comparison

| Platform | Setup Time | Cost | Best For |
|----------|-----------|------|----------|
| Netlify | 2 min | Free | Easiest, recommended |
| GitHub Pages | 5 min | Free | Code versioning |
| Vercel | 3 min | Free | Next.js projects |
| Firebase | 5 min | Free tier | Google ecosystem |
| Custom Server | 10 min | Varies | Full control |

## 🎁 Share Your Link

Once deployed, share the URL with special someone! 

**Pro tip:** Send them the password via text/message separately, not in the URL 😉

---

For detailed guides, see `DEPLOYMENT.md`
