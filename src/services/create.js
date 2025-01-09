const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require('../database/config');

const uploadDir = path.join(__dirname, '../../', 'public', 'photos');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('photo_path'), 
  async (req, res) => {
    try {
      const { username, last_name, first_name, email, contact_number, country, account_type } = req.body;
      const photo_path = req.file ? `photos/${req.file.filename}` : null; 

      const query = `
        INSERT INTO employee_tbl (username, last_name, first_name, email, contact_number, photo_path, country, account_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [username, last_name, first_name, email, contact_number, photo_path, country, account_type];
      const [result] = await connection.query(query, values);
      // console.log("data inserted: ", result);
      return res.status(200).json({ message: "Data inserted successfully", id: result.insertId });
    } catch (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Error inserting data", error: err.message });
    }
  },
];
