import functions_framework
import os
import fitz  # PyMuPDF
from google.cloud import storage
import tempfile

@functions_framework.cloud_event
def pdf_to_text(cloud_event):
    bucket_name = cloud_event.data["bucket"]
    file_name = cloud_event.data["name"]

    if not file_name.endswith(".pdf"):
        return

    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(file_name)

    # Download file to temp
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_pdf:
        blob.download_to_filename(temp_pdf.name)

        # Use PyMuPDF to extract text
        text = ""
        with fitz.open(temp_pdf.name) as doc:
            for page in doc:
                text += page.get_text()

    # Upload extracted text
    output_bucket = client.bucket("text-output-bucket-sanjay")  
    output_blob = output_bucket.blob(file_name.replace(".pdf", ".txt"))
    output_blob.upload_from_string(text)
