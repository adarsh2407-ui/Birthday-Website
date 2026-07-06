# Deployment Guide

This guide will help you deploy the Birthday Website to production.

## Pre-Deployment Checklist

- [ ] Update `data/config.js` with the correct password
- [ ] Verify all photo paths in `data/config.js` point to valid images
- [ ] Test all audio and video files play correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS and Android)
- [ ] Verify all scenes load without console errors
- [ ] Check that the password protection works

## Deployment Steps

### Option 1: Static Hosting (Recommended)
Deploy to services like:
- **Netlify** - Drag & drop the Birthday-Website folder
- **GitHub Pages** - Push to a gh-pages branch
- **Vercel** - Connect your Git repo
- **Firebase Hosting** - Use Firebase CLI

### Option 2: Traditional Web Server (Apache/Nginx)

**For Apache:**
1. Upload the Birthday-Website folder to your web server
2. Include the `.htaccess` file for proper headers
3. Ensure `mod_rewrite` is enabled
4. Set proper file permissions (755 for directories, 644 for files)

**For Nginx:**
1. Copy the Birthday-Website folder to your web root
2. Add the following server block to your nginx config:
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    root /var/www/birthday-website;
    index index.html;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Serve index.html for SPA routing
    location / {
        try_files $uri /index.html;
    }
    
    # Disable caching for HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
    }
}
```

### Option 3: Local Deployment
1. Open `index.html` directly in a browser (works for local viewing)
2. Note: Some browsers may block autoplay on audio - test with intended browser

## Security Notes

- The password is stored in plain text in `data/config.js` - this is acceptable for client-side verification only
- The website uses HTTPS by default on most hosting platforms (highly recommended)
- No sensitive data is sent to external servers (except Google Fonts CDN)
- All scripts are inline or from trusted CDNs

## Performance Optimization

The site includes:
- Optimized asset loading with preconnect hints
- Lazy loading of components
- Efficient animation timing
- Minimal dependencies (only canvas-confetti from CDN)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Audio not playing:**
- Check that `assets/music/track1.mp3` exists and is valid
- Some browsers block autoplay - user must click play button first
- Verify file format is supported (MP3 recommended)

**Images not loading:**
- Verify all paths in `data/config.js` are correct
- Check that image files exist in `assets/images/`
- Ensure proper MIME types on server

**Scenes not loading:**
- Check browser console for JavaScript errors
- Verify all component files are present
- Test with different browser

**Password not working:**
- Ensure `data/config.js` password is correct
- Check for extra spaces or special characters
- Verify password field is focused before entering

## Maintenance

After deployment:
- Monitor for JavaScript errors in production (use error tracking service)
- Test regularly on different devices
- Keep external libraries updated (canvas-confetti)
- Backup your content files

## File Structure for Deployment

```
birthday-website/
├── index.html
├── style.css
├── script.js
├── .htaccess (for Apache servers)
├── data/
│   ├── config.js
│   ├── memories.js
│   ├── reasons.js
│   ├── timeline.js
│   └── messages.js
├── components/
│   ├── envelope.js
│   ├── storybook.js
│   ├── constellation.js
│   ├── garden.js
│   ├── gallery.js
│   ├── timeline.js
│   ├── reasons.js
│   ├── games.js
│   ├── countdown.js
│   └── finale.js
└── assets/
    ├── images/
    │   ├── photo1.jpg
    │   ├── photo2.jpg
    │   └── photo3.jpg
    ├── music/
    │   ├── track1.mp3
    │   └── voice1.mp3
    ├── videos/
    │   └── memory1.mp4
    ├── fonts/
    ├── icons/
    └── videos/
```

## Next Steps

1. Choose your hosting platform
2. Review and update `data/config.js` with personalization
3. Test thoroughly before sharing the link
4. Share the deployed URL with the intended recipient!

Enjoy your beautiful birthday experience! 🎂✨
