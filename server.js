const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Teachable Machine model URL
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/3YsHajZDm/';

// Store model in memory (loaded on first request)
let tmImage = null;
let model = null;
let metadata = null;

// Load the Teachable Machine model
async function loadModel() {
  if (model) return; // Already loaded
  
  try {
    console.log('Loading Teachable Machine model...');
    tmImage = require('@teachablemachine/image');
    
    const modelURL = MODEL_URL + 'model.json';
    const metadataURL = MODEL_URL + 'metadata.json';
    
    model = await tmImage.load(modelURL, metadataURL);
    metadata = model.getMetadata();
    
    console.log('Model loaded successfully!');
    console.log('Model classes:', metadata);
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Teachable Machine API is running',
    modelUrl: MODEL_URL,
    endpoints: {
      health: 'GET /',
      predict: 'POST /predict',
      predictUrl: 'POST /predict-url',
      test: 'GET /test'
    }
  });
});

// Test page endpoint
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// Prediction endpoint - accepts image file
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Load model if not already loaded
    await loadModel();

    // Load and predict
    const tf = require('@tensorflow/tfjs-node');
    const imageBuffer = fs.readFileSync(req.file.path);
    const tfimage = tf.node.decodeImage(imageBuffer);
    
    const predictions = await model.predict(tfimage);
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    // Format predictions
    const results = predictions.map(p => ({
      className: p.className,
      probability: p.probability
    }));
    
    // Sort by probability
    results.sort((a, b) => b.probability - a.probability);
    
    res.json({
      success: true,
      predictions: results,
      topPrediction: results[0]
    });
    
  } catch (error) {
    console.error('Prediction error:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Prediction failed', 
      details: error.message 
    });
  }
});

// Prediction endpoint - accepts image URL or base64
app.post('/predict-url', async (req, res) => {
  try {
    const { imageUrl, imageBase64 } = req.body;
    
    if (!imageUrl && !imageBase64) {
      return res.status(400).json({ 
        error: 'Either imageUrl or imageBase64 must be provided' 
      });
    }

    // Load model if not already loaded
    await loadModel();

    const tf = require('@tensorflow/tfjs-node');
    let tfimage;
    
    if (imageBase64) {
      // Handle base64 image
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, 'base64');
      tfimage = tf.node.decodeImage(imageBuffer);
    } else {
      // Handle URL
      const https = require('https');
      const http = require('http');
      
      const imageBuffer = await new Promise((resolve, reject) => {
        const client = imageUrl.startsWith('https') ? https : http;
        client.get(imageUrl, (response) => {
          const chunks = [];
          response.on('data', (chunk) => chunks.push(chunk));
          response.on('end', () => resolve(Buffer.concat(chunks)));
          response.on('error', reject);
        }).on('error', reject);
      });
      
      tfimage = tf.node.decodeImage(imageBuffer);
    }
    
    const predictions = await model.predict(tfimage);
    
    // Format predictions
    const results = predictions.map(p => ({
      className: p.className,
      probability: p.probability
    }));
    
    // Sort by probability
    results.sort((a, b) => b.probability - a.probability);
    
    res.json({
      success: true,
      predictions: results,
      topPrediction: results[0]
    });
    
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Prediction failed', 
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} for API info`);
  console.log(`Visit http://localhost:${PORT}/test for testing interface`);
});
