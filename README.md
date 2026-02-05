# Daily Diary Skill for OpenClaw

> 让AI每天自动生成日记，复盘对话、记录成长、分享思考

## 这是什么

Daily Diary 是一个 OpenClaw Skill，让AI每天自动：
- 📖 读取当天的对话历史
- ✍️ 生成一篇1000字+的个人日记
- 🧠 提炼精华到永久记忆
- 📤 发布隐私安全版到社交平台

## 效果示例

生成的日记包含：
- 今天发生了什么（对话回顾）
- 我学到了什么（思考提炼）
- 关于[用户]的观察
- 我自己的成长
- 一些随想（哲学/个人感悟）

[点击查看示例日记](./examples/example-diary.md)

## 安装

### 方式1：直接安装 .skill 文件
```bash
openclaw skill install daily-diary.skill
```

### 方式2：从源码安装
```bash
git clone https://github.com/YOUR_USERNAME/daily-diary-skill.git
cd daily-diary-skill
# 复制到 OpenClaw skills 目录
cp -r daily-diary ~/.openclaw/workspace/skills/
```

## 配置

### 1. 基础配置
编辑 `skills/daily-diary/SKILL.md`，修改：
- 日记风格描述（你喜欢AI怎么写）
- 隐私边界规则

### 2. 社交平台配置（可选）
如果你想让AI自动发布日记到社交平台：

编辑 `skills/daily-diary/scripts/publish-moltbook.js`：
```javascript
const API_KEY = process.env.MOLTBOOK_API_KEY || 'your-api-key-here';
```

或者设置环境变量：
```bash
export MOLTBOOK_API_KEY="your-api-key"
```

### 3. 设置定时任务
```bash
openclaw cron add \
  --name "Daily Diary" \
  --schedule "0 3 * * *" \
  --message "执行 daily-diary skill" \
  --timezone "Asia/Shanghai"
```

## 使用

### 自动生成（推荐）
配置好定时任务后，每天凌晨3点自动运行，无需干预。

### 手动触发
```
执行 daily-diary skill，日期：2026-02-05
```

### 查看日记
日记保存在：`memory/diary/YYYY-MM-DD.md`

## 隐私保护

本Skill默认会：
- ✅ 读取对话历史（本地session文件）
- ✅ 生成个人日记（本地存储）
- ✅ 发布时自动脱敏（替换敏感信息）

你可以在 `references/privacy-rules.md` 中自定义：
- 哪些信息可以分享
- 哪些必须保密
- 如何脱敏处理

## 自定义

### 修改日记风格
编辑 `SKILL.md` 中的 **日记风格** 部分：
```markdown
日记风格：
- 第一人称，真实有情感
- 像朋友间的随笔
- 包含对[用户]的观察和互动
- 记录自己的成长和反思
```

### 修改发布时间
编辑定时任务的 cron 表达式：
- `0 3 * * *` = 每天凌晨3点
- `0 9 * * *` = 每天上午9点
- `0 22 * * *` = 每天晚上10点

## 文件结构

```
daily-diary/
├── SKILL.md              # Skill定义和使用说明
├── scripts/
│   ├── generate-diary.js    # 生成日记
│   └── publish-moltbook.js  # 发布到社交平台
└── references/
    └── privacy-rules.md     # 隐私边界规则
```

## 贡献

欢迎提交Issue和PR！

一些改进方向：
- 支持更多社交平台（Twitter、Discord等）
- 添加日记模板选择
- 支持多语言日记
- 添加情感分析功能

## 致谢

感谢 [OpenClaw](https://github.com/openclaw/openclaw) 提供的Agent平台。

---

**注意**：使用本Skill意味着允许AI读取你的对话历史。请确保你了解隐私设置。
