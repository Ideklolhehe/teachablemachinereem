# Deployment Guide

## Deploy to Heroku

1. **Install Heroku CLI** (if not already installed):
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app:**
   ```bash
   heroku create your-teachable-machine-api
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Open your app:**
   ```bash
   heroku open
   ```

Your API will be available at: `https://your-teachable-machine-api.herokuapp.com`

## Deploy to Render

1. **Sign up at [render.com](https://render.com)**

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Name: teachable-machine-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Deploy!**

Your API will be available at: `https://your-app.onrender.com`

## Deploy to Railway

1. **Sign up at [railway.app](https://railway.app)**

2. **Create a new project:**
   - Connect your GitHub repository
   - Railway will auto-detect Node.js

3. **Deploy!**

Your API will be available at your Railway-generated URL.

## Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts**

Note: For Vercel, you may need to adjust the server code to work with serverless functions.

## Deploy to DigitalOcean App Platform

1. **Sign up at [digitalocean.com](https://www.digitalocean.com/products/app-platform)**

2. **Create a new App:**
   - Connect your GitHub repository
   - Select Node.js
   - Build Command: `npm install`
   - Run Command: `npm start`

3. **Deploy!**

## Environment Variables

If you need to set environment variables (like PORT or API keys), configure them in your deployment platform's dashboard:

- Heroku: `heroku config:set VARIABLE_NAME=value`
- Render: Settings → Environment
- Railway: Variables tab
- Vercel: Project Settings → Environment Variables

## Testing Your Deployment

After deployment, test your API:

1. **Visit the root URL:**
   ```
   https://your-app-url.com/
   ```

2. **Test the prediction endpoint:**
   ```bash
   curl -X POST -F "image=@test-image.jpg" https://your-app-url.com/predict
   ```

3. **Use the test interface:**
   ```
   https://your-app-url.com/test
   ```

## Troubleshooting

### Build Failures
- Ensure Node.js version is 14 or higher
- Check that all dependencies in package.json are correct

### Runtime Errors
- Check application logs in your platform's dashboard
- Verify the Teachable Machine model URL is accessible

### CORS Issues
- The API has CORS enabled by default
- If issues persist, check the CORS configuration in server.js

## Monitoring

Most platforms provide built-in monitoring:
- Heroku: `heroku logs --tail`
- Render: Logs tab
- Railway: Deployments → Logs
- Vercel: Deployments → View Logs
