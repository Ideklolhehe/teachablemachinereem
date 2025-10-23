# Adalo Integration Guide

This guide will help you integrate your Teachable Machine model with your Adalo app.

## Prerequisites

1. ✅ Your API is deployed (see DEPLOYMENT.md)
2. ✅ You have an Adalo account and an app created
3. ✅ You know your deployed API URL (e.g., `https://your-app.herokuapp.com`)

## Step-by-Step Integration

### Step 1: Set Up External Collection in Adalo

1. Open your Adalo app
2. Go to **Data** → **External Collections**
3. Click **+ New Collection**
4. Name it: "TeachableMachine"

### Step 2: Configure API Connection

1. In the External Collection settings:
   - **Base URL**: `https://your-deployed-api-url.com`
   - **Authentication**: None (or add if you implement auth)

### Step 3: Create Prediction Action

1. Click **+ New Request**
2. Configure:
   - **Name**: "Predict Image"
   - **Method**: POST
   - **Endpoint**: `/predict-url`
   - **Headers**:
     ```
     Content-Type: application/json
     ```

3. **Request Body** (select JSON):
   ```json
   {
     "imageUrl": "{{imageUrl}}"
   }
   ```

4. **Response Mapping**:
   - Map `success` to Boolean
   - Map `topPrediction.className` to Text
   - Map `topPrediction.probability` to Number
   - Map `predictions` to List (if you want all predictions)

### Step 4: Use in Your Adalo App

#### Option A: With Image Upload

1. **Add Image Upload component** to your screen
2. **Add Button** to trigger prediction
3. **Configure Button Action**:
   - Action: "Custom Action"
   - Collection: "TeachableMachine"
   - Request: "Predict Image"
   - Set `imageUrl` to: Logged-in User > Profile Image (or wherever your image is stored)

4. **Display Results**:
   - Add Text components to show:
     - `TeachableMachine > topPrediction > className`
     - `TeachableMachine > topPrediction > probability`

#### Option B: With Camera

1. **Add Camera component** to your screen
2. **Add Button** labeled "Analyze Photo"
3. **Configure Button Action**:
   - Action: "Custom Action"
   - Collection: "TeachableMachine"
   - Request: "Predict Image"
   - Set `imageUrl` to: Camera > Photo URL

4. **Display Results** as above

## Example Use Cases

### 1. Image Classification App

```
Screen: Image Upload
├── Image Picker Component
├── Button: "Classify Image"
│   └── Action: Call TeachableMachine API
└── Results Display
    ├── Text: "Result: {className}"
    └── Text: "Confidence: {probability}%"
```

### 2. Real-time Camera Analysis

```
Screen: Camera View
├── Camera Component
├── Button: "Capture & Analyze"
│   └── Action: Call TeachableMachine API
└── Results Overlay
    └── Text: "{className} ({probability}%)"
```

### 3. Multi-Image Comparison

```
Screen: Batch Analysis
├── List of Images
├── Button: "Analyze All"
│   └── Action: Loop through images, call API
└── Results List
    └── Each item shows image + prediction
```

## Advanced Configuration

### Handling Multiple Predictions

If you want to show all predictions (not just the top one):

1. In Response Mapping, map `predictions` as a **List**
2. Create a **List** component in Adalo
3. Set the list source to `TeachableMachine > predictions`
4. For each list item, show:
   - `className`
   - `probability` (multiply by 100 for percentage)

### Adding Loading State

1. Create a **Visibility Condition** on a Loading component
2. Set it to show when the API request is in progress
3. Hide results until the request completes

### Error Handling

1. Check `success` field in the response
2. Show error message if `success` is false
3. Display `error` field content to user

## Sample Adalo Flow

```
User Flow:
1. User opens app
2. User taps "Take Photo" button
3. Camera opens
4. User takes photo
5. Photo is saved
6. API is called with photo URL
7. Loading spinner shows
8. Results are displayed:
   - Main prediction
   - Confidence percentage
   - Optional: All predictions
9. User can take another photo or save results
```

## API Request Examples

### Using cURL (for testing)

```bash
# Test with image URL
curl -X POST https://your-app.com/predict-url \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://example.com/image.jpg"}'

# Test with file upload
curl -X POST https://your-app.com/predict \
  -F "image=@/path/to/image.jpg"
```

### Using JavaScript (for custom Adalo components)

```javascript
const predictImage = async (imageUrl) => {
  const response = await fetch('https://your-app.com/predict-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl: imageUrl })
  });
  
  const data = await response.json();
  return data;
};
```

## Troubleshooting

### "API request failed"
- ✓ Check that your API is deployed and running
- ✓ Test the API directly in browser: `https://your-app.com/`
- ✓ Verify the image URL is publicly accessible

### "No predictions returned"
- ✓ Ensure the image format is supported (jpg, png)
- ✓ Check that the image is not corrupted
- ✓ Verify the Teachable Machine model is working (use /test endpoint)

### "CORS error"
- ✓ The API has CORS enabled by default
- ✓ If issues persist, check your deployment platform's settings

### Slow predictions
- ✓ First prediction may take longer (model loading)
- ✓ Subsequent predictions should be faster
- ✓ Consider upgrading your hosting plan for better performance

## Best Practices

1. **Image Size**: Resize images before uploading for faster processing
2. **Caching**: Store results to avoid re-processing the same image
3. **User Feedback**: Always show loading states and error messages
4. **Rate Limiting**: Consider implementing rate limiting on your API
5. **Authentication**: Add API key authentication for production apps

## Need Help?

- Test your API at: `https://your-app.com/test`
- Check API status at: `https://your-app.com/`
- Review server logs in your deployment platform
- Make sure the Teachable Machine model URL is correct

## Example Adalo App Structure

```
App Navigation:
├── Home Screen
│   ├── Welcome message
│   └── "Start Analyzing" button
├── Camera Screen
│   ├── Camera component
│   ├── "Capture" button
│   └── Preview image
├── Results Screen
│   ├── Image display
│   ├── Top prediction (large text)
│   ├── Confidence meter
│   ├── All predictions list
│   └── "Analyze Another" button
└── History Screen
    └── List of past predictions
```

## Resources

- [Adalo External Collections Documentation](https://help.adalo.com/integrations/external-collections)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [Your API Test Interface](https://your-app.com/test)

---

**Ready to integrate?** Start with Step 1 and follow each step carefully. Test your API first using the `/test` endpoint to ensure it's working properly!
