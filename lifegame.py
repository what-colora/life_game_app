
def next_step(grid):
    # グリッドは たて:よこ = 30:30マス
    size = 30
    # 1ステップ進めた後の、グリッド情報保存用の2次元配列。結果格納用
    result = [[0 for _ in range(size)] for _ in range(size)]

    # グリッドを走査する2重ループ。
    # iは行（たて）、jは列（よこ）方向
    for i in range(size):
        for j in range(size):
            # 自身の周囲8セルの走査(下図で×からみて○が対象)
            #   ○○○
            #   ○×○
            #   ○○○
            # 周囲8セルにおいて生存セルの合計数を変数neighborsに格納
            neighbors = sum(grid[x][y] for x in range(max(0, i-1), min(size, i+2))
                           for y in range(max(0, j-1), min(size, j+2)) if (x, y) != (i, j))
            # 自身が生存セルの場合の処理
            if grid[i][j] == 1:
                result[i][j] = 1 if neighbors in [2, 3] else 0
            # 自身が死亡セルの場合の処理
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            #else:
            #    result[i][j] = 1 if neighbors == 3 else 0
=======
            else:
                result[i][j] = 1 if neighbors == 3 else 0
>>>>>>> what-colora/main
=======
            else:
                result[i][j] = 1 if neighbors == 3 else 0
>>>>>>> what-colora/main
=======
            else:
                result[i][j] = 1 if neighbors == 3 else 0
>>>>>>> what-colora/main

    return result

if __name__ == "__main__":
    next_step()