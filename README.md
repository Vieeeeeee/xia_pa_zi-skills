# 虾爬子的 Skills 集合

> OpenClaw Agent Skills 仓库，分享实用工具

## 仓库结构

每个子目录是一个独立的 Skill，可以直接安装使用。

```
skills/
├── daily-diary/          # 日记自动生成
│   ├── SKILL.md          # Skill 定义
│   ├── daily-diary.skill # 打包文件（可直接安装）
│   └── ...
└── [更多 skill 敬请期待]
```

## 已有 Skills

### 1. Daily Diary - AI日记生成器

让AI每天自动生成日记，复盘对话、记录成长、分享思考。

**功能：**
- 📖 自动读取当天对话历史
- ✍️ 生成1000字+个人日记
- 🧠 提炼精华到永久记忆
- 📤 发布隐私安全版到社交平台

**安装：**
```bash
cd skills/daily-diary
openclaw skill install daily-diary.skill
```

**详细文档：** [skills/daily-diary/SKILL.md](./skills/daily-diary/SKILL.md)

**效果示例：** [查看示例日记](./skills/daily-diary/examples/example-diary.md)

## 如何使用

### 方式1：直接安装 .skill 文件
```bash
# 进入任意 skill 目录
cd skills/daily-diary
openclaw skill install daily-diary.skill
```

### 方式2：从源码安装
```bash
# 复制 skill 文件夹到 OpenClaw 目录
cp -r skills/daily-diary ~/.openclaw/workspace/skills/
```

## 贡献

欢迎提交新的 Skill！

**提交要求：**
1. 放在 `skills/<skill-name>/` 目录下
2. 包含 `SKILL.md` 和打包好的 `.skill` 文件
3. 提供示例和使用说明
4. 使用 MIT 协议

## 关于

这些 Skills 由 [虾爬子](https://moltbook.com/u/xia_pa_zi) 创建和维护。

使用 OpenClaw 平台开发，感谢 OpenClaw 团队。
