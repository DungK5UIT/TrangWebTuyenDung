let selectedFiles = [];
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileList = document.getElementById('fileList');
const uploadBtn = document.getElementById('uploadBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');

// Drag and drop events
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});
uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
});

// File input change
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

function handleFiles(files) {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validFiles = files.filter(file => 
        validTypes.includes(file.type) || 
        file.name.toLowerCase().endsWith('.pdf') || 
        file.name.toLowerCase().endsWith('.doc') || 
        file.name.toLowerCase().endsWith('.docx')
    );

    if (validFiles.length === 0) {
        alert('Vui lòng chọn file PDF, DOC hoặc DOCX');
        return;
    }

    selectedFiles = [...selectedFiles, ...validFiles];
    displayFiles();
    updateUploadButton();
}

function displayFiles() {
    fileList.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        const fileType = file.name.split('.').pop().toUpperCase();

        fileItem.innerHTML = `
            <div class="file-details">
                <div class="file-icon">📄</div>
                <div class="file-meta">
                    <h4>${file.name}</h4>
                    <p>${fileSize} MB • ${fileType}</p>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFile(${index})">✕</button>
        `;
        fileList.appendChild(fileItem);
    });

    fileInfo.style.display = selectedFiles.length > 0 ? 'block' : 'none';
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFiles();
    updateUploadButton();
}

function updateUploadButton() {
    if (selectedFiles.length > 0) {
        uploadBtn.classList.add('active');
        uploadBtn.textContent = `🚀 Tải lên ${selectedFiles.length} file`;
    } else {
        uploadBtn.classList.remove('active');
        uploadBtn.textContent = '🚀 Tải lên CV';
    }
}

// Upload simulation
uploadBtn.addEventListener('click', () => {
    if (selectedFiles.length === 0) return;

    progressBar.style.display = 'block';
    uploadBtn.textContent = 'Đang tải lên...';
    uploadBtn.disabled = true;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                alert('✅ Tải CV thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
                resetForm();
            }, 500);
        }
        progressFill.style.width = progress + '%';
    }, 200);
});

function resetForm() {
    selectedFiles = [];
    fileInput.value = '';
    displayFiles();
    updateUploadButton();
    progressBar.style.display = 'none';
    progressFill.style.width = '0%';
    uploadBtn.disabled = false;
}