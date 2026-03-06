const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.get('SELECT * FROM profile ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
        console.error('DB Error:', err.message);
    } else {
        console.log('Profile Data:', row);
    }
    db.close();
});
