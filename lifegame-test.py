import unittest
from lifegame import next_step

class TestLifeGame(unittest.TestCase):
    def setUp(self):
        # グリッドサイズ
        self.size = 30
        # 空のグリッド
        self.empty_grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        
    def test_empty_grid_stays_empty(self):
        """空のグリッドは次のステップでも空のままであることをテスト"""
        result = next_step(self.empty_grid)
        self.assertEqual(result, self.empty_grid)
        
    def test_single_cell_dies(self):
        """単一のセルは孤独で死ぬことをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        grid[10][10] = 1  # 中央に1つのセルを配置
        result = next_step(grid)
        self.assertEqual(result[10][10], 0)  # 次のステップでは死んでいるはず
        
    def test_block_pattern_stable(self):
        """ブロックパターン（2x2）は安定していることをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # 2x2のブロックを作成
        grid[10][10] = 1
        grid[10][11] = 1
        grid[11][10] = 1
        grid[11][11] = 1
        
        result = next_step(grid)
        
        # ブロックは安定しているはず
        self.assertEqual(result[10][10], 1)
        self.assertEqual(result[10][11], 1)
        self.assertEqual(result[11][10], 1)
        self.assertEqual(result[11][11], 1)
        
    def test_blinker_pattern_oscillates(self):
        """ブリンカーパターン（縦3つ）が振動することをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # 縦3つのブリンカーを作成
        grid[10][10] = 1
        grid[11][10] = 1
        grid[12][10] = 1
        
        # 1ステップ後
        result1 = next_step(grid)
        # 横3つに変わるはず
        self.assertEqual(result1[11][9], 1)
        self.assertEqual(result1[11][10], 1)
        self.assertEqual(result1[11][11], 1)
        self.assertEqual(result1[10][10], 0)
        self.assertEqual(result1[12][10], 0)
        
        # 2ステップ後
        result2 = next_step(result1)
        # 元の縦3つに戻るはず
        self.assertEqual(result2[10][10], 1)
        self.assertEqual(result2[11][10], 1)
        self.assertEqual(result2[12][10], 1)
        self.assertEqual(result2[11][9], 0)
        self.assertEqual(result2[11][11], 0)
        
    def test_glider_pattern_moves(self):
        """グライダーパターンが移動することをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # グライダーを作成
        grid[1][2] = 1
        grid[2][3] = 1
        grid[3][1] = 1
        grid[3][2] = 1
        grid[3][3] = 1
        
        # 4ステップ後、グライダーは右下に移動しているはず
        result = grid
        for _ in range(4):
            result = next_step(result)
            
        # グライダーの新しい位置を確認
        self.assertEqual(result[3][3], 1)
        self.assertEqual(result[4][4], 1)
        self.assertEqual(result[5][2], 1)
        self.assertEqual(result[5][3], 1)
        self.assertEqual(result[5][4], 1)
        
    def test_three_neighbors_birth(self):
        """死んでいるセルの周りに3つの生きたセルがあると誕生することをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # 3つの生きたセルを配置
        grid[10][9] = 1
        grid[10][11] = 1
        grid[11][10] = 1
        
        result = next_step(grid)
        # 中央のセルが誕生するはず
        self.assertEqual(result[10][10], 1)
        
    def test_overpopulation_death(self):
        """過密（4つ以上の隣接セル）で死ぬことをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # 中央のセルとその周りに4つのセルを配置
        grid[10][10] = 1  # 中央
        grid[9][9] = 1
        grid[9][10] = 1
        grid[9][11] = 1
        grid[10][9] = 1
        
        result = next_step(grid)
        # 中央のセルは過密で死ぬはず
        self.assertEqual(result[10][10], 0)
        
    def test_underpopulation_death(self):
        """過疎（1つ以下の隣接セル）で死ぬことをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # 中央のセルとその周りに1つのセルを配置
        grid[10][10] = 1  # 中央
        grid[9][9] = 1
        
        result = next_step(grid)
        # 中央のセルは過疎で死ぬはず
        self.assertEqual(result[10][10], 0)
        
    def test_survival_with_two_or_three_neighbors(self):
        """2つまたは3つの隣接セルがあると生存することをテスト"""
        # 2つの隣接セルでのテスト
        grid1 = [[0 for _ in range(self.size)] for _ in range(self.size)]
        grid1[10][10] = 1  # 中央
        grid1[9][9] = 1
        grid1[9][10] = 1
        
        result1 = next_step(grid1)
        # 中央のセルは生存するはず
        self.assertEqual(result1[10][10], 1)
        
        # 3つの隣接セルでのテスト
        grid2 = [[0 for _ in range(self.size)] for _ in range(self.size)]
        grid2[10][10] = 1  # 中央
        grid2[9][9] = 1
        grid2[9][10] = 1
        grid2[9][11] = 1
        
        result2 = next_step(grid2)
        # 中央のセルは生存するはず
        self.assertEqual(result2[10][10], 1)
        
    def test_edge_cases(self):
        """グリッドの端のセルが正しく処理されることをテスト"""
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        # 左上の角に3つのセルを配置
        grid[0][0] = 1
        grid[0][1] = 1
        grid[1][0] = 1
        
        result = next_step(grid)
        # 右下のセルが誕生するはず
        self.assertEqual(result[1][1], 1)
        
        # 右下の角に3つのセルを配置
        grid = [[0 for _ in range(self.size)] for _ in range(self.size)]
        grid[self.size-1][self.size-1] = 1
        grid[self.size-2][self.size-1] = 1
        grid[self.size-1][self.size-2] = 1
        
        result = next_step(grid)
        # 左上のセルが誕生するはず
        self.assertEqual(result[self.size-2][self.size-2], 1)

if __name__ == "__main__":
    unittest.main()
