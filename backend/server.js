const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log(`Initializing database at: ${dbPath}`);

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      role TEXT,
      location TEXT,
      bio TEXT,
      avatar TEXT,
      github TEXT,
      linkedin TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      iconName TEXT,
      level INTEGER,
      color TEXT,
      likes INTEGER
    )
  `);

    db.get("SELECT COUNT(*) AS count FROM profile", (err, row) => {
        if (row && row.count === 0) {
            db.run(`
        INSERT INTO profile (name, role, location, bio, avatar, github, linkedin) VALUES (
          'Sanjeev J',
          'Software Developer',
          'Chennai, India',
          'Motivated software developer with strong programming foundations in Java, Python, and distributed system concepts. Experienced in designing scalable backend services, building RESTful APIs, and developing reliable application components.',
          '/sanjeev.jpeg',
          'https://github.com/sanjeev-j',
          'https://linkedin.com/in/sanjeev-j'
        )
      `);
            console.log('Profile seeded');
        }
    });

    db.get("SELECT COUNT(*) AS count FROM skills", (err, row) => {
        if (row && row.count === 0) {
            const skills = [
                { name: 'React', iconName: 'Globe', level: 95, color: 'from-cyan-400 to-blue-500', likes: 24 },
                { name: 'SQL', iconName: 'Database', level: 85, color: 'from-emerald-400 to-teal-500', likes: 18 },
                { name: 'REST API', iconName: 'Terminal', level: 88, color: 'from-green-400 to-emerald-600', likes: 32 },
            ];
            const stmt = db.prepare("INSERT INTO skills (name, iconName, level, color, likes) VALUES (?, ?, ?, ?, ?)");
            skills.forEach(s => stmt.run(s.name, s.iconName, s.level, s.color, s.likes));
            stmt.finalize();
            console.log('Skills seeded');
        }
    });
});

app.get('/', (req, res) => {
    res.send('API is running and database is initialized.');
});

// GET Profile
app.get('/api/profile', (req, res) => {
    db.get('SELECT * FROM profile ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
});

// PUT (Update) Profile
app.put('/api/profile', (req, res) => {
    const { name, role, location, bio, avatar, github, linkedin, id } = req.body;
    if (!id) return res.status(400).json({ error: 'Profile ID is required' });

    db.run('UPDATE profile SET name = ?, role = ?, location = ?, bio = ?, avatar = ?, github = ?, linkedin = ? WHERE id = ?',
        [name, role, location, bio, avatar, github, linkedin, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            // Return the updated profile
            db.get('SELECT * FROM profile WHERE id = ?', [id], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(row);
            });
        });
});

// GET Skills
app.get('/api/skills', (req, res) => {
    db.all('SELECT * FROM skills', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

// POST Endorse Skill (Innovation Phase - Skill Endorsement System)
app.post('/api/skills/:id/endorse', (req, res) => {
    const { id } = req.params;
    db.run('UPDATE skills SET likes = likes + 1 WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.get('SELECT * FROM skills WHERE id = ?', [id], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(row);
        });
    });
});

app.listen(port, () => {
    console.log(`API running at port ${port}`);
});
