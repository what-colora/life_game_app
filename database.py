import sqlite3
import json

DB_NAME = "patterns.db"

# データベースの初期化
def init_db():
    # データベースファイル"patterns.db"を作成する。
    # すでに存在している場合、アクセスする。
    conn = sqlite3.connect(DB_NAME)
    # sqliteを操作するカーソルオブジェクトの作成
    cur = conn.cursor()
    # id, name, gridを格納するテーブルの作成
    cur.execute("CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY, name TEXT, grid TEXT)")
    # データベースへのコミット。
    conn.commit()
    # データベースへのコネクションを閉じる。（必ず実施）
    conn.close()

# 現在のグリッド情報の保存用関数
def save_pattern(name, grid_json):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    cur.execute("INSERT INTO patterns (name, grid) VALUES (?, ?)", (name, grid_json))
    conn.commit()
    conn.close()

# 現在のグリッド情報の読み込み用関数
def get_patterns():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    cur.execute("SELECT name, grid FROM patterns")
    patterns = [{"name": row[0], "grid": json.loads(row[1])} for row in cur.fetchall()]
    conn.close()
    return patterns

if __name__ == "__main__":
    init_db()