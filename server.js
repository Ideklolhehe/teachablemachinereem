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

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Teachable Machine API is running',
    modelUrl: MODEL_URL,
    endpoints: {
      health: 'GET /',
      predict: 'GET /predict (interactive prediction page)',
      info: 'GET /info (model information)',
      test: 'GET /test (testing interface)'
    },
    integration: {
      adalo: 'Use the /predict page URL in your Adalo WebView component or integrate directly using the model URL: ' + MODEL_URL
    }
  });
});

// Model info endpoint
app.get('/info', (req, res) => {
  res.json({
    modelUrl: MODEL_URL,
    modelJsonUrl: MODEL_URL + 'model.json',
    metadataUrl: MODEL_URL + 'metadata.json',
    instructions: {
      direct: 'You can use the model URL directly in your application with TensorFlow.js and Teachable Machine library',
      webview: 'Use the /predict endpoint as a WebView in Adalo for a complete prediction interface',
      custom: 'Load the model in your own frontend using @teachablemachine/image library'
    }
  });
});

// Interactive prediction page
app.get('/predict', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'predict.html'));
});

// Test page endpoint
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// Image upload endpoint - converts to base64
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Use the multer-generated path (already sanitized)
    const filePath = req.file.path;
    
    // Read the uploaded file and convert to base64
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = req.file.mimetype || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Image}`;
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      imageUrl: dataUrl,
      message: 'Image uploaded successfully. Use this data URL with the model.'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file on error
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Upload failed', 
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} for API info`);
  console.log(`Visit http://localhost:${PORT}/test for testing interface`);
  console.log(`Visit http://localhost:${PORT}/predict for interactive predictions`);
  console.log(`\nTeachable Machine Model: ${MODEL_URL}`);
});

