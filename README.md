# AsciiCam Live 📷

Real-time ASCII art camera that converts webcam input into dynamic ASCII art, with customizable settings and effects. Built with pure JavaScript, no backend required.

![AsciiCam Live Demo](./demo.gif)

## Features

- 🎥 Real-time webcam to ASCII conversion
- 🎨 Multiple character sets (Extended, Basic, Blocks, Minimal)
- 🔧 Adjustable grid size, contrast, and brightness
- 📱 Responsive design (works on desktop and mobile)
- 💾 Save ASCII art as PNG images
- ⚡ Optimized performance with WebGL/Canvas
- 🌐 Works offline - no internet required after load
- 🔒 Privacy focused - all processing happens locally

## Try It Out

Visit [GitHub Pages Link] or run locally:

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

## Author

[Your Name] - [Your Website/GitHub Profile]

---
