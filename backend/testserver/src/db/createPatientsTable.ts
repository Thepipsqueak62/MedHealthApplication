// db/createPatientsTable.ts
import Database from "better-sqlite3";

const db = new Database("../sqlite.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    dob TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`);


console.log("patients table ready");

db.prepare(`INSERT INTO patients (id, name, dob) VALUES (?, ?, ?)`)
    .run("p1", "Jane Doe", "1985-06-13");