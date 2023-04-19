# HaHow Projec(Heroes)

此文件將紀錄 HaHow Project 的各項說明，包含使用方式、資料夾結構、元件切分、第三方套件使用、開發歷程等等

Outline:

- [HaHow Projec(Heroes)](#hahow-projecheroes)
  - [介紹與使用方式](#介紹與使用方式)
  - [資料夾結構](#資料夾結構)
  - [API 使用](#api-使用)
  - [元件切分](#元件切分)
  - [第三方套件使用](#第三方套件使用)
  - [開發歷程](#開發歷程)

## 介紹與使用方式

此專案主要呈現一個英雄列表，點擊各英雄後可以查看其能力值，並進行修改

如何執行:

1. 將專案 clone 下來以後，請下
   ```
   npm ci
   ```
2. 下以下指令即可將專案跑起來

   ```
   npm run dev
   ```

   指令結束後 瀏覽器輸入以下網址，即可進入頁面

   ```
   http://localhost:5173/heroes
   ```

3. 如果想以 build 好的方式查看，可以下以下指令

   ```
   npm run build
   npm run preview
   ```

   指令結束後 瀏覽器輸入以下網址，即可進入頁面

   ```
   http://localhost:4173/heroes
   ```

## 資料夾結構

```
  src/
  ├─ main.txs
  ├─ index.css
  ├─ App.css
  ├─ App.txs
  ├─ assets/
  │  └─ react.svg
  ├─ components/
  │  └─ Heroes/
  │     ├─ AbilitiesSetting.tsx
  |     ├─ HeroCard.tsx
  │     ├─ HeroCardList.tsx
  │     ├─ AbilityTitle.tsx
  │     ├─ AbilityValue.tsx
  │     ├─ AddButton.tsx
  │     ├─ MinusButton.tsx
  │     ├─ SaveButton.tsx
  │     └─ index.ts
  ├─ context/
  │  ├─ index.tsx
  │  └─ ListAndProfileContext.tsx
  ├─ pages/
  │  ├─ ErrorBoundaryPage.tsx
  │  ├─ Home.tsx
  │  └─ ListAndProfile.tsx
  ├─ services/
  │  ├─ types/
  │  │  ├─ heroes.ts
  │  │  └─ index.ts
  │  └─ heroes
  │     ├─ heroes.ts
  │     └─ index.ts
  └─ utils/
     ├─ api-helper.ts
     └─ index.ts
```

## API 使用

相關請參考[API 使用說明](https://github.com/hahow/hahow-recruit/blob/master/frontend.md)

## 元件切分

主要切分為 Hero Card List 跟 Abilities Setting 兩個元件，再從這兩個元件去細碎化出小元件組起來，結構如下:

1. Hero Card List
   - Hero Card
2. Abilities Setting
   - AbilityTitle
   - AbilityValue
   - AddButton
   - MinusButton
   - SaveButton

## 第三方套件使用

1. Material-ui
   - 已提供現有視覺上較好的元件
   - 使用上較熟悉
   - 內建有類似 styled-components 的套件
   - 依需求可以客製化 theme
2. axios
   - 基於 Promise 的 HTTP 請求工具
   - 擴展性較高，未來可以實作 interceptor、cancellation
3. react-router-dom
   - 是 React 的路由解决方案，它可以讓 UI 可以與 URL 同步。
   - 實作 router control
4. typescript
   - 增加程式的嚴謹性
   - 開發上 vs code 的 intelligence 會較為方便
5. commitizen
   - 指令式的工具
   - 使用問答的方式，讓使用者在完成問答時就可以邊寫出符合規範的訊息，以減少來回的次數
   - 確保 commit message 格式一致

## 開發歷程

### 開發步驟

1. 初步評估
   - 先了解專案需求，初步選擇開發工具與模組
   - 為何使用 vite:
     - 啟動快
     - 動態編譯的方式，極大的縮減了編譯時間，專案越複雜、模組越多，優勢越明顯。
2. Routing 設定
   - 需求有提到 List 畫面不能重 render，因此設計上把兩種 routing 都導置同一個元件
3. API 開發
   - 透過 API 文件，確認使用情境，把需要的 API 串接起來
4. Hero Card List 元件開發與互動串接
   - 透過 Mui Card 實作顯示列表
   - 用 useNavigate 改變 url
   - 用 useParams 取得 id，然後取得英雄數值，傳到 Abilities Setting
5. Abilities Setting 元件開發與互動串接
   - 先將顯示外殼建構完畢
   - 把按鈕互動功能完善
   - 確認更新資料正確
   - 補上驗證、防呆機制
6. 程式重構
   - 重新審視程式碼，進行元件細碎化，簡化描述
   - 調整元件 state 的使用方式
   - 提升體驗的行為與效能 ex.提示、按鈕轉圈、防止誤觸等等

### 註解原則

- 重要的 funtion 會在第一行註解描述其行為
- function、變數的命名盡量一目了然易懂，描述其行為

### 開發上的困境

- 功能的實作上其實並不困難，但初版完成後，如何優化跟切分程式、元件是比較需要花時間思考的部分
- 需要不斷的練習跟嘗試調整，或是跟其他人溝通交流討論，才能慢慢讓程式架構越來越好
