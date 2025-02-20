// Configuration constants
const CONFIG = {
    CHAR_SETS: {
        basic: '@%#*+=-:. ',
        extended: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ',
        blocks: '▓▒░ ',
        minimal: '■ ',
    },
    LUMINANCE_FACTORS: [0.299, 0.587, 0.114], // RGB luminance factors
    MIN_GRID: 4,
    MAX_GRID: 20,
    MIN_CONTRAST: 50,
    MAX_CONTRAST: 150,
    MIN_BRIGHTNESS: -50,
    MAX_BRIGHTNESS: 50
};

// State management
const state = {
    currentCharSet: CONFIG.CHAR_SETS.extended,
    gridSize: 8,
    contrast: 100,
    brightness: 0,
    isProcessing: false
};

// DOM elements
const video = document.createElement('video');
const asciiOutput = document.getElementById('asciiOutput');
const processingCanvas = document.createElement('canvas');
const ctx = processingCanvas.getContext('2d');

// Initialize webcam with error handling and loading states
async function initCamera() {
    const cameraContainer = document.querySelector('.camera-container');
    cameraContainer.classList.add('loading');
    asciiOutput.textContent = 'Initializing camera...';
    
    try {
        // Request camera with preferred settings
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                aspectRatio: 16/9,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        // Setup video element
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        
        // Wait for video to be ready
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play().then(resolve);
            };
        });

        // Initialize canvas with video dimensions
        const { videoWidth, videoHeight } = video;
        processingCanvas.width = videoWidth;
        processingCanvas.height = videoHeight;
        
        // Start processing frames
        requestAnimationFrame(processFrame);
        cameraContainer.classList.remove('loading');
    } catch (err) {
        console.error('Camera error:', err);
        asciiOutput.textContent = 'Error: Could not access camera.\nPlease ensure camera permissions are granted.';
        cameraContainer.classList.remove('loading');
    }
}

// Process video frames with performance optimization
function processFrame() {
    if (video.readyState !== video.HAVE_ENOUGH_DATA || state.isProcessing) {
        requestAnimationFrame(processFrame);
        return;
    }
    
    state.isProcessing = true;
    
    // Set canvas dimensions based on grid size
    const width = Math.floor(video.videoWidth / state.gridSize);
    const height = Math.floor(video.videoHeight / state.gridSize);
    
    if (processingCanvas.width !== width || processingCanvas.height !== height) {
        processingCanvas.width = width;
        processingCanvas.height = height;
    }
    
    // Draw and process frame
    ctx.drawImage(video, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const ascii = convertToASCII(imageData);
    
    // Update display with RAF for smooth rendering
    requestAnimationFrame(() => {
        asciiOutput.textContent = ascii;
        state.isProcessing = false;
        requestAnimationFrame(processFrame);
    });
}

// Convert image data to ASCII with optimized calculations
function convertToASCII(imageData) {
    const { width, height, data } = imageData;
    const chars = state.currentCharSet;
    const charsLen = chars.length - 1;
    const [rFactor, gFactor, bFactor] = CONFIG.LUMINANCE_FACTORS;
    let result = '';
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            
            // Optimized brightness calculation using correct luminance factors
            let brightness = (
                data[i] * rFactor + 
                data[i + 1] * gFactor + 
                data[i + 2] * bFactor
            ) / 255;
            
            // Apply contrast and brightness with clamping
            brightness = Math.max(0, Math.min(1, 
                ((brightness - 0.5) * (state.contrast / 50)) + 0.5 + 
                (state.brightness / 100)
            ));
            
            result += chars[Math.floor(brightness * charsLen)];
        }
        result += '\n';
    }
    
    return result;
}

// Initialize UI controls with validation and debouncing
function initControls() {
    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    };

    // Character set control
    document.getElementById('charSet').addEventListener('change', (e) => {
        state.currentCharSet = CONFIG.CHAR_SETS[e.target.value];
    });

    // Grid size control with validation
    const updateGridSize = debounce((value) => {
        state.gridSize = Math.max(CONFIG.MIN_GRID, 
            Math.min(CONFIG.MAX_GRID, parseInt(value) || CONFIG.MIN_GRID));
        document.getElementById('gridSizeValue').textContent = state.gridSize;
        document.getElementById('gridSize').value = state.gridSize;
    }, 150);

    document.getElementById('gridSize').addEventListener('input', (e) => updateGridSize(e.target.value));

    // Contrast control with validation
    const updateContrast = debounce((value) => {
        state.contrast = Math.max(CONFIG.MIN_CONTRAST, 
            Math.min(CONFIG.MAX_CONTRAST, parseInt(value) || CONFIG.MIN_CONTRAST));
        document.getElementById('contrastValue').textContent = state.contrast;
        document.getElementById('contrast').value = state.contrast;
    }, 150);

    document.getElementById('contrast').addEventListener('input', (e) => updateContrast(e.target.value));

    // Brightness control with validation
    const updateBrightness = debounce((value) => {
        state.brightness = Math.max(CONFIG.MIN_BRIGHTNESS, 
            Math.min(CONFIG.MAX_BRIGHTNESS, parseInt(value) || 0));
        document.getElementById('brightnessValue').textContent = state.brightness;
        document.getElementById('brightness').value = state.brightness;
    }, 150);

    document.getElementById('brightness').addEventListener('input', (e) => updateBrightness(e.target.value));


    // Download with proper image capture
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const fontSize = parseFloat(getComputedStyle(asciiOutput).fontSize);
        const lineHeight = parseFloat(getComputedStyle(asciiOutput).lineHeight);
        const padding = 20;

        // Set canvas size based on ASCII content
        const lines = asciiOutput.textContent.split('\n');
        canvas.width = lines[0].length * fontSize * 0.6 + padding * 2;
        canvas.height = lines.length * lineHeight + padding * 2;

        // Fill background
        context.fillStyle = getComputedStyle(document.body).backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw ASCII text
        context.font = `${fontSize}px "Fira Code", monospace`;
        context.fillStyle = getComputedStyle(asciiOutput).color;
        context.textBaseline = 'top';

        lines.forEach((line, i) => {
            context.fillText(line, padding, padding + i * lineHeight);
        });

        // Download image
        const link = document.createElement('a');
        link.download = `ascii-art-${new Date().toISOString().slice(0,19)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Start application
document.addEventListener('DOMContentLoaded', () => {
    initCamera();
    initControls();
});
