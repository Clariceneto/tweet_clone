const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garantir que o diretório de uploads exista
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
