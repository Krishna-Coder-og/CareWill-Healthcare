const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json'); // You must download this from Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const upload = multer({ dest: 'uploads/' });

// User-file mapping (in-memory for demo, can persist to JSON file)
let userFiles = {};
const mappingFile = 'userFiles.json';
if (fs.existsSync(mappingFile)) {
  userFiles = JSON.parse(fs.readFileSync(mappingFile));
}
function saveMapping() {
  fs.writeFileSync(mappingFile, JSON.stringify(userFiles, null, 2));
}

// Share tokens mapping: { token: { uid, filename, expiresAt } }
let shareTokens = {};
const shareFile = 'shareTokens.json';
if (fs.existsSync(shareFile)) {
  shareTokens = JSON.parse(fs.readFileSync(shareFile));
}
function saveShareTokens() {
  fs.writeFileSync(shareFile, JSON.stringify(shareTokens, null, 2));
}

// Middleware to validate Firebase ID token
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const idToken = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Upload endpoint
app.post('/api/records/upload', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const uid = req.uid;
  if (!userFiles[uid]) userFiles[uid] = [];
  userFiles[uid].push(req.file.filename);
  saveMapping();
  res.json({ filename: req.file.filename, originalname: req.file.originalname });
});

// List files endpoint
app.get('/api/records', authenticate, (req, res) => {
  const uid = req.uid;
  res.json(userFiles[uid] || []);
});

// Download/view file endpoint
app.get('/api/records/:filename', authenticate, (req, res) => {
  const uid = req.uid;
  const file = req.params.filename;
  if (!userFiles[uid] || !userFiles[uid].includes(file)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  const filePath = path.join(__dirname, 'uploads', file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
  res.download(filePath);
});

// Delete file endpoint
app.delete('/api/records/:filename', authenticate, (req, res) => {
  const uid = req.uid;
  const file = req.params.filename;
  if (!userFiles[uid] || !userFiles[uid].includes(file)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  const filePath = path.join(__dirname, 'uploads', file);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  userFiles[uid] = userFiles[uid].filter(f => f !== file);
  saveMapping();
  res.json({ success: true });
});

// Generate share link endpoint
app.post('/api/records/:filename/share', authenticate, (req, res) => {
  const uid = req.uid;
  const file = req.params.filename;
  if (!userFiles[uid] || !userFiles[uid].includes(file)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  const token = crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  shareTokens[token] = { uid, filename: file, expiresAt };
  saveShareTokens();
  res.json({ shareUrl: `http://localhost:5000/api/share/${token}` });
});

// Serve file via share token
app.get('/api/share/:token', (req, res) => {
  const { token } = req.params;
  const entry = shareTokens[token];
  if (!entry || Date.now() > entry.expiresAt) {
    return res.status(404).json({ error: 'Invalid or expired share link' });
  }
  const filePath = path.join(__dirname, 'uploads', entry.filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
  res.download(filePath);
});

// Revoke share link endpoint
app.delete('/api/records/:filename/share', authenticate, (req, res) => {
  const uid = req.uid;
  const file = req.params.filename;
  // Remove all tokens for this file and user
  let changed = false;
  for (const token in shareTokens) {
    if (shareTokens[token].uid === uid && shareTokens[token].filename === file) {
      delete shareTokens[token];
      changed = true;
    }
  }
  if (changed) saveShareTokens();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 