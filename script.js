const video = document.createElement('video');
const asciiOutput = document.getElementById('asciiOutput');
const CHAR_SETS = {
    basic: '@%#*+=-:. ',
    extended: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ',
    blocks: '▓▒░ ',
    minimal: '■ ',
};
let isColor = false;
let currentCharSet = CHAR_SETS.extended;
let gridSize = 8;
let contrast = 100;
let brightness = 0;

// Initialize webcam
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(processFrame);
    } catch (err) {
        console.error('Error accessing camera:', err);
    }
}

// Process video frames
function processFrame() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions based on grid size
        const width = Math.floor(video.videoWidth / gridSize);
        const height = Math.floor(video.videoHeight / gridSize);
        canvas.width = width;
        canvas.height = height;
        
        // Draw video frame
        ctx.drawImage(video, 0, 0, width, height);
        
        // Get image data and convert to ASCII
        const imageData = ctx.getImageData(0, 0, width, height);
        const ascii = convertToASCII(imageData);
        asciiOutput.textContent = ascii;
    }
    requestAnimationFrame(processFrame);
}

// Convert image data to ASCII
function convertToASCII(imageData) {
    let ascii = '';
    const chars = currentCharSet;
    
    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            const index = (y * imageData.width + x) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            
            // Calculate brightness with contrast and brightness adjustments
            let brightnessValue = (0.34 * r + 0.5 * g + 0.16 * b) / 255;
            brightnessValue = ((brightnessValue - 0.5) * (contrast / 50)) + 0.5 + (brightness / 100);
            brightnessValue = Math.min(Math.max(brightnessValue, 0), 1);
            
            // Map brightness to character
            const charIndex = Math.floor(brightnessValue * (chars.length - 1));
            ascii += chars[charIndex];
        }
        ascii += '\n';
    }
    return ascii;
}

// Initialize UI controls
function initControls() {
    document.getElementById('charSet').addEventListener('change', (e) => {
        currentCharSet = CHAR_SETS[e.target.value];
    });

    document.getElementById('gridSize').addEventListener('input', (e) => {
        gridSize = e.target.value;
        document.getElementById('gridSizeValue').textContent = gridSize;
    });

    document.getElementById('contrast').addEventListener('input', (e) => {
        contrast = e.target.value;
        document.getElementById('contrastValue').textContent = contrast;
    });

    document.getElementById('brightness').addEventListener('input', (e) => {
        brightness = e.target.value;
        document.getElementById('brightnessValue').textContent = brightness;
    });

    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('theme-light');
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        const dataUrl = document.createElement('canvas').toDataURL();
        const link = document.createElement('a');
        link.download = 'ascii-art.png';
        link.href = dataUrl;
        link.click();
    });
}

// Start application
document.addEventListener('DOMContentLoaded', () => {
    initCamera();
    initControls();
});
