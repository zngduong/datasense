// QR Code Scanner Script
let html5QrcodeScanner = null;
let isScanning = false;
let scannedResults = [];

// DOM Elements
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const fileInput = document.getElementById('fileInput');
const resultsList = document.getElementById('resultsList');
const clearResultsBtn = document.getElementById('clearResults');
const scannerInstruction = document.getElementById('scannerInstruction');
const cameraSelector = document.getElementById('cameraSelector');
const cameraSelect = document.getElementById('cameraSelect');
const scannerBox = document.querySelector('.scanner-box');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved results from localStorage
    loadSavedResults();

    // Event listeners
    startButton.addEventListener('click', startScanning);
    stopButton.addEventListener('click', stopScanning);
    fileInput.addEventListener('change', handleFileUpload);
    clearResultsBtn.addEventListener('click', clearAllResults);

    // Get available cameras
    getCameras();
});

// Get available cameras
async function getCameras() {
    try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length > 0) {
            let backCameraIndex = -1;

            devices.forEach((device, index) => {
                const option = document.createElement('option');
                option.value = device.id;
                option.text = device.label || `Camera ${index + 1}`;
                cameraSelect.appendChild(option);

                // Find back/rear camera (environment-facing camera)
                const label = (device.label || '').toLowerCase();
                if (label.includes('back') || label.includes('rear') || label.includes('environment')) {
                    backCameraIndex = index;
                }
            });

            // If we found a back camera, select it as default
            // Otherwise, on mobile, the last camera is usually the back camera
            if (backCameraIndex !== -1) {
                cameraSelect.selectedIndex = backCameraIndex;
            } else if (devices.length > 1) {
                // On most mobile devices, back camera is the last one
                cameraSelect.selectedIndex = devices.length - 1;
            }

            if (devices.length > 1) {
                cameraSelector.style.display = 'block';
            }
        }
    } catch (err) {
        console.error('Error getting cameras:', err);
    }
}

// Start scanning
async function startScanning() {
    if (isScanning) return;

    try {
        // Show loading state
        startButton.innerHTML = '<span class="loading"></span> Đang khởi động...';
        startButton.disabled = true;

        // Hide instruction
        scannerInstruction.classList.add('hidden');

        // Get selected camera or use back camera (environment-facing)
        // Always prefer back camera on mobile devices
        let cameraId;
        if (cameraSelect.value) {
            cameraId = cameraSelect.value;
        } else {
            // Use environment-facing (back) camera as default
            cameraId = { facingMode: "environment" };
        }

        // Initialize scanner
        html5QrcodeScanner = new Html5Qrcode("reader");

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
        };

        try {
            await html5QrcodeScanner.start(
                cameraId,
                config,
                onScanSuccess,
                onScanError
            );
        } catch (err) {
            // If environment camera fails, try with any available camera
            console.warn('Failed to start with environment camera, trying default:', err);
            await html5QrcodeScanner.start(
                { facingMode: "user" }, // Fallback to front camera
                config,
                onScanSuccess,
                onScanError
            );
        }

        isScanning = true;
        startButton.style.display = 'none';
        stopButton.style.display = 'flex';

    } catch (err) {
        console.error('Error starting scanner:', err);
        showNotification('Không thể khởi động camera. Vui lòng kiểm tra quyền truy cập.', 'error');
        resetButtons();
    }
}

// Stop scanning
async function stopScanning() {
    if (!isScanning || !html5QrcodeScanner) return;

    try {
        stopButton.innerHTML = '<span class="loading"></span> Đang dừng...';
        stopButton.disabled = true;

        await html5QrcodeScanner.stop();
        html5QrcodeScanner = null;
        isScanning = false;

        scannerInstruction.classList.remove('hidden');
        resetButtons();

    } catch (err) {
        console.error('Error stopping scanner:', err);
        resetButtons();
    }
}

// Reset buttons
function resetButtons() {
    startButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
        </svg>
        Bắt đầu quét
    `;
    stopButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <rect x="9" y="9" width="6" height="6" fill="currentColor"></rect>
        </svg>
        Dừng quét
    `;
    startButton.disabled = false;
    stopButton.disabled = false;
    startButton.style.display = 'flex';
    stopButton.style.display = 'none';
}

