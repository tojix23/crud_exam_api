const connection = require('../database/config'); 
module.exports = async (req, res) => {
  try {
    const query = `
      SELECT id, username, last_name, first_name, email, contact_number, photo_path, country, account_type, created_at
      FROM employee_tbl
      WHERE is_delete = FALSE
      ORDER BY created_at DESC
    `;

    const [rows] = await connection.query(query); 
    return res.status(200).json(rows); 
  } catch (err) {
    console.error("Error retrieving employees:", err); 
    return res.status(500).json({ message: "Error retrieving employees", error: err.message }); 
  }
};
