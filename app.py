from flask import Flask, render_template, request, jsonify
from database import init_db, save_pattern, get_patterns
from lifegame import next_step
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

if __name__ == "__main__":
    init_db()  # 初回起動時にDBを初期化
    app.run(host='0.0.0.0', port=5000, debug=True)