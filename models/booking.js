const sqlite3 =  require('sqlite3').verbose();
const db = new sqlite3.Database('./hotel.db');
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roomType TEXT NOT NULL,
            checkInDate TEXT NOT NULL,
            checkOutDate TEXT NOT NULL,
            guests INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table 'rooms' created successfully.");
        }
    });
});
module.exports = db;

