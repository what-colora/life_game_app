// テストケースの定義
const testCases = [
    {
        id: 'empty_grid',
        name: '空のグリッドテスト',
        description: '空のグリッドは次のステップでも空のままであることをテスト',
        setup: () => Array(30).fill().map(() => Array(30).fill(0)),
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 空のグリッドを返す
            return Array(30).fill().map(() => Array(30).fill(0));
        }
    },
    {
        id: 'single_cell_dies',
        name: '単一セル死亡テスト',
        description: '単一のセルは孤独で死ぬことをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[10][10] = 1;  // 中央に1つのセルを配置
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 空のグリッドを返す（単一セルは死ぬ）
            return Array(30).fill().map(() => Array(30).fill(0));
        }
    },
    {
        id: 'block_pattern_stable',
        name: 'ブロックパターン安定テスト',
        description: 'ブロックパターン（2x2）は安定していることをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 2x2のブロックを作成
            grid[10][10] = 1;
            grid[10][11] = 1;
            grid[11][10] = 1;
            grid[11][11] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            expectedGrid[10][10] = 1;
            expectedGrid[10][11] = 1;
            expectedGrid[11][10] = 1;
            expectedGrid[11][11] = 1;
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 2x2のブロックを返す（安定している）
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[10][10] = 1;
            grid[10][11] = 1;
            grid[11][10] = 1;
            grid[11][11] = 1;
            return grid;
        }
    },
    {
        id: 'blinker_pattern_oscillates',
        name: 'ブリンカーパターン振動テスト',
        description: 'ブリンカーパターン（縦3つ）が振動することをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 縦3つのブリンカーを作成
            grid[10][10] = 1;
            grid[11][10] = 1;
            grid[12][10] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            expectedGrid[11][9] = 1;
            expectedGrid[11][10] = 1;
            expectedGrid[11][11] = 1;
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 横3つのブリンカーを返す
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[11][9] = 1;
            grid[11][10] = 1;
            grid[11][11] = 1;
            return grid;
        }
    },
    {
        id: 'three_neighbors_birth',
        name: '3隣接セル誕生テスト',
        description: '死んでいるセルの周りに3つの生きたセルがあると誕生することをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 3つの生きたセルを配置
            grid[10][9] = 1;
            grid[10][11] = 1;
            grid[11][10] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            expectedGrid[10][9] = 1;
            expectedGrid[10][10] = 1;
            expectedGrid[10][11] = 1;
            expectedGrid[11][10] = 1;
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 中央のセルが誕生した状態を返す
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[10][9] = 1;
            grid[10][10] = 1;
            grid[10][11] = 1;
            grid[11][10] = 1;
            return grid;
        }
    },
    {
        id: 'overpopulation_death',
        name: '過密死亡テスト',
        description: '過密（4つ以上の隣接セル）で死ぬことをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 中央のセルとその周りに4つのセルを配置
            grid[10][10] = 1;  // 中央
            grid[9][9] = 1;
            grid[9][10] = 1;
            grid[9][11] = 1;
            grid[10][9] = 1;
            grid[11][9] = 1;  // 5つ目のセルを追加して確実に過密状態にする
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            // 周囲のセルは生きているが、中央のセルは死んでいる
            expectedGrid[9][9] = 1;
            expectedGrid[9][10] = 1;
            expectedGrid[9][11] = 1;
            expectedGrid[10][9] = 1;
            expectedGrid[11][9] = 1;
            // 中央のセル (10,10) は死んでいる (0)
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 中央のセルが死んだ状態を返す
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 周囲のセルは生きているが、中央のセルは死んでいる
            grid[9][9] = 1;
            grid[9][10] = 1;
            grid[9][11] = 1;
            grid[10][9] = 1;
            grid[11][9] = 1;
            // 中央のセル (10,10) は死んでいる (0)
            return grid;
        }
    },
    {
        id: 'underpopulation_death',
        name: '過疎死亡テスト',
        description: '過疎（1つ以下の隣接セル）で死ぬことをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 中央のセルとその周りに1つのセルを配置
            grid[10][10] = 1;  // 中央
            grid[9][9] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 空のグリッドを返す（両方のセルが死ぬ）
            return Array(30).fill().map(() => Array(30).fill(0));
        }
    },
    {
        id: 'survival_with_two_neighbors',
        name: '2隣接セル生存テスト',
        description: '2つの隣接セルがあると生存することをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[10][10] = 1;  // 中央
            grid[9][9] = 1;
            grid[9][10] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            expectedGrid[9][9] = 1;
            expectedGrid[9][10] = 1;
            expectedGrid[10][10] = 1;
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 中央のセルが生存した状態を返す
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[9][9] = 1;
            grid[9][10] = 1;
            grid[10][10] = 1;
            return grid;
        }
    },
    {
        id: 'survival_with_three_neighbors',
        name: '3隣接セル生存テスト',
        description: '3つの隣接セルがあると生存することをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[10][10] = 1;  // 中央
            grid[9][9] = 1;
            grid[9][10] = 1;
            grid[9][11] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            expectedGrid[9][9] = 1;
            expectedGrid[9][10] = 1;
            expectedGrid[9][11] = 1;
            expectedGrid[10][10] = 1;
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 中央のセルが生存した状態を返す
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[9][9] = 1;
            grid[9][10] = 1;
            grid[9][11] = 1;
            grid[10][10] = 1;
            return grid;
        }
    },
    {
        id: 'edge_case_top_left',
        name: '左上端テスト',
        description: 'グリッドの左上端のセルが正しく処理されることをテスト',
        setup: () => {
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            // 左上の角に3つのセルを配置
            grid[0][0] = 1;
            grid[0][1] = 1;
            grid[1][0] = 1;
            return grid;
        },
        verify: (initialGrid, nextGrid) => {
            // 期待されるグリッドを取得
            const expectedGrid = Array(30).fill().map(() => Array(30).fill(0));
            expectedGrid[0][0] = 1;
            expectedGrid[0][1] = 1;
            expectedGrid[1][0] = 1;
            expectedGrid[1][1] = 1;
            
            // グリッド全体が期待通りかチェック
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    if (nextGrid[i][j] !== expectedGrid[i][j]) {
                        console.log(`不一致: [${i}][${j}] 期待値=${expectedGrid[i][j]}, 実際値=${nextGrid[i][j]}`);
                        return false;
                    }
                }
            }
            return true;
        },
        expectedGrid: () => {
            // 右下のセルが誕生した状態を返す
            const grid = Array(30).fill().map(() => Array(30).fill(0));
            grid[0][0] = 1;
            grid[0][1] = 1;
            grid[1][0] = 1;
            grid[1][1] = 1;
            return grid;
        }
    }
];

