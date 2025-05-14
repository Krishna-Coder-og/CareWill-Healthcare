import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { LogIn, LogOut, FileText, Image as ImageIcon, File, Download, Trash2, Share2, XCircle } from 'lucide-react';
import AuthPage from './AuthPage';

const isImage = (filename) => /\.(jpg|jpeg|png|gif)$/i.test(filename);
const isPDF = (filename) => /\.pdf$/i.test(filename);

export default function HealthRecordsPage() {
  const [user, setUser] = useState(auth.currentUser);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shareModal, setShareModal] = useState({ open: false, link: '', filename: '' });
  const [shareLoading, setShareLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) fetchFiles();
    });
    return unsubscribe;
  }, []);

  const fetchFiles = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const token = await user.getIdToken();
      const res = await fetch('http://localhost:5000/api/records', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      setError('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !user) return;
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const token = await user.getIdToken();
      await fetch('http://localhost:5000/api/records/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      setSelectedFile(null);
      fetchFiles();
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!user) return;
    setError('');
    try {
      const token = await user.getIdToken();
      await fetch(`http://localhost:5000/api/records/${filename}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFiles();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleShare = async (filename) => {
    if (!user) return;
    setShareLoading(true);
    setError('');
    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/api/records/${filename}/share`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setShareModal({ open: true, link: data.shareUrl, filename });
    } catch (err) {
      setError('Failed to generate share link');
    } finally {
      setShareLoading(false);
    }
  };

  const handleRevokeShare = async (filename) => {
    if (!user) return;
    setError('');
    try {
      const token = await user.getIdToken();
      await fetch(`http://localhost:5000/api/records/${filename}/share`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (shareModal.filename === filename) setShareModal({ open: false, link: '', filename: '' });
    } catch (err) {
      setError('Failed to revoke share link');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareModal.link);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  // Show modal if not logged in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-muted/50 px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center flex flex-col items-center">
          <FileText className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Your Health Records</h2>
          <p className="text-muted-foreground mb-6">Please log in to securely access, upload, and manage your health records.</p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <LogIn className="h-5 w-5" /> Log In / Sign Up
          </button>
        </div>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg min-w-[340px] max-w-full">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                <XCircle className="h-6 w-6" />
              </button>
              <AuthPage />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 text-center relative">
        <h2 className="text-3xl font-bold text-primary mb-2">Your Health Records</h2>
        <p className="text-muted-foreground mb-4">Upload, preview, and securely share your medical records with healthcare providers.</p>
        <button
          onClick={handleLogout}
          className="absolute right-0 top-0 bg-muted text-foreground px-4 py-2 rounded flex items-center gap-2 hover:bg-red-100 hover:text-red-600 transition-colors text-sm"
          title="Log out"
        >
          <LogOut className="h-4 w-4" /> Log Out
        </button>
      </div>
      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="file"
          onChange={e => setSelectedFile(e.target.files[0])}
          required
          className="border rounded px-3 py-2 w-full sm:w-auto"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-medical-green hover:bg-medical-green-dark text-white px-6 py-2 rounded-lg font-semibold"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center text-muted-foreground">Loading your records...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">
              <FileText className="mx-auto h-10 w-10 mb-2 text-muted-foreground" />
              <div>No records found. Upload your first health record!</div>
            </div>
          ) : (
            files.map((file, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-5 flex flex-col items-center relative group">
                <div className="mb-3">
                  {isImage(file) ? (
                    <img src={`http://localhost:5000/api/records/${file}`} alt={file} className="max-w-[120px] max-h-[100px] rounded border" />
                  ) : isPDF(file) ? (
                    <FileText className="h-10 w-10 text-primary" />
                  ) : (
                    <File className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="font-medium text-center break-all mb-2 text-sm">{file}</div>
                <div className="flex gap-2 mt-auto">
                  <a
                    href={`http://localhost:5000/api/records/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download"
                    className="p-2 rounded hover:bg-muted transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(file)}
                    title="Delete"
                    className="p-2 rounded hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare(file)}
                    title="Share"
                    className="p-2 rounded hover:bg-green-50 text-medical-green transition-colors"
                    disabled={shareLoading}
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleRevokeShare(file)}
                    title="Revoke Share Link"
                    className="p-2 rounded hover:bg-muted transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {/* Share Modal */}
      {shareModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg min-w-[320px] text-center">
            <h4 className="text-lg font-semibold mb-4">Share Link</h4>
            <input value={shareModal.link} readOnly className="w-full mb-4 px-3 py-2 border rounded" />
            <button
              onClick={handleCopy}
              className="bg-primary text-white px-4 py-2 rounded mr-2"
            >
              Copy
            </button>
            <button
              onClick={() => setShareModal({ open: false, link: '', filename: '' })}
              className="bg-muted text-foreground px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 