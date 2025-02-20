<div align="center">

# AsciiCam Live 📷

### Transform Your World Into ASCII Art, Instantly

[Try it Now!](https://avil-xd.github.io/AsciiCam-Live/)

![AsciiCam Live Demo](./demo.gif)

Turn your webcam feed into stunning ASCII art in real-time. No installation, no signup - just instant artistic transformation.

[![Made with JavaScript](https://img.shields.io/badge/Made_with-JavaScript-yellow.svg)](https://javascript.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-green.svg)](https://avil-xd.github.io/AsciiCam-Live/)

</div>

---

## ✨ Instant Art Creation

1. 📱 Open [AsciiCam Live](https://avil-xd.github.io/AsciiCam-Live/) on any device
2. 🎥 Allow camera access
3. 🎨 Customize your ASCII art with simple controls
4. 💾 Save your creation with one click

## 🚀 Features

- **Real-time Conversion**: Instant webcam to ASCII transformation
- **Multiple Styles**: Choose from various character sets
- **Easy Controls**: Adjust grid size, contrast, and brightness
- **Mobile Ready**: Works perfectly on phones and tablets
- **Private & Secure**: All processing happens in your browser
- **Zero Install**: Just open and create
- **Instant Save**: Download your art as PNG images

## 🎮 Quick Start

Visit [https://avil-xd.github.io/AsciiCam-Live/] or run locally:

1. Clone the repository
```bash
git clone https://github.com/yourusername/ascii-cam-live.git
cd ascii-cam-live
```

2. Serve the files using any HTTP server, for example:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Open your browser and navigate to `http://localhost:8000`

## How It Works

- Captures webcam input using the `getUserMedia` API
- Processes frames through a canvas for downsampling
- Converts pixel brightness to ASCII characters
- Uses optimized algorithms for real-time performance
- Implements responsive design for all screen sizes

## Controls

- **Character Set**: Choose between different ASCII character sets
- **Grid Size**: Adjust the resolution of the ASCII output
- **Contrast**: Fine-tune the distinction between light and dark areas
- **Brightness**: Adjust the overall brightness of the output
- **Save Image**: Download the current view as a PNG file

## Browser Support

Works on modern browsers that support:
- `getUserMedia` API
- Canvas API
- Web Workers (for performance)
- ES6+ JavaScript features

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## License

MIT License - feel free to use this project however you'd like.
