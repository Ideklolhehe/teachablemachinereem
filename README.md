# Teachable Machine API for Adalo

This project provides a ready-to-deploy web application that wraps your Teachable Machine model, making it easy to integrate AI-powered image classification into Adalo or any other app.

**Your Model**: [https://teachablemachine.withgoogle.com/models/3YsHajZDm/](https://teachablemachine.withgoogle.com/models/3YsHajZDm/)

## ✨ Features

- 🎯 **Interactive Prediction Interface** - Upload images or use webcam for real-time predictions
- 📱 **Adalo Ready** - Can be embedded as a WebView in your Adalo app
- 🌐 **Cloud Deployable** - Works on Heroku, Render, Railway, Vercel, and more
- 🎨 **Beautiful UI** - Modern, responsive design with visual feedback
- 🔒 **Secure** - File cleanup, CORS support, and production-ready configuration
- ⚡ **Fast** - Client-side AI processing means no server bottlenecks

## 🚀 Quick Start

**New to this?** Check out the [Quick Start Guide](QUICKSTART.md) for a 10-minute setup!

### Prerequisites
- Node.js 14 or higher
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/Ideklolhehe/teachablemachinereem.git
cd teachablemachinereem
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 🧪 Testing the API

Visit `http://localhost:3000/test` in your browser to use the interactive testing interface. You can upload images and see predictions in real-time.

## 📡 API Endpoints

### GET /
Returns API status and available endpoints.

**Response:**
```json
{
  "status": "online",
  "message": "Teachable Machine API is running",
  "modelUrl": "https://teachablemachine.withgoogle.com/models/3YsHajZDm/",
  "endpoints": {
    "health": "GET /",
    "predict": "POST /predict",
    "predictUrl": "POST /predict-url",
    "test": "GET /test"
  }
}
```

### POST /predict
Accepts an image file and returns predictions.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `image` (file)

**Example using curl:**
```bash
curl -X POST -F "image=@/path/to/image.jpg" http://localhost:3000/predict
```

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "className": "Class 1",
      "probability": 0.95
    },
    {
      "className": "Class 2",
      "probability": 0.05
    }
  ],
  "topPrediction": {
    "className": "Class 1",
    "probability": 0.95
  }
}
```

### POST /predict-url
Accepts an image URL or base64 encoded image and returns predictions.

**Request:**
- Method: POST
- Content-Type: application/json
- Body:
```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```
OR
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
Same as `/predict` endpoint

## 📱 Integrating with Adalo

### Option 1: Deploy to a Cloud Service

1. **Deploy to Heroku:**
   ```bash
   # Install Heroku CLI
   # Login to Heroku
   heroku login
   
   # Create a new Heroku app
   heroku create your-app-name
   
   # Deploy
   git push heroku main
   ```

2. **Deploy to Render, Railway, or other platforms:**
   - Connect your GitHub repository
   - Set the build command: `npm install`
   - Set the start command: `npm start`
   - Deploy!

### Option 2: Use in Adalo

Once deployed, you can integrate with Adalo using the Custom API feature:

1. **In Adalo:**
   - Go to your app's API settings
   - Add a new API collection
   - Set the base URL to your deployed API (e.g., `https://your-app.herokuapp.com`)

2. **Create an API Request:**
   - Method: POST
   - Endpoint: `/predict-url`
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "imageUrl": "{{image_url}}"
   }
   ```

3. **Use the Response:**
   - The API returns predictions that you can display in your Adalo app
   - Access `topPrediction.className` for the most likely class
   - Access `topPrediction.probability` for the confidence level

### Example Adalo Integration Flow

1. User uploads an image in your Adalo app
2. Adalo sends the image URL to your API endpoint
3. API processes the image through the Teachable Machine model
4. API returns predictions
5. Display results in your Adalo app

## 🔧 Configuration

### Changing the Model

To use a different Teachable Machine model, update the `MODEL_URL` in `server.js`:

```javascript
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';
```

### Port Configuration

Set the PORT environment variable to use a different port:
```bash
PORT=8080 npm start
```

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

### Project Structure
```
teachablemachinereem/
├── server.js          # Main API server
├── package.json       # Dependencies and scripts
├── public/
│   └── test.html     # Testing interface
├── uploads/          # Temporary upload directory (auto-created)
└── README.md         # This file
```

## 📝 API Response Format

All prediction endpoints return a consistent JSON format:

```json
{
  "success": true,
  "predictions": [
    {
      "className": "string",
      "probability": 0.0-1.0
    }
  ],
  "topPrediction": {
    "className": "string",
    "probability": 0.0-1.0
  }
}
```

On error:
```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

## 🔒 Security Notes

- The API accepts images up to 10MB in size
- CORS is enabled for all origins (configure in `server.js` for production)
- Uploaded files are automatically deleted after processing
- **IMPORTANT for Production**: Add rate limiting to prevent abuse. Recommended packages:
  - `express-rate-limit` for general rate limiting
  - `express-slow-down` to slow down repeated requests
  
  Example:
  ```javascript
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/upload', limiter);
  ```
- Consider adding authentication for production apps (API keys, OAuth, etc.)

## 📄 License

MIT

## 🤝 Support

If you encounter any issues:
1. Check that all dependencies are installed
2. Verify the Teachable Machine model URL is accessible
3. Check the server logs for error messages
4. Ensure you have Node.js 14 or higher installed

## 🌟 Features

- ✅ REST API wrapper for Teachable Machine models
- ✅ Support for file uploads and URL/base64 images
- ✅ Interactive web-based testing interface
- ✅ CORS enabled for cross-origin requests
- ✅ Easy deployment to cloud platforms
- ✅ Compatible with Adalo and other no-code platforms