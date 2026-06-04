const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve images from the image directory
const imageDir = process.env.IMAGE_DIR || '/app/images';
app.use('/images', express.static(imageDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HPC Docs Backend is running' });
});

// Get list of available images
app.get('/api/images', (req, res) => {
  try {
    if (!fs.existsSync(imageDir)) {
      return res.json({ images: [] });
    }
    const files = fs.readdirSync(imageDir).filter(f =>
      /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f)
    );
    res.json({ images: files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Serving images from: ${imageDir}`);
});
