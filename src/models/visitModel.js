// CREATE TABLE IF NOT EXISTS visits (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     doctor_id INT NOT NULL,
//     visit_date DATE NOT NULL,
//     reason TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id),
//     FOREIGN KEY (doctor_id) REFERENCES doctors(id)
// );
