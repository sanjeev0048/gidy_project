const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

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

  // Initialize Profile data if empty
  // Initialize Profile data
  db.run(`
    DELETE FROM profile;
  `);
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

  // Initialize Skills if empty
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

console.log("Database initialized check complete.");