// DOM要素の取得
const testCasesContainer = document.getElementById('testCases');
const testSummaryContainer = document.getElementById('testSummary');
const runAllTestsButton = document.getElementById('runAllTests');
const simulationContainer = document.getElementById('simulationContainer');

// 選択されたテストケースのID
let selectedTestId = null;
let simulationGrid = null;
let simulationAnimationId = null;
let isSimulationRunning = false;

// テストケースのリストを表示
function displayTestCases() {
    testCasesContainer.innerHTML = '';
    
    testCases.forEach(test => {
        const testCase = document.createElement('div');
        testCase.className = 'test-case';
        testCase.innerHTML = `
            <div class="test-header">
                <span class="test-status" id="status-${test.id}"></span>
                <h3>${test.name}</h3>
                <button class="run-test" data-test-id="${test.id}">このテストを実行</button>
            </div>
            <p>${test.description}</p>
            <div class="test-visualization">
                <div class="test-grid-container">
                    <div>
                        <h4>初期状態</h4>
                        <div class="mini-grid" id="mini-initial-${test.id}"></div>
                    </div>
                    <div>
                        <h4>次のステップ</h4>
                        <div class="mini-grid" id="mini-next-${test.id}"></div>
                    </div>
                    <div>
                        <h4>正解パターン</h4>
                        <div class="mini-grid" id="mini-expected-${test.id}"></div>
                    </div>
                </div>
                <div class="test-result" id="result-${test.id}"></div>
            </div>
        `;
        testCasesContainer.appendChild(testCase);
    });
    
    // テスト実行ボタンにイベントリスナーを追加
    document.querySelectorAll('.run-test').forEach(button => {
        button.addEventListener('click', function() {
            const testId = this.getAttribute('data-test-id');
            
            // このテストを実行
            runSingleTest(testId);
        });
    });
}

