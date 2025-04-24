
def next_step(grid):    
    # グリッドのサイズ たて:よこ = 30:30マス
    size = 30
    # 結果格納用の2次元配列
    result = [[0 for _ in range(size)] for _ in range(size)]

    # 現在地(grid[i][j])の周囲8セルに存在する生存セル(1)の個数をカウントする関数
    def count_neighbors(i,j):
        res = 0
        res = sum(grid[x][y] for x in range(max(0, i-1), min(size, i+2))
                    for y in range(max(0, j-1), min(size, j+2)) if (x, y) != (i, j))

        return res

    # 次ステップのグリッドの描画・計算処理
    for i in range(size):
        for j in range(size):
            # 現在地(grid[i][j])の周囲8セルにある生存セルの個数
            neighbors = count_neighbors(i,j)
        
            # 現在地(grid[i][j])が生存セル(1)の場合の処理
            if grid[i][j] == 1:
                result[i][j] = 1 if neighbors in [2, 3] else 0    
            # 現在地(grid[i][j])が死亡セル(0)の場合の処理
            else:
                result[i][j] = 1 if neighbors == 3 else 0

    return result

if __name__ == "__main__":
    next_step()

