# 🚀 部署指南 - NOKIA*SNAKC_2077

## 📋 Replit 部署步驟

### 1. 創建 Replit 項目
1. 登入 [Replit.com](https://replit.com)
2. 點擊 "Create Repl"
3. 選擇 "Import from GitHub" 或 "HTML/CSS/JS"
4. 上傳項目文件

### 2. 項目配置
確保以下文件存在：
- `.replit` - Replit 運行配置
- `replit.nix` - 環境依賴配置
- `package.json` - 項目元數據

### 3. 運行項目
1. 點擊綠色的 "Run" 按鈕
2. Replit 會自動啟動 Python HTTP 服務器
3. 遊戲將在新標籤頁中打開

### 4. 自定義域名 (可選)
1. 在 Replit 中打開項目設置
2. 找到 "Custom Domain" 選項
3. 設置你的自定義域名

## 🌐 其他部署選項

### GitHub Pages
1. 將項目推送到 GitHub
2. 在 repository 設置中啟用 GitHub Pages
3. 選擇 `main` 分支作為源
4. 訪問 `https://username.github.io/repository-name`

### Netlify
1. 連接 GitHub repository 到 Netlify
2. 設置構建命令為空（靜態文件）
3. 發布目錄設為根目錄 `/`
4. 自動部署已配置

### Vercel
1. 導入 GitHub repository 到 Vercel
2. 框架預設選擇 "Other"
3. 構建命令留空
4. 輸出目錄設為 `./`

## ⚙️ 環境配置

### 必需的文件
```
project/
├── index.html          # 主遊戲文件
├── leaderboard.js      # 數據管理
├── admin.html          # 管理面板
├── .replit            # Replit 配置
├── replit.nix         # 環境配置
└── package.json       # 項目信息
```

### 端口配置
- **Replit**: 自動配置端口 3000
- **本地開發**: 默認端口 8000
- **自定義**: 修改 `.replit` 文件中的端口

## 🔧 故障排除

### 常見問題

#### 1. 遊戲無法載入
- 檢查瀏覽器控制台錯誤
- 確保所有文件路徑正確
- 驗證 HTTP 服務器是否正常運行

#### 2. 音效不工作
- 確保瀏覽器支持 Web Audio API
- 檢查瀏覽器是否允許自動播放
- 嘗試用戶交互後再播放音效

#### 3. 數據不保存
- 確保瀏覽器支持 localStorage
- 檢查是否在隱私模式下運行
- 驗證域名是否一致

#### 4. 響應式問題
- 檢查 viewport meta 標籤
- 測試不同設備和屏幕尺寸
- 驗證 CSS 媒體查詢

### 調試步驟
1. 打開瀏覽器開發者工具
2. 檢查 Console 標籤頁的錯誤信息
3. 在 Network 標籤頁檢查文件載入狀態
4. 使用 Application 標籤頁檢查 localStorage

## 📊 性能優化

### 建議的優化
1. **圖片優化**: 使用適當的圖片格式和大小
2. **代碼壓縮**: 在生產環境中壓縮 JS/CSS
3. **緩存策略**: 設置適當的 HTTP 緩存頭
4. **CDN**: 使用 CDN 加速靜態資源載入

### 監控指標
- 頁面載入時間
- JavaScript 執行時間
- 內存使用情況
- 網路請求數量

## 🔒 安全考慮

### 數據安全
- 所有數據存儲在客戶端 localStorage
- 沒有敏感信息傳輸
- 不需要用戶認證系統

### 內容安全
- 避免 XSS 攻擊的輸入驗證
- 適當的 CSP 標頭設置
- 安全的第三方資源載入

## 📈 分析和監控

### 建議的工具
- **Google Analytics**: 用戶行為分析
- **Sentry**: 錯誤監控和報告
- **PageSpeed Insights**: 性能分析

### 關鍵指標
- 日活躍用戶數
- 平均遊戲時長
- 錯誤率和崩潰率
- 不同設備的使用情況

---

需要幫助？請查看 [README.md](README.md) 或提交 Issue。