// Handle successful scan
function onScanSuccess(decodedText, decodedResult) {
    // Add success flash effect
    scannerBox.classList.add('success');
    setTimeout(() => scannerBox.classList.remove('success'), 500);

    // Play success sound (optional)
    playSuccessSound();

    // Add to results
    addResult(decodedText, decodedResult.result.format.formatName);

    // Vibrate if supported
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

// Handle scan error (silent)
function onScanError(errorMessage) {
    // Silent - don't spam console with every frame error
}

// Add result to list
function addResult(text, format = 'QR_CODE') {
    const timestamp = new Date().toLocaleString('vi-VN');

    const result = {
        id: Date.now(),
        text: text,
        format: format,
        timestamp: timestamp
    };

    // Check for duplicates
    const isDuplicate = scannedResults.some(r => r.text === text);
    if (isDuplicate) {
        showNotification('Mã này đã được quét trước đó', 'warning');
        return;
    }

    scannedResults.unshift(result);
    saveResults();
    renderResults();

    showNotification('Quét thành công!', 'success');
}

// Render results
function renderResults() {
    if (scannedResults.length === 0) {
        resultsList.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <p>Chưa có kết quả nào</p>
                <small>Quét QR code để xem nội dung</small>
            </div>
        `;
        return;
    }

    resultsList.innerHTML = scannedResults.map(result => `
        <div class="result-item success" data-id="${result.id}">
            <div class="result-header">
                <span class="result-type">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    ${result.format}
                </span>
                <span class="result-time">${result.timestamp}</span>
            </div>
            <div class="result-content">${escapeHtml(result.text)}</div>
            <div class="result-actions">
                <button class="result-btn" onclick="copyToClipboard('${escapeHtml(result.text)}', event)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Sao chép
                </button>
                ${isValidUrl(result.text) ? `
                    <button class="result-btn" onclick="openUrl('${escapeHtml(result.text)}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Mở link
                    </button>
                ` : ''}
                <button class="result-btn" onclick="deleteResult(${result.id})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Xóa
                </button>
            </div>
        </div>
    `).join('');
}

// Handle file upload
async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showNotification('Vui lòng chọn file ảnh', 'error');
        return;
    }

    try {
        const tempScanner = new Html5Qrcode("reader");
        const result = await tempScanner.scanFile(file, true);

        addResult(result, 'QR_CODE');
        showNotification('Đọc QR code từ ảnh thành công!', 'success');

    } catch (err) {
        console.error('Error scanning file:', err);
        showNotification('Không tìm thấy QR code trong ảnh', 'error');
    }

    // Reset file input
    fileInput.value = '';
}

// Copy to clipboard
function copyToClipboard(text, event) {
    const btn = event.currentTarget;
    const originalHtml = btn.innerHTML;

    navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Đã sao chép
        `;

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHtml;
        }, 2000);

        showNotification('Đã sao chép vào clipboard', 'success');
    }).catch(err => {
        console.error('Error copying:', err);
        showNotification('Không thể sao chép', 'error');
    });
}

// Open URL
function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Delete result
function deleteResult(id) {
    scannedResults = scannedResults.filter(r => r.id !== id);
    saveResults();
    renderResults();
    showNotification('Đã xóa kết quả', 'success');
}

// Clear all results
function clearAllResults() {
    if (scannedResults.length === 0) return;

    if (confirm('Bạn có chắc muốn xóa tất cả kết quả?')) {
        scannedResults = [];
        saveResults();
        renderResults();
        showNotification('Đã xóa tất cả kết quả', 'success');
    }
}

// Save results to localStorage
function saveResults() {
    try {
        localStorage.setItem('qr_scanner_results', JSON.stringify(scannedResults));
    } catch (err) {
        console.error('Error saving results:', err);
    }
}

// Load saved results
function loadSavedResults() {
    try {
        const saved = localStorage.getItem('qr_scanner_results');
        if (saved) {
            scannedResults = JSON.parse(saved);
            renderResults();
        }
    } catch (err) {
        console.error('Error loading results:', err);
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function playSuccessSound() {
    // Optional: play beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (isScanning && html5QrcodeScanner) {
        html5QrcodeScanner.stop();
    }
});
