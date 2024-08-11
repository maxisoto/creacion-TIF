const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configuración de multer para guardar archivos en la carpeta especificada
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'src/components/imagProfile'));
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('profileImage'), (req, res) => {
    res.json({ imageUrl: `/src/components/imagProfile/${req.file.filename}` });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
