// AI 对话数据
// type: "embedded" → 对话内容存在 messages 数组，站内渲染
// type: "link"     → 只存分享链接，点击跳转到 Claude 原页面
const CHATS_DATA = [
  // ===== 链接类型示例 =====
  {
    id: "claude-share-1",
    type: "link",
    title: "Claude 分享对话示例",
    ai: "Claude",
    ai_icon: "🤖",
    date: "2026-03-26",
    category: "示例",
    preview: "这是一个通过 Claude 分享链接添加的对话卡片，点击可在 Claude 原页面查看完整内容。",
    cover_emoji: "🔗",
    cover_color: "linear-gradient(135deg, #f093fb, #f5576c)",
    share_url: "https://claude.ai/share/351a886c-d37f-4cae-962d-539653e9c9fa"
  },
  {
    id: "fitness-plan",
    title: "健身计划制定",
    ai: "Claude",
    ai_icon: "🤖",
    date: "2025-03-15",
    category: "生活",
    preview: "我想制定一个适合上班族的健身计划，每周3-4次，主要目标是增肌减脂...",
    cover_emoji: "💪",
    cover_color: "linear-gradient(135deg, #667eea, #764ba2)",
    messages: [
      {
        role: "user",
        content: "我想制定一个适合上班族的健身计划，每周锻炼3-4次，主要目标是增肌减脂。我目前是男性，25岁，身高175cm，体重75kg，有一点基础但不系统。"
      },
      {
        role: "assistant",
        content: "很好！根据你的情况，我来为你设计一个科学合理的健身计划。\n\n**基本评估**\n- 你的 BMI ≈ 24.5，属于正常偏重范围\n- 增肌减脂需要「体成分改善」，需要饮食和训练双管齐下\n\n**每周训练安排（推荐「推拉腿」分化）**\n\n**Day 1 - 推（胸 + 肩 + 三头）**\n- 卧推：4组 × 8-10次\n- 哑铃飞鸟：3组 × 12次\n- 肩推：3组 × 10次\n- 侧平举：3组 × 15次\n- 绳索下压：3组 × 12次\n\n**Day 2 - 拉（背 + 二头）**\n- 引体向上：4组 × 力竭\n- 杠铃划船：4组 × 8-10次\n- 高位下拉：3组 × 12次\n- 面拉：3组 × 15次\n- 哑铃弯举：3组 × 12次\n\n**Day 3 - 休息或有氧 30 分钟**\n\n**Day 4 - 腿（股四头 + 腘绳肌 + 臀）**\n- 深蹲：4组 × 8-10次\n- 腿举：3组 × 12次\n- 腿弯举：3组 × 12次\n- 臀推：3组 × 15次\n- 站姿提踵：4组 × 20次\n\n**Day 5 - 全身有氧/核心**\n- HIIT 20分钟 + 核心训练 15分钟\n\n**饮食建议**\n- 热量：维持略有盈余（+200-300 kcal）支持增肌，同时保持蛋白质充足\n- 蛋白质：每公斤体重 1.6-2g，即每天 120-150g\n- 少精制碳水，多优质碳水（燕麦、糙米、红薯）\n- 训练后 30 分钟内补充蛋白质+碳水\n\n**关键提示**\n1. 渐进超负荷是增肌核心：每周尝试增加重量或次数\n2. 睡眠是恢复的基础，保证 7-8 小时\n3. 第一个月先打好基础动作形式，重量不要急\n\n要我帮你细化某一天的训练或提供饮食菜单吗？"
      },
      {
        role: "user",
        content: "这个计划看起来很棒！能帮我把每天的训练时间控制在1小时以内吗？另外我家附近没有健身房，只有哑铃和一个引体向上架。"
      },
      {
        role: "assistant",
        content: "完全没问题！哑铃 + 引体向上架其实可以覆盖绝大多数训练动作。我来调整为家庭版本，每次控制在 **55-60 分钟**内。\n\n**家庭版训练计划（哑铃 + 引体向上架）**\n\n---\n\n**Day 1 - 推（胸 + 肩 + 三头）| 约55分钟**\n\n热身 5 分钟（跳绳 / 原地高抬腿）\n\n| 动作 | 组数 | 次数 | 间歇 |\n|------|------|------|------|\n| 俯卧撑（可加重心前移变化） | 4 | 10-15 | 60s |\n| 哑铃卧推（地板版） | 4 | 8-10 | 90s |\n| 哑铃飞鸟（地板） | 3 | 12 | 60s |\n| 哑铃肩推 | 3 | 10 | 60s |\n| 哑铃侧平举 | 3 | 15 | 45s |\n| 窄距俯卧撑 / 哑铃臂屈伸 | 3 | 12 | 60s |\n\n拉伸 5 分钟\n\n---\n\n**Day 2 - 拉（背 + 二头）| 约55分钟**\n\n| 动作 | 组数 | 次数 | 间歇 |\n|------|------|------|------|\n| 引体向上（正手宽握） | 4 | 力竭 | 90s |\n| 引体向上（反手窄握） | 3 | 力竭 | 90s |\n| 哑铃单臂划船 | 4 | 10/侧 | 60s |\n| 哑铃俯身划船 | 3 | 12 | 60s |\n| 俯卧两头起（背部伸展） | 3 | 15 | 45s |\n| 哑铃弯举 | 3 | 12 | 45s |\n\n---\n\n**Day 3 - 休息 / 散步 30 分钟**\n\n---\n\n**Day 4 - 腿 + 核心 | 约55分钟**\n\n| 动作 | 组数 | 次数 | 间歇 |\n|------|------|------|------|\n| 哑铃深蹲 | 4 | 12 | 90s |\n| 哑铃保加利亚深蹲 | 3 | 10/腿 | 60s |\n| 哑铃直腿硬拉 | 3 | 12 | 60s |\n| 哑铃臀推 | 3 | 15 | 60s |\n| 单腿提踵 | 3 | 20/腿 | 30s |\n| 平板支撑 | 3 | 45s | 30s |\n| 卷腹 | 3 | 20 | 30s |\n\n---\n\n**几个调整说明**\n- 「地板哑铃卧推」代替卧推台，活动范围略小但完全有效\n- 引体向上做不了的话先做「辅助引体」（双脚踩凳子借力）\n- 哑铃重量选择：做到最后2次明显费力就合适\n\n需要我帮你规划热量和每日饮食方案吗？"
      },
      {
        role: "user",
        content: "太详细了！帮我做个简洁的饮食方案吧，我平时在外面吃饭比较多。"
      },
      {
        role: "assistant",
        content: "外食党的饮食方案来了！原则：**不追求完美，追求可执行**。\n\n**每日营养目标**\n| | 目标 |\n|---|---|\n| 热量 | ~2400 kcal |\n| 蛋白质 | 130-150g |\n| 碳水 | 250-280g |\n| 脂肪 | 60-70g |\n\n---\n\n**外食选择指南**\n\n**早餐（自己准备，10分钟）**\n- 鸡蛋 2个 + 燕麦 50g + 牛奶 / 豆浆 250ml\n- 或：全麦面包 2片 + 鸡蛋 2个 + 希腊酸奶 1杯\n\n**午餐（外食）**\n✅ 推荐选择：\n- 快餐：一荤一素 + 米饭（少浇汁）\n- 沙拉碗：鸡胸肉 / 牛肉 + 杂粮\n- 米线/面：清汤款 + 加蛋加肉\n- 日料：三文鱼饭 / 鸡肉饭团\n\n❌ 少选：麻辣烫满满油 / 奶茶套餐 / 炒饭加蛋\n\n**下午点心（可选）**\n- 一把坚果（20g）+ 鸡蛋或蛋白棒\n\n**晚餐（外食）**\n- 原则：减少碳水量，增加蛋白质\n- 例：米饭半碗 + 清蒸鱼 / 白切鸡 / 牛肉\n- 或：冒菜/火锅（少油碟，多涮肉少宽粉）\n\n**训练后加餐（如果晚上训练）**\n- 蛋白粉 1勺 + 香蕉 1根，简单快速\n\n---\n\n**外食3条原则**\n1. **每餐必须有蛋白质**：鸡蛋、鸡肉、鱼、豆腐选一个\n2. **主食不戒，但控量**：一碗饭而非两碗\n3. **喝水不喝饮料**：省出来的热量和钱都很可观\n\n坚持 8 周，体成分肯定会有明显变化！加油 💪"
      }
    ]
  },
  {
    id: "web-performance",
    title: "网站性能优化方案",
    ai: "Claude",
    ai_icon: "🤖",
    date: "2025-03-20",
    category: "技术",
    preview: "我的网站首页加载很慢，Lighthouse 评分只有 42 分，帮我分析一下怎么优化...",
    cover_emoji: "⚡",
    cover_color: "linear-gradient(135deg, #f093fb, #f5576c)",
    messages: [
      {
        role: "user",
        content: "我的网站首页加载很慢，Lighthouse 评分只有 42 分，帮我分析一下怎么优化。主要问题是 LCP 6.2s，FID 高，CLS 0.35。"
      },
      {
        role: "assistant",
        content: "你的三个核心指标都需要优化，我来逐一分析和给出具体方案：\n\n## LCP 6.2s → 目标 < 2.5s\n\nLCP（最大内容绘制）慢通常有几个根本原因：\n\n**1. 图片未优化（最常见原因）**\n```html\n<!-- 问题写法 -->\n<img src=\"hero.jpg\" />\n\n<!-- 优化写法 -->\n<img\n  src=\"hero.webp\"\n  srcset=\"hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w\"\n  sizes=\"(max-width: 768px) 100vw, 1200px\"\n  loading=\"eager\"\n  fetchpriority=\"high\"\n  alt=\"Hero\"\n/>\n```\n\n**2. 关键资源没有预加载**\n```html\n<head>\n  <!-- 预加载首屏字体 -->\n  <link rel=\"preload\" href=\"/fonts/main.woff2\" as=\"font\" crossorigin>\n  <!-- 预加载 LCP 图片 -->\n  <link rel=\"preload\" href=\"/hero.webp\" as=\"image\">\n  <!-- 预连接第三方域名 -->\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n</head>\n```\n\n**3. 服务端响应慢（TTFB > 800ms）**\n- 开启服务器端缓存（Redis/Nginx Cache）\n- 使用 CDN 加速静态资源\n- 检查数据库查询是否有慢查询\n\n---\n\n## FID 高 → 目标 < 100ms\n\nFID 高说明主线程被长任务阻塞，常见原因：\n\n**1. JavaScript 包太大，解析耗时**\n```js\n// 路由懒加载\nconst HomePage = React.lazy(() => import('./pages/Home'));\n\n// 或者 Vite / webpack 动态 import\nconst { heavyLib } = await import('./heavy-lib');\n```\n\n**2. 第三方脚本阻塞**\n```html\n<!-- 加 async 或 defer，避免阻塞 -->\n<script src=\"analytics.js\" defer></script>\n<script src=\"chat-widget.js\" async></script>\n```\n\n**3. 长任务切片**\n```js\n// 使用 scheduler 或 setTimeout 分批处理\nfunction processItems(items) {\n  const CHUNK = 50;\n  let i = 0;\n  function processChunk() {\n    const end = Math.min(i + CHUNK, items.length);\n    while (i < end) process(items[i++]);\n    if (i < items.length) setTimeout(processChunk, 0);\n  }\n  processChunk();\n}\n```\n\n---\n\n## CLS 0.35 → 目标 < 0.1\n\nCLS 高说明页面元素在加载过程中发生了位移。\n\n**1. 图片没有设置尺寸**\n```html\n<!-- 始终设置 width 和 height -->\n<img src=\"photo.jpg\" width=\"800\" height=\"600\" alt=\"\">\n```\n\n**2. 广告/嵌入内容没有占位**\n```css\n/* 给广告位预留空间 */\n.ad-slot {\n  min-height: 250px;\n  contain: layout;\n}\n```\n\n**3. 字体加载导致文字跳动**\n```css\n@font-face {\n  font-family: 'MyFont';\n  src: url('font.woff2') format('woff2');\n  font-display: optional; /* 或 swap */\n}\n```\n\n---\n\n## 优先级建议\n\n按投入产出比排序：\n1. ✅ **图片转 WebP + 设置尺寸**（解决 LCP + CLS）\n2. ✅ **preload 关键资源**（快速提升 LCP）\n3. ✅ **JS lazy loading**（提升 FID）\n4. ✅ **第三方脚本加 defer/async**\n5. 考虑 **CDN 接入**（全面提升）\n\n你用的是什么技术栈？我可以给更具体的代码示例。"
      }
    ]
  },
  {
    id: "travel-japan",
    title: "日本东京7天旅行攻略",
    ai: "Claude",
    ai_icon: "🤖",
    date: "2025-02-28",
    category: "旅行",
    preview: "帮我规划一下东京7天的行程，预算中等，喜欢文化体验和美食...",
    cover_emoji: "🗼",
    cover_color: "linear-gradient(135deg, #4facfe, #00f2fe)",
    messages: [
      {
        role: "user",
        content: "帮我规划一下东京7天的行程，预算中等，喜欢文化体验和美食，不太喜欢人挤人的景点，希望能体验当地真实的生活。"
      },
      {
        role: "assistant",
        content: "太好了！东京有很多小众又有深度的地方。根据你「文化体验 + 美食 + 避人潮」的偏好，我给你规划一个「慢旅行」版的东京7天：\n\n---\n\n## Day 1 · 抵达 + 浅草周边\n**主题：老东京初体验**\n\n- 🌅 抵达后先去**合羽桥道具街**（厨具、食品模型，超有趣，游客少）\n- 🍜 午餐：**浅草附近的拉面横丁**，选一家排队短的\n- 🛕 下午：**浅草寺**（早去避开人潮，9-10点前最好）\n- 🚶 傍晚：步行到**隅田川**边散步，看晴空塔倒影\n- 🍺 晚餐：**浅草橘通り**的居酒屋，当地人多游客少\n\n---\n\n## Day 2 · 谷根千慢走\n**主题：最像昭和时代的老街**\n\n- 🏘️ **谷中银座商店街**：老铺子、猫咪、豆腐店，完全不像游客区\n- ⛩️ **根津神社**：平日游客极少，有小鸟居隧道\n- 🍡 **千駄木**周边小咖啡馆午餐\n- 📚 下午：**旧岩崎邸庭园**，明治时代建筑，门票只要400日元\n- 🌆 傍晚去**上野公园**散步（避开博物馆人潮）\n\n---\n\n## Day 3 · 代官山 + 中目黑\n**主题：东京文艺生活方式**\n\n- ☕ 早上：**代官山蔦屋书店**喝咖啡翻书（绝对要来）\n- 🛍️ 周边散步：LOG ROAD 代官山小巷\n- 🌸 午后：沿**目黑川**漫步到中目黑\n- 🍝 中目黑小餐厅午餐（有很多有设计感的小馆子）\n- 🎨 下午：**山手通り**附近的画廊随便逛\n- 🍷 晚餐：中目黑高架桥下（中目黒高架下）小食吧\n\n---\n\n## Day 4 · 向岛 + 押上\n**主题：下町工匠文化**\n\n- 🎋 **向岛百花园**（平日几乎无人，门票150日元，超值）\n- 🏮 **向岛纸灯笼工坊**：可以参观甚至体验制作\n- 🗼 在不人挤人的角度看**晴空塔**（押上附近的小街道）\n- 🍜 午餐：押上附近的荞麦面老店\n- 🛍️ 下午：**合羽桥**二次逛（买厨具纪念品）\n- 🌃 傍晚：**押上」站附近**夜景\n\n---\n\n## Day 5 · 西荻窪 + 吉祥寺\n**主题：东京「文青村」**\n\n- 🎸 **西荻窪**：二手唱片、古董杂货店，非常有意思，游客极少\n- 🍵 藏在小巷里的**喫茶店**（昭和复古咖啡馆）吃早午餐\n- 🌿 **井之头恩赐公园**：当地人遛狗、野餐，超级日常\n- 🦆 公园划船 30 分钟（500日元）\n- 🍛 吉祥寺**小巷里的咖喱饭**\n- 🛍️ 下午：**吉祥寺ハーモニカ横丁**（超小超挤的美食横丁）\n\n---\n\n## Day 6 · 日本橋 + 神楽坂\n**主题：江户商业文化 + 法式小巷**\n\n- 🏛️ **日本橋**周边：三越老百货、日本桥鱼市场遗址\n- 🍱 **日本橋**的老铺鳗鱼饭（贵但值得一次）\n- 🇫🇷 **神楽坂**：有法国风情的石板小巷，隐田横丁超美\n- ⛩️ **毘沙門天善國寺**：神楽坂的小神社\n- 🍷 晚餐：神楽坂隐田横丁的居酒屋或法式小馆\n\n---\n\n## Day 7 · 自由日 + 离港\n- 早上根据前6天没逛完的地方补充\n- 🛒 **大宮駅エキナカ**或**羽田机场**买手信\n- 推荐手信：**赤福饼礼盒、东京芭娜娜、蒜山ジャージー奶酪**\n\n---\n\n## 实用贴士\n| 项目 | 建议 |\n|------|------|\n| 交通 | Suica 卡充值，地铁最方便 |\n| 住宿 | 推荐浅草或中目黑，性价比高且位置佳 |\n| 预算 | 每天约 ¥800-1200 人民币（中等档次） |\n| 语言 | Google 翻译拍照翻译功能非常好用 |\n| 时间 | 出行前确认景点开放时间（周一多关闭） |\n\n要我帮你细化某一天，或者推荐具体餐厅名字吗？"
      }
    ]
  },
  {
    id: "sql-optimization",
    title: "SQL 慢查询优化",
    ai: "Claude",
    ai_icon: "🤖",
    date: "2025-03-10",
    category: "技术",
    preview: "这条 SQL 执行要 8 秒，帮我分析一下怎么优化...",
    cover_emoji: "🗄️",
    cover_color: "linear-gradient(135deg, #43e97b, #38f9d7)",
    messages: [
      {
        role: "user",
        content: "这条 SQL 执行要 8 秒，帮我分析一下怎么优化：\n\nSELECT u.*, o.*, p.* FROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nLEFT JOIN products p ON o.product_id = p.id\nWHERE o.created_at > '2024-01-01'\nAND o.status = 'completed'\nORDER BY o.created_at DESC\nLIMIT 20;"
      },
      {
        role: "assistant",
        content: "这条 SQL 有几个典型的性能问题，我来逐一分析：\n\n## 问题诊断\n\n**1. `SELECT *` 全列查询**\n- 拉取了三张表的所有字段，包含大量无用数据\n- 如果有 TEXT/BLOB 字段，影响更大\n\n**2. 索引缺失（最可能的主因）**\n- `o.created_at` 过滤条件可能没有索引\n- `o.status` 过滤条件可能没有索引\n- `o.user_id` 和 `o.product_id` 外键可能没有索引\n\n**3. LEFT JOIN 可能带来大量无效行**\n- 如果 WHERE 条件在 `orders` 表上，实际上应该用 INNER JOIN\n- LEFT JOIN + 非 NULL 过滤条件 = 隐式 INNER JOIN，但优化器不一定处理好\n\n**4. ORDER BY + LIMIT 在大表上效率低**\n- 排序需要扫描大量数据\n\n---\n\n## 优化方案\n\n**第一步：加索引（优先做，效果最显著）**\n\n```sql\n-- 复合索引，覆盖过滤 + 排序条件\nCREATE INDEX idx_orders_status_created\nON orders (status, created_at DESC);\n\n-- 如果没有，补上外键索引\nCREATE INDEX idx_orders_user_id ON orders (user_id);\nCREATE INDEX idx_orders_product_id ON orders (product_id);\n```\n\n**第二步：改写 SQL**\n\n```sql\n-- 优化后版本\nSELECT\n  u.id, u.name, u.email,          -- 只取需要的字段\n  o.id AS order_id,\n  o.created_at, o.status, o.amount,\n  p.id AS product_id, p.name AS product_name\nFROM orders o                       -- 以 orders 为主表（有过滤条件的表）\nINNER JOIN users u ON u.id = o.user_id     -- 改为 INNER JOIN\nINNER JOIN products p ON p.id = o.product_id\nWHERE o.status = 'completed'\n  AND o.created_at > '2024-01-01'\nORDER BY o.created_at DESC\nLIMIT 20;\n```\n\n**第三步：如果数据量很大，用子查询先分页再 JOIN**\n\n```sql\n-- 先筛选出 orders 的 ID，再 JOIN 其他表\nSELECT\n  u.id, u.name, u.email,\n  o.id AS order_id, o.created_at, o.status,\n  p.id AS product_id, p.name AS product_name\nFROM (\n  -- 这个子查询走索引，非常快\n  SELECT id, user_id, product_id, created_at, status, amount\n  FROM orders\n  WHERE status = 'completed'\n    AND created_at > '2024-01-01'\n  ORDER BY created_at DESC\n  LIMIT 20\n) o\nINNER JOIN users u ON u.id = o.user_id\nINNER JOIN products p ON p.id = o.product_id\nORDER BY o.created_at DESC;\n```\n\n---\n\n## 执行计划验证\n\n```sql\n-- 先 EXPLAIN 看看现在的执行计划\nEXPLAIN SELECT ...你的原始SQL...;\n\n-- 关注这几列：\n-- type: 最差 ALL（全表扫描），最好 const/ref/range\n-- key: 用了哪个索引（NULL 说明没用索引）\n-- rows: 预估扫描行数\n-- Extra: Using filesort 说明有额外排序开销\n```\n\n---\n\n## 预期效果\n\n| 优化手段 | 预期提升 |\n|--------|--------|\n| 加复合索引 | 6-8s → 0.1-0.5s |\n| SELECT 指定字段 | 减少 30-50% 数据传输 |\n| 子查询先分页 | 大表场景额外提升 50% |\n\n你能贴一下 `EXPLAIN` 的结果吗？这样我可以更精准地定位瓶颈。"
      }
    ]
  }
];

// 对话分类
const CHAT_CATEGORIES = ['全部', '技术', '生活', '旅行', '学习', '创意'];
