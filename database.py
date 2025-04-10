import sqlite3
import json

def init_db():
    conn = sqlite3.connect("patterns.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY, name TEXT, grid TEXT)")
    conn.commit()
    conn.close()

def save_pattern(name, grid_json):
    conn = sqlite3.connect("patterns.db")
    c = conn.cursor()
    c.execute("INSERT INTO patterns (name, grid) VALUES (?, ?)", (name, grid_json))
    conn.commit()
    conn.close()

def get_patterns():
    conn = sqlite3.connect("patterns.db")
    c = conn.cursor()
    c.execute("SELECT name, grid FROM patterns")
    patterns = [{"name": row[0], "grid": json.loads(row[1])} for row in c.fetchall()]
    conn.close()
    return patterns

if __name__ == "__main__":
    init_db()