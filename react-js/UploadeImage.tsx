import React, { useState } from 'react';

function DocumentUploader() {
  const [applicantName, setApplicantName] = useState('');
  const [product, setProduct] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files
      .filter((file) => file.type === 'image/jpeg' || file.type === 'image/png')
      .map((file) => ({
        file,
        name: file.name,
        uploadTime: new Date().toLocaleString(),
        applicantName,
        product,
        documentType,
      }));

    if (newFiles.length + uploadedDocuments.length > 5) {
      alert('You can only upload a maximum of 5 images');
      return;
    }

    setUploadedDocuments((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Document Uploader</h2>
      <div>
        <label>Applicant Name:</label>
        <input
          type="text"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
        />
      </div>
      <div>
        <label>Product:</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>
      <div>
        <label>Document Type:</label>
        <input
          type="text"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        />
      </div>
      <div>
        <label>Upload Document:</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={handleFileChange}
        />
      </div>

      <div className="document-grid">
        {uploadedDocuments.map((doc, index) => (
          <div key={index} className="document-item">
            <div>
              <strong>Applicant Name:</strong> {doc.applicantName}
            </div>
            <div>
              <strong>Product:</strong> {doc.product}
            </div>
            <div>
              <strong>Document Type:</strong> {doc.documentType}
            </div>
            <div>
              <strong>Document Name:</strong> {doc.name}
            </div>
            <div>
              <strong>Date & Time:</strong> {doc.uploadTime}
            </div>
            <img
              src={URL.createObjectURL(doc.file)}
              alt={`Uploaded ${doc.name}`}
              width="100"
              height="100"
            />
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentUploader;



.document-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.document-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  background-color: #f9f9f9;
}

.document-item img {
  border: 1px solid #ddd;
  border-radius: 5px;
  display: block;
  margin: 10px 0;
}

.document-item button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
  

