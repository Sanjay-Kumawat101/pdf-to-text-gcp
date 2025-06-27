# pdf-to-text-gcp
# 📄 PDF to Text Converter using Google Cloud Platform (GCP)

## 🚀 Project Description

The **PDF to Text Converter** is a cloud-native application built using **Google Cloud Platform (GCP)** that allows users to upload PDF files and automatically extract the text content from them. It leverages GCP’s event-driven architecture and serverless services to provide a fast, scalable, and cost-efficient solution.

This project includes a modern frontend for uploading PDFs and a GCP-based backend that handles text extraction using **OCR**. The output is stored and optionally displayed back to the user.

---

## 🧩 Architecture Overview

- **Frontend**:  
  - Built with HTML, CSS, and JavaScript  
  - Drag-and-drop PDF upload interface  
  - “Convert” and “Clear” buttons for user interaction  

- **Backend (GCP)**:  
  - **Cloud Storage**: Stores uploaded PDFs  
  - **Cloud Functions**: Triggered on file upload; processes the PDF  
  - **OCR**: Extracts text from the PDF  
---

- **GCP Services**:  
  - Cloud Storage  
  - Cloud Functions  
  - OCR  

---

## ✅ Features

- 📤 Upload PDFs with drag-and-drop
- 🔄 Automatic trigger and text extraction
- 📁 Text saved and displayed after conversion
- 🖥️ Clean and responsive user interface
- 🔄 Continuous deployment using GitHub + Cloud Build

# Currently Facing File Upload Issue at Frontend
