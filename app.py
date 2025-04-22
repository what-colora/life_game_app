from flask import Flask, render_template, request, jsonify
from database import init_db, save_pattern, get_patterns
from lifegame import next_step
import json
import unittest
import io
import sys
from contextlib import redirect_stdout

# lifegame-test.py からインポート
import importlib.util
import sys

spec = importlib.util.spec_from_file_location("lifegame_test", "lifegame-test.py")
lifegame_test = importlib.util.module_from_spec(spec)
sys.modules["lifegame_test"] = lifegame_test
spec.loader.exec_module(lifegame_test)
TestLifeGame = lifegame_test.TestLifeGame

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/game", methods=["GET", "POST"])
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

<<<<<<< HEAD
@app.route("/test", methods=["GET"])
def test_page():
    return render_template("lifegame-test.html")

@app.route("/test/step", methods=["POST"])
def test_step():
    data = request.get_json()
    if "grid" in data:
        grid = data["grid"]
        grid = next_step(grid)
        return jsonify({"grid": grid})
    return jsonify({"error": "Invalid request"}), 400

@app.route("/test/run", methods=["GET"])
def run_tests():
    # テストを実行して結果を取得
    suite = unittest.TestLoader().loadTestsFromTestCase(TestLifeGame)
    output = io.StringIO()
    with redirect_stdout(output):
        result = unittest.TextTestRunner(stream=output, verbosity=2).run(suite)
    
    # テスト結果を整形
    test_output = output.getvalue()
    test_results = {
        "total": result.testsRun,
        "passed": result.testsRun - len(result.failures) - len(result.errors),
        "failures": len(result.failures),
        "errors": len(result.errors),
        "output": test_output,
        "success": result.wasSuccessful()
    }
    
    return jsonify(test_results)

=======
>>>>>>> what-colora/main
if __name__ == "__main__":
    init_db()  # 初回起動時にDBを初期化
    app.run(host='0.0.0.0', port=5000, debug=True)
