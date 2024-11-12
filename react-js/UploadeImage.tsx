***mui

  import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

interface DocumentData {
  file: File;
  name: string;
  uploadTime: string;
  applicantName: string;
  product: string;
  documentType: string;
}

function DocumentUploader() {
  const [applicantName, setApplicantName] = useState('');
  const [product, setProduct] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentData[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const isValidImage = (file: File): boolean => {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + uploadedDocuments.length > 5) {
      alert('You can only upload a maximum of 5 images');
      return;
    }

    const newFiles = files.filter(isValidImage);

    const duplicateFile = newFiles.find((file) =>
      uploadedDocuments.some((doc) => doc.name === file.name) ||
      pendingFiles.some((pending) => pending.name === file.name)
    );

    if (duplicateFile) {
      alert(`File name "${duplicateFile.name}" already exists.`);
      return;
    }

    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const handleUpload = () => {
    const newDocuments = pendingFiles.map((file) => ({
      file,
      name: file.name,
      uploadTime: new Date().toLocaleString(),
      applicantName,
      product,
      documentType,
    }));

    setUploadedDocuments((prev) => [...prev, ...newDocuments]);
    setPendingFiles([]); // Clear the pending files after upload
  };

  const handleDelete = (index: number) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Document Uploader</h2>
      {/* Form Row */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Applicant Name"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="text"
          placeholder="Document Type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={handleFileChange}
        />
        <Button onClick={handleUpload} disabled={pendingFiles.length === 0} variant="contained">
          Upload
        </Button>
      </div>

      {/* Total Records */}
      <p>Total Records: {uploadedDocuments.length}</p>

      {/* Material UI Table */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="Uploaded Documents Table">
          <TableHead>
            <TableRow>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedDocuments.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>{doc.applicantName}</TableCell>
                <TableCell>{doc.product}</TableCell>
                <TableCell>{doc.documentType}</TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.uploadTime}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(index)} variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DocumentUploader;








*******
import React, { useState } from 'react';

interface DocumentData {
  file: File;
  name: string;
  uploadTime: string;
  applicantName: string;
  product: string;
  documentType: string;
}

function DocumentUploader() {
  const [applicantName, setApplicantName] = useState('');
  const [product, setProduct] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentData[]>([]);

  // Utility function to check if a file is a valid image type
  const isValidImage = (file: File): boolean => {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files
      .filter(isValidImage)
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

  const handleDelete = (index: number) => {
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
            <div><strong>Applicant Name:</strong> {doc.applicantName}</div>
            <div><strong>Product:</strong> {doc.product}</div>
            <div><strong>Document Type:</strong> {doc.documentType}</div>
            <div><strong>Document Name:</strong> {doc.name}</div>
            <div><strong>Date & Time:</strong> {doc.uploadTime}</div>
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


…*********


import React, { useState } from 'react';

interface DocumentData {
  file: File;
  name: string;
  uploadTime: string;
  applicantName: string;
  product: string;
  documentType: string;
}

function DocumentUploader() {
  const [applicantName, setApplicantName] = useState('');
  const [product, setProduct] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentData[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  // Utility function to check if a file is a valid image type
  const isValidImage = (file: File): boolean => {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + uploadedDocuments.length > 5) {
      alert('You can only upload a maximum of 5 images');
      return;
    }

    const newFiles = files.filter(isValidImage);

    const duplicateFile = newFiles.find((file) =>
      uploadedDocuments.some((doc) => doc.name === file.name) ||
      pendingFiles.some((pending) => pending.name === file.name)
    );

    if (duplicateFile) {
      alert(`File name "${duplicateFile.name}" already exists.`);
      return;
    }

    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const handleUpload = () => {
    const newDocuments = pendingFiles.map((file) => ({
      file,
      name: file.name,
      uploadTime: new Date().toLocaleString(),
      applicantName,
      product,
      documentType,
    }));

    setUploadedDocuments((prev) => [...prev, ...newDocuments]);
    setPendingFiles([]); // Clear the pending files after upload
  };

  const handleDelete = (index: number) => {
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
      <button onClick={handleUpload} disabled={pendingFiles.length === 0}>
        Upload
      </button>

      <div className="document-grid">
        {uploadedDocuments.map((doc, index) => (
          <div key={index} className="document-item">
            <div><strong>Applicant Name:</strong> {doc.applicantName}</div>
            <div><strong>Product:</strong> {doc.product}</div>
            <div><strong>Document Type:</strong> {doc.documentType}</div>
            <div><strong>Document Name:</strong> {doc.name}</div>
            <div><strong>Date & Time:</strong> {doc.uploadTime}</div>
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
  




******* ngx data table




import React, { useState } from 'react';
import { DatatableComponent } from '@swimlane/ngx-datatable';

interface DocumentData {
  file: File;
  name: string;
  uploadTime: string;
  applicantName: string;
  product: string;
  documentType: string;
}

function DocumentUploader() {
  const [applicantName, setApplicantName] = useState('');
  const [product, setProduct] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentData[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const isValidImage = (file: File): boolean => {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + uploadedDocuments.length > 5) {
      alert('You can only upload a maximum of 5 images');
      return;
    }

    const newFiles = files.filter(isValidImage);

    const duplicateFile = newFiles.find((file) =>
      uploadedDocuments.some((doc) => doc.name === file.name) ||
      pendingFiles.some((pending) => pending.name === file.name)
    );

    if (duplicateFile) {
      alert(`File name "${duplicateFile.name}" already exists.`);
      return;
    }

    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const handleUpload = () => {
    const newDocuments = pendingFiles.map((file) => ({
      file,
      name: file.name,
      uploadTime: new Date().toLocaleString(),
      applicantName,
      product,
      documentType,
    }));

    setUploadedDocuments((prev) => [...prev, ...newDocuments]);
    setPendingFiles([]); // Clear the pending files after upload
  };

  const handleDelete = (index: number) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Document Uploader</h2>
      {/* Form Row */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Applicant Name"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="text"
          placeholder="Document Type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={pendingFiles.length === 0}>
          Upload
        </button>
      </div>

      {/* Total Records */}
      <p>Total Records: {uploadedDocuments.length}</p>

      {/* Datatable */}
      <DatatableComponent
        className="ngx-datatable"
        columns={[
          { name: 'Applicant Name', prop: 'applicantName' },
          { name: 'Product', prop: 'product' },
          { name: 'Document Type', prop: 'documentType' },
          { name: 'Document Name', prop: 'name' },
          { name: 'Date & Time', prop: 'uploadTime' },
          {
            name: 'Action',
            cellTemplate: (row) => (
              <button onClick={() => handleDelete(row.index)}>Delete</button>
            ),
          },
        ]}
        rows={uploadedDocuments}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}

export default DocumentUploader;


