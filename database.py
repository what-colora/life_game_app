import sqlite3
import json

<<<<<<< HEAD
<<<<<<< HEAD
import os

# データベースファイルのパスを設定
# Docker 環境では、/tmp ディレクトリは書き込み可能
DB_NAME = "/tmp/patterns.db"

# 有名なパターンの定義
FAMOUS_PATTERNS = {
    "ブロック": [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    "ブリンカー": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "グライダー": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "宇宙船": [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    "ビーコン": [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    "タブ": [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]
}

# パターンを30x30グリッドに変換する関数
def convert_to_full_grid(pattern):
    size = 30
    grid = [[0 for _ in range(size)] for _ in range(size)]
    
    pattern_height = len(pattern)
    pattern_width = len(pattern[0])
    
    # パターンを中央に配置
    start_i = (size - pattern_height) // 2
    start_j = (size - pattern_width) // 2
    
    for i in range(pattern_height):
        for j in range(pattern_width):
            grid[start_i + i][start_j + j] = pattern[i][j]
    
    return grid
=======
DB_NAME = "patterns.db"
>>>>>>> what-colora/main
=======
DB_NAME = "patterns.db"
>>>>>>> what-colora/main

# データベースの初期化
def init_db():
    # データベースファイル"patterns.db"を作成する。
    # すでに存在している場合、アクセスする。
    conn = sqlite3.connect(DB_NAME)
    # sqliteを操作するカーソルオブジェクトの作成
    cur = conn.cursor()
    # id, name, gridを格納するテーブル(patterns)の作成
    cur.execute("CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY, name TEXT, grid TEXT)")
<<<<<<< HEAD
<<<<<<< HEAD
    
    # 有名なパターンが存在するか確認
    cur.execute("SELECT COUNT(*) FROM patterns WHERE name IN ({})".format(
        ','.join(['?'] * len(FAMOUS_PATTERNS))
    ), list(FAMOUS_PATTERNS.keys()))
    
    count = cur.fetchone()[0]
    
    # 有名なパターンが存在しない場合、追加
    if count < len(FAMOUS_PATTERNS):
        for name, pattern in FAMOUS_PATTERNS.items():
            # パターンを30x30グリッドに変換
            full_grid = convert_to_full_grid(pattern)
            # データベースに保存
            cur.execute("INSERT OR IGNORE INTO patterns (name, grid) VALUES (?, ?)",
                      (name, json.dumps(full_grid)))
    
=======
>>>>>>> what-colora/main
=======
>>>>>>> what-colora/main
    # データベースへのコミット。
    conn.commit()
    # データベースへのコネクションを閉じる。（必ず実施）
    conn.close()

# 現在のグリッド情報の保存用関数
def save_pattern(name, grid_json):
<<<<<<< HEAD
<<<<<<< HEAD
    try:
        # データベースファイルが存在しない場合は初期化
        init_db()
        
        conn = sqlite3.connect(DB_NAME)
        cur = conn.cursor()
        cur.execute("INSERT INTO patterns (name, grid) VALUES (?, ?)", (name, grid_json))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error saving pattern: {e}")
        # エラーが発生した場合でもデータベースを初期化して再試行
        try:
            init_db()
            conn = sqlite3.connect(DB_NAME)
            cur = conn.cursor()
            cur.execute("INSERT INTO patterns (name, grid) VALUES (?, ?)", (name, grid_json))
            conn.commit()
            conn.close()
        except Exception as e2:
            print(f"Failed to save pattern after retry: {e2}")

# 現在のグリッド情報の読み込み用関数
def get_patterns():
    try:
        # データベースファイルが存在しない場合は初期化
        init_db()
        
        conn = sqlite3.connect(DB_NAME)
        cur = conn.cursor()
        cur.execute("SELECT name, grid FROM patterns")
        patterns = [{"name": row[0], "grid": json.loads(row[1])} for row in cur.fetchall()]
        conn.close()
        return patterns
    except Exception as e:
        print(f"Error getting patterns: {e}")
        # エラーが発生した場合でもデータベースを初期化して再試行
        try:
            init_db()
            conn = sqlite3.connect(DB_NAME)
            cur = conn.cursor()
            cur.execute("SELECT name, grid FROM patterns")
            patterns = [{"name": row[0], "grid": json.loads(row[1])} for row in cur.fetchall()]
            conn.close()
            return patterns
        except Exception as e2:
            print(f"Failed to get patterns after retry: {e2}")
            # 最終的に失敗した場合は空のリストを返す
            return []
=======
=======
>>>>>>> what-colora/main
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
>>>>>>> what-colora/main

if __name__ == "__main__":
    init_db()
