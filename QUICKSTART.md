# Quick Start Guide 🚀

This guide will help you deploy your Teachable Machine model and integrate it with Adalo in under 10 minutes!

## Step 1: Test Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Visit `http://localhost:3000/predict` to test the model with your images!

## Step 2: Deploy to Heroku (Easiest Option)

### Prerequisites
- [Heroku account](https://signup.heroku.com/) (free tier available)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed

### Deploy Commands

```bash
# Login to Heroku
heroku login

# Create a new Heroku app (choose a unique name)
heroku create your-unique-app-name

# Deploy your code
git push heroku main

# Open your app
heroku open
```

Your API will be live at: `https://your-unique-app-name.herokuapp.com`

## Step 3: Integrate with Adalo

### Option A: WebView Component (Easiest)

1. In Adalo, add a **Web View** component to your screen
2. Set the URL to: `https://your-app-name.herokuapp.com/predict`
3. Done! Users can now upload images and get predictions

### Option B: Custom Integration

1. In Adalo, go to **Data** → **External Collections**
2. Create a new collection named "AI Predictions"
3. Set base URL to: `https://your-app-name.herokuapp.com`
4. The model loads client-side, so you can use the WebView or build a custom integration

## Testing Your Deployment

After deployment, test these URLs:

- **API Info**: `https://your-app-name.herokuapp.com/`
- **Interactive Predictions**: `https://your-app-name.herokuapp.com/predict`
- **Testing Interface**: `https://your-app-name.herokuapp.com/test`

## Alternative Deployment Options

### Render (Free)
1. Sign up at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Render auto-detects Node.js and deploys!

### Railway (Free)
1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select this repository
4. Railway auto-deploys!

### Vercel (Free)
```bash
npm install -g vercel
vercel
```

## Common Issues

### "Application Error" on Heroku
- Check logs: `heroku logs --tail`
- Ensure you pushed the code: `git push heroku main`

### Model Not Loading
- Check that the model URL is accessible: `https://teachablemachine.withgoogle.com/models/3YsHajZDm/`
- Open browser console for error messages

### WebView Not Working in Adalo
- Make sure you're using the `/predict` endpoint
- Check that your deployment URL is correct and accessible

## What's Included

✅ Interactive prediction interface with upload and webcam support  
✅ Fully responsive design  
✅ Client-side AI processing (works on any hosting platform)  
✅ CORS enabled for cross-origin requests  
✅ Ready for Adalo integration  
✅ Beautiful UI with real-time predictions  

## Next Steps

1. **Customize the UI**: Edit `public/predict.html` to match your brand
2. **Change the Model**: Update `MODEL_URL` in `server.js` and `public/predict.html`
3. **Add Features**: Implement user authentication, save predictions to database, etc.
4. **Add Rate Limiting**: For production, add rate limiting (see README.md)

## Support

If you run into issues:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide for detailed instructions
2. Review the [ADALO_INTEGRATION.md](ADALO_INTEGRATION.md) for Adalo-specific help
3. Test your deployment using the `/test` endpoint

---

**Tip**: Bookmark your deployment URL so you can easily share it or use it in your Adalo app!
