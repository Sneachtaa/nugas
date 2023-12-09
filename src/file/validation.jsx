import React, { useState } from 'react';
import axios from 'axios';

function FileUploadDownload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPertemuan, setSelectedPertemuan] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePertemuanChange = (e) => {
    setSelectedPertemuan(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedPertemuan) {
      alert('Pilih file dan pertemuan terlebih dahulu.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', selectedFile.type);
    formData.append('pertemuan', selectedPertemuan);

    try {
      const response = await axios.post('http://localhost:28181/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server Response:', response.data);

      // Set the download URL obtained from the server response
      setDownloadUrl(response.data.downloadUrl);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) {
      alert('Download URL is not available.');
      return;
    }

    // Trigger the download using the download URL
    window.open(downloadUrl, '_blank');
  };

  return (
    <div>
      <h2>Upload dan Download File</h2>
      <input type="file" onChange={handleFileChange} />
      <select value={selectedPertemuan} onChange={handlePertemuanChange}>
        <option value="">Pilih Pertemuan</option>
        <option value="Tugas pertemuan 1">Tugas pertemuan 1</option>
        <option value="Tugas pertemuan 2">Tugas pertemuan 2</option>
        {/* Add other meeting options as needed */}
      </select>
      <button onClick={handleUpload}>Unggah</button>
      <button onClick={handleDownload}>Unduh</button>
    </div>
  );
}

export default FileUploadDownload;
