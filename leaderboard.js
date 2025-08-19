/**
 * NOKIA*SNAKC_2077 - Leaderboard Data Management
 * Leaderboard data management system
 */

class LeaderboardManager {
  constructor() {
    this.STORAGE_KEYS = {
      LEADERBOARD: 'cyber-snake-leaderboard',
      PLAYER_NAME: 'cyber-snake-name',
      PLAYER_STATS: 'cyber-snake-player-stats',
      BEST_SCORE: 'cyber-snake-best'
    };
    
    this.MAX_LEADERBOARD_SIZE = 50;
    this.DEFAULT_PLAYER_STATS = {
      gamesPlayed: 0,
      totalScore: 0,
      avgScore: 0
    };
  }

  /**
   * Get leaderboard data
   * @param {number} limit - Limit for number of records returned
   * @returns {Array} Array of leaderboard records
   */
  getLeaderboard(limit = 10) {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.LEADERBOARD);
      const scores = saved ? JSON.parse(saved) : [];
      return scores
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get leaderboard data:', error);
      return [];
    }
  }

  /**
   * 提交新分數到排行榜
   * @param {Object} scoreData - 分數數據
   * @param {string} scoreData.name - 玩家名稱
   * @param {number} scoreData.score - 分數
   * @param {string} scoreData.difficulty - 難度
   * @returns {boolean} 提交是否成功
   */
  submitScore({ name, score, difficulty }) {
    try {
      if (!name?.trim() || score <= 0) {
        throw new Error('Invalid score data');
      }

      // 獲取現有排行榜
      const scores = this.getLeaderboard(this.MAX_LEADERBOARD_SIZE);
      
      // 創建新記錄
      const newEntry = {
        name: name.trim(),
        score: score,
        difficulty: difficulty,
        timestamp: Date.now(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      };

      // 添加到排行榜並排序
      scores.push(newEntry);
      scores.sort((a, b) => b.score - a.score);
      
      // 保存限制數量的記錄
      const limitedScores = scores.slice(0, this.MAX_LEADERBOARD_SIZE);
      localStorage.setItem(
        this.STORAGE_KEYS.LEADERBOARD, 
        JSON.stringify(limitedScores)
      );

      // 保存玩家名稱
      this.savePlayerName(name.trim());

      return true;
    } catch (error) {
      console.error('Failed to submit score:', error);
      return false;
    }
  }

  /**
   * 獲取玩家統計數據
   * @returns {Object} 玩家統計
   */
  getPlayerStats() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.PLAYER_STATS);
      return saved ? JSON.parse(saved) : { ...this.DEFAULT_PLAYER_STATS };
    } catch (error) {
      console.error('Failed to get player stats:', error);
      return { ...this.DEFAULT_PLAYER_STATS };
    }
  }

  /**
   * Update player statistics
   * @param {number} gameScore - Current game score
   * @returns {Object} Updated statistics data
   */
  updatePlayerStats(gameScore) {
    try {
      const currentStats = this.getPlayerStats();
      const newStats = {
        gamesPlayed: currentStats.gamesPlayed + 1,
        totalScore: currentStats.totalScore + gameScore,
        avgScore: Math.round((currentStats.totalScore + gameScore) / (currentStats.gamesPlayed + 1))
      };

      localStorage.setItem(
        this.STORAGE_KEYS.PLAYER_STATS, 
        JSON.stringify(newStats)
      );

      return newStats;
    } catch (error) {
      console.error('Failed to update player stats:', error);
      return this.getPlayerStats();
    }
  }

  /**
   * 獲取玩家名稱
   * @returns {string} 玩家名稱
   */
  getPlayerName() {
    return localStorage.getItem(this.STORAGE_KEYS.PLAYER_NAME) || 'Player';
  }

  /**
   * 保存玩家名稱
   * @param {string} name - 玩家名稱
   */
  savePlayerName(name) {
    if (name?.trim()) {
      localStorage.setItem(this.STORAGE_KEYS.PLAYER_NAME, name.trim());
    }
  }

  /**
   * 獲取個人最佳分數
   * @returns {number} 最佳分數
   */
  getBestScore() {
    return parseInt(localStorage.getItem(this.STORAGE_KEYS.BEST_SCORE) || '0', 10);
  }

  /**
   * 更新個人最佳分數
   * @param {number} score - 新分數
   * @returns {number} 更新後的最佳分數
   */
  updateBestScore(score) {
    const currentBest = this.getBestScore();
    const newBest = Math.max(currentBest, score);
    localStorage.setItem(this.STORAGE_KEYS.BEST_SCORE, String(newBest));
    return newBest;
  }

  /**
   * 獲取玩家在排行榜中的排名
   * @param {string} playerName - 玩家名稱
   * @returns {number|null} 排名（從1開始），如果未找到返回null
   */
  getPlayerRank(playerName) {
    const leaderboard = this.getLeaderboard(this.MAX_LEADERBOARD_SIZE);
    const playerEntry = leaderboard.find(entry => entry.name === playerName);
    return playerEntry ? leaderboard.indexOf(playerEntry) + 1 : null;
  }

  /**
   * 清除所有數據（重置功能）
   */
  clearAllData() {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * 導出數據（備份功能）
   * @returns {Object} 所有數據
   */
  exportData() {
    const data = {};
    Object.entries(this.STORAGE_KEYS).forEach(([key, storageKey]) => {
      const value = localStorage.getItem(storageKey);
      data[key] = value ? JSON.parse(value) : null;
    });
    return data;
  }

  /**
   * 導入數據（恢復功能）
   * @param {Object} data - 要導入的數據
   */
  importData(data) {
    Object.entries(this.STORAGE_KEYS).forEach(([key, storageKey]) => {
      if (data[key] !== null && data[key] !== undefined) {
        localStorage.setItem(storageKey, JSON.stringify(data[key]));
      }
    });
  }

  /**
   * 獲取統計摘要
   * @returns {Object} 統計摘要
   */
  getStatsSummary() {
    const leaderboard = this.getLeaderboard();
    const playerStats = this.getPlayerStats();
    const bestScore = this.getBestScore();
    
    return {
      totalPlayers: new Set(leaderboard.map(entry => entry.name)).size,
      totalGames: leaderboard.length,
      highestScore: leaderboard[0]?.score || 0,
      playerStats: playerStats,
      playerBest: bestScore,
      playerRank: this.getPlayerRank(this.getPlayerName())
    };
  }
}

// 創建全局實例
window.LeaderboardManager = new LeaderboardManager();

// 導出給模組系統使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LeaderboardManager;
}
