// 30x30のグリッドを生成し0で初期化
let grid = Array(30).fill().map(() => Array(30).fill(0));
// htmlタグの抽出 <div id="grid" class="grid"></div>
const gridDiv = document.getElementById("grid");
let isRunning = false;
let animationId = null;


function drawGrid() {
    // innerHTMLプロパティ
    gridDiv.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            const cell = document.createElement("div");
            cell.className = "cell" + (grid[i][j] ? " alive" : "");
            cell.onclick = () => {
                if (!isRunning) {
                    grid[i][j] = grid[i][j] ? 0 : 1;
                    drawGrid();
                }
            };
            gridDiv.appendChild(cell);
        }
    }
}

async function stepGame() {
    const response = await fetch("/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grid: grid, step: true })
    });
    const data = await response.json();
    grid = data.grid;
    drawGrid();
}

async function startGame() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById("startBtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("clearBtn").disabled = true;

        async function loop() {
            if (isRunning) {
                await stepGame();
                animationId = setTimeout(loop, 500);
            }
        }
        loop();
    }
}

function stopGame() {
    isRunning = false;
    clearTimeout(animationId);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("clearBtn").disabled = false;
}

async function savePattern() {
    if (!isRunning) {
        const name = document.getElementById("patternName").value;
        await fetch("/game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ save: true, name: name, grid: grid })
        });
        location.reload();
    }
}

async function loadPattern(patternName) {
    if (!isRunning) {
        const response = await fetch(`/load/${patternName}`);
        const data = await response.json();
        if (!data.error) {
            grid = data.grid;
            drawGrid();
        } else {
            alert("Pattern not found!");
        }
    }
}

function clearGrid() {
    if (!isRunning) {
        grid = Array(30).fill().map(() => Array(30).fill(0));
        drawGrid();
    }
}

drawGrid();
