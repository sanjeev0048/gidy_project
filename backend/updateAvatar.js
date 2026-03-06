const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.run("UPDATE profile SET avatar = '/sanjeev.jpeg' WHERE id = 1", (err) => {
    if (err) {
        console.error('Update Error:', err.message);
    } else {
        console.log('Update Success: Profile avatar is now /sanjeev.jpeg');
    }
    db.close();
});
