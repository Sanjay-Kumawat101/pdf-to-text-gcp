const fileUpload = document.getElementById('file-upload');
const uploadBtn = document.getElementById('upload-btn');
const clearBtn = document.getElementById('clear-btn');
const resultBox = document.getElementById('result-box');
const resultText = document.getElementById('result-text');
const dropZone = document.getElementById('drop-zone');

let selectedFile = null;

// Handle file selection
fileUpload.addEventListener('change', (event) => {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    dropZone.querySelector('p').textContent = `Selected: ${selectedFile.name}`;
    uploadBtn.disabled = false;
  }
});

// Clear selected file
clearBtn.addEventListener('click', () => {
  fileUpload.value = '';
  selectedFile = null;
  dropZone.querySelector('p').textContent = 'Drop your PDF here or click to browse';
  resultText.textContent = '';
  resultBox.hidden = true;
  uploadBtn.disabled = true;
});

// Upload & Convert
uploadBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  uploadBtn.textContent = 'Uploading...';
  uploadBtn.disabled = true;
  resultText.textContent = 'Extracting...';
  resultBox.hidden = false;

  try {
    const filename = selectedFile.name;
    const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/pdf-input-bucket-sanjay/o?uploadType=media&name=${encodeURIComponent(filename)}`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf'
      },
      body: selectedFile
    });

    if (!response.ok) throw new Error('Upload failed.');

    // Wait for Cloud Function to process and upload text file
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Fetch extracted text from output bucket
    const outputFile = filename.replace('.pdf', '.txt');
    const textUrl = `https://storage.googleapis.com/text-output-bucket-sanjay/${outputFile}`;

    const textResponse = await fetch(textUrl);
    if (!textResponse.ok) throw new Error('Failed to fetch extracted text.');

    const extractedText = await textResponse.text();
    resultText.textContent = extractedText;

  } catch (err) {
    resultText.textContent = `Error: ${err.message}`;
  } finally {
    uploadBtn.textContent = 'Upload & Convert';
    uploadBtn.disabled = false;
  }
});
