const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite');

// GET Profile
app.get('/api/profile', (req, res) => {
    db.get('SELECT * FROM profile ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
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
        res.json(rows);
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
    console.log(`API running at http://localhost:${port}`);
});
