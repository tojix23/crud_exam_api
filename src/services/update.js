const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require('../database/config');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../../', 'public', 'photos');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  }),
});

module.exports = [
  upload.single('photo_path'),
  async (req, res) => {
    try {
      const { id } = req.body;
      const { username, last_name, first_name, email, contact_number, country, account_type } = req.body;

      let photo_path = req.body.photo_path;
      if (req.file) {
        photo_path = `photos/${req.file.filename}`;
      }

      const query = `
        UPDATE employee_tbl 
        SET username = ?, last_name = ?, first_name = ?, email = ?, contact_number = ?, 
            photo_path = ?, country = ?, account_type = ?
        WHERE id = ?
      `;

      const values = [username, last_name, first_name, email, contact_number, photo_path, country, account_type, id];

      const [result] = await connection.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }

      return res.status(200).json({ message: "Employee updated successfully" });
    } catch (err) {
      console.error("Error updating employee:", err);
      return res.status(500).json({ message: "Error updating employee", error: err.message });
    }
  },
];
