from flask import Flask, render_template, request, jsonify
from database import init_db, save_pattern, get_patterns
import json

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = request.get_json()
        if "grid" in data and "step" in data:
            grid = data["grid"]
            grid = next_step(grid)
            return jsonify({"grid": grid})
        elif "save" in data:
            name = data["name"]
            grid = data["grid"]
            save_pattern(name, json.dumps(grid))
            return jsonify({"message": "Saved"})
    patterns = get_patterns()
    return render_template("index.html", patterns=patterns)

@app.route("/load/<pattern_name>", methods=["GET"])
def load_pattern(pattern_name):
    patterns = get_patterns()
    for pattern in patterns:
        if pattern["name"] == pattern_name:
            return jsonify({"grid": pattern["grid"]})
    return jsonify({"error": "Pattern not found"}), 404

def next_step(grid):
    size = 30
    new_grid = [[0 for _ in range(size)] for _ in range(size)]
    for i in range(size):
        for j in range(size):
            neighbors = sum(grid[x][y] for x in range(max(0, i-1), min(size, i+2))
                           for y in range(max(0, j-1), min(size, j+2)) if (x, y) != (i, j))
            if grid[i][j] == 1:
                new_grid[i][j] = 1 if neighbors in [2, 3] else 0
            else:
                new_grid[i][j] = 1 if neighbors == 3 else 0
    return new_grid

if __name__ == "__main__":
    init_db()  # 初回起動時にDBを初期化
    app.run(host='0.0.0.0', port=5000, debug=True)