const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Load Student Details API
app.get("/students", (req, res) => {
  const { page, pageSize } = req.query;
  const students = JSON.parse(fs.readFileSync("students.json", "utf8"));
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  const paginatedStudents = students.slice(startIndex, endIndex);
  res.json(paginatedStudents);
});

// Server-side Filtering API
app.post("/students/filter", (req, res) => {
  const { criteria } = req.body;
  const students = JSON.parse(fs.readFileSync("students.json", "utf8"));
  const filteredStudents = students.filter((student) => {
    // Implement your filtering logic here based on the criteria sent from the UI
    // For example, if the criteria contains { columnName: 'name', value: 'John' }
    // You can check if the student's name matches 'John'
    return student.name === criteria.value;
  });
  res.json(filteredStudents);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