// 単一のテストを実行する関数
async function runSingleTest(testId) {
    const test = testCases.find(t => t.id === testId);
    if (!test) return false;
    
    const initialGrid = test.setup();
    
    // サーバーに次のステップを計算させる
    const response = await fetch("/test/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grid: initialGrid })
    });
    
    const data = await response.json();
    const nextGrid = data.grid;
    
    // 初期グリッド、次のステップのグリッド、正解パターンのグリッドを表示
    const initialContainer = document.getElementById(`mini-initial-${testId}`);
    const nextContainer = document.getElementById(`mini-next-${testId}`);
    const expectedContainer = document.getElementById(`mini-expected-${testId}`);
    
    const center = getCenterCoordinates(testId);
    
    if (initialContainer) {
        displayMiniGrid(initialGrid, initialContainer, center.x, center.y);
    }
    
    if (nextContainer) {
        displayMiniGrid(nextGrid, nextContainer, center.x, center.y);
    }
    
    // 正解パターンのグリッドを表示
    if (expectedContainer) {
        const expectedGrid = test.expectedGrid();
        displayMiniGrid(expectedGrid, expectedContainer, center.x, center.y);
    }
    
    // テスト検証
    const passed = test.verify(initialGrid, nextGrid);
    
    // 特定のテストケースのデバッグ
    console.log(`テスト: ${test.name}, 結果: ${passed ? '成功' : '失敗'}`);
    if (test.id === 'overpopulation_death') {
        console.log(`中央のセル値: ${nextGrid[10][10]}, 期待値: 0`);
    }
    
    // 結果を表示
    const resultContainer = document.getElementById(`result-${testId}`);
    if (resultContainer) {
        resultContainer.innerHTML = `<div class="test-item ${passed ? 'test-pass' : 'test-fail'}">
            ${passed ? '成功' : '失敗'} - ${passed ? 'テスト条件を満たしています' : 'テスト条件を満たしていません'}
        </div>`;
    }
    
    // テストケースのステータスを更新
    const statusElement = document.getElementById(`status-${testId}`);
    if (statusElement) {
        statusElement.className = `test-status ${passed ? 'status-pass' : 'status-fail'}`;
        statusElement.textContent = passed ? '✓' : '✗';
    }
    
    return passed;
}

// テストケースの中心座標を取得する関数
function getCenterCoordinates(testId) {
    // テストケースによって中心座標を変える
    switch(testId) {
        case 'edge_case_top_left':
            return { x: 1, y: 1 };
        case 'blinker_pattern_oscillates':
            return { x: 11, y: 10 };
        case 'block_pattern_stable':
            return { x: 10, y: 10 };
        case 'glider_pattern_moves':
            return { x: 3, y: 3 };
        default:
            return { x: 10, y: 10 };
    }
}

// グリッドを表示する関数
function displayGrid(grid, container) {
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            const cell = document.createElement('div');
            cell.className = 'test-cell' + (grid[i][j] ? ' alive' : '');
            container.appendChild(cell);
        }
    }
}


