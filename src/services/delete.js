const connection = require('../database/config');

module.exports = async (req, res) => {
  try {

    const { id } = req.body;
    // console.log("id check: ", id);
    const query = `
      UPDATE employee_tbl 
      SET is_delete = TRUE
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee marked as deleted" });

  } catch (err) {
    console.error("Error deleting employee:", err);
    return res.status(500).json({ message: "Error deleting employee", error: err.message });
  }
};