// シミュレーションを開始する関数
function startSimulation(initialGrid) {
    stopSimulation(); // 既存のシミュレーションを停止
    
    // シミュレーションコンテナを準備
    simulationContainer.innerHTML = '';
    const simulationTitle = document.createElement('h3');
    simulationTitle.textContent = 'ライフゲームシミュレーション';
    simulationContainer.appendChild(simulationTitle);
    
    const simulationGridContainer = document.createElement('div');
    simulationGridContainer.className = 'simulation-grid';
    simulationContainer.appendChild(simulationGridContainer);
    
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'simulation-controls';
    controlsContainer.innerHTML = `
        <button id="startSimulation">開始</button>
        <button id="stopSimulation" disabled>停止</button>
        <button id="stepSimulation">1ステップ進める</button>
        <button id="resetSimulation">リセット</button>
    `;
    simulationContainer.appendChild(controlsContainer);
    
    // グリッドの初期化
    simulationGrid = JSON.parse(JSON.stringify(initialGrid)); // ディープコピー
    displayGrid(simulationGrid, simulationGridContainer);
    
    // コントロールボタンのイベントリスナー
    document.getElementById('startSimulation').addEventListener('click', () => {
        if (!isSimulationRunning) {
            isSimulationRunning = true;
            document.getElementById('startSimulation').disabled = true;
            document.getElementById('stopSimulation').disabled = false;
            document.getElementById('stepSimulation').disabled = true;
            
            function loop() {
                if (isSimulationRunning) {
                    stepSimulation();
                    simulationAnimationId = setTimeout(loop, 500);
                }
            }
            loop();
        }
    });
    
    document.getElementById('stopSimulation').addEventListener('click', () => {
        stopSimulation();
    });
    
    document.getElementById('stepSimulation').addEventListener('click', () => {
        stepSimulation();
    });
    
    document.getElementById('resetSimulation').addEventListener('click', () => {
        stopSimulation();
        simulationGrid = JSON.parse(JSON.stringify(initialGrid)); // ディープコピー
        displayGrid(simulationGrid, simulationGridContainer);
    });
    
    // シミュレーションの1ステップを進める関数
    async function stepSimulation() {
        const response = await fetch("/test/step", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ grid: simulationGrid })
        });
        
        const data = await response.json();
        simulationGrid = data.grid;
        displayGrid(simulationGrid, simulationGridContainer);
    }
}

// シミュレーションを停止する関数
function stopSimulation() {
    isSimulationRunning = false;
    clearTimeout(simulationAnimationId);
    
    const startButton = document.getElementById('startSimulation');
    const stopButton = document.getElementById('stopSimulation');
    const stepButton = document.getElementById('stepSimulation');
    
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
    if (stepButton) stepButton.disabled = false;
}


// すべてのテストを実行
async function runAllTests() {
    let passCount = 0;
    
    // ステータスをリセット
    document.querySelectorAll('.test-status').forEach(status => {
        status.className = 'test-status';
        status.textContent = '';
    });
    
    // 各テストケースの結果をクリア
    document.querySelectorAll('.test-result').forEach(result => {
        result.innerHTML = '';
    });
    
    for (const test of testCases) {
        const passed = await runSingleTest(test.id);
        if (passed) passCount++;
    }
    
    // サマリーを表示
    testSummaryContainer.textContent = `テスト結果: ${passCount}/${testCases.length} 成功`;
}

// イベントリスナーの設定
runAllTestsButton.addEventListener('click', runAllTests);

// ミニグリッドを表示する関数
function displayMiniGrid(grid, container, centerX, centerY) {
    container.innerHTML = '';
    
    // 中心座標を計算（5x5のグリッドの場合）
    const startX = Math.max(0, centerX - 2);
    const startY = Math.max(0, centerY - 2);
    const endX = Math.min(grid.length, startX + 5);
    const endY = Math.min(grid[0].length, startY + 5);
    
    for (let i = startX; i < endX; i++) {
        for (let j = startY; j < endY; j++) {
            const cell = document.createElement('div');
            cell.className = 'mini-cell' + (grid[i][j] ? ' alive' : '');
            container.appendChild(cell);
        }
    }
}

// テストケースのビジュアルイメージを初期化
function initializeTestVisualizations() {
    testCases.forEach(test => {
        const initialGrid = test.setup();
        const center = getCenterCoordinates(test.id);
        
        // 初期グリッドを表示
        const initialContainer = document.getElementById(`mini-initial-${test.id}`);
        if (initialContainer) {
            displayMiniGrid(initialGrid, initialContainer, center.x, center.y);
        }
        
        // 次のステップのグリッドを計算して表示
        fetch("/test/step", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ grid: initialGrid })
        })
        .then(response => response.json())
        .then(data => {
            const nextGrid = data.grid;
            const nextContainer = document.getElementById(`mini-next-${test.id}`);
            if (nextContainer) {
                displayMiniGrid(nextGrid, nextContainer, center.x, center.y);
            }
        });
        
        // 正解パターンのグリッドを表示
        const expectedGrid = test.expectedGrid();
        const expectedContainer = document.getElementById(`mini-expected-${test.id}`);
        if (expectedContainer) {
            displayMiniGrid(expectedGrid, expectedContainer, center.x, center.y);
        }
    });
}

// 初期化
displayTestCases();
// テストケースのビジュアルイメージを初期化
setTimeout(initializeTestVisualizations, 500);
