# koishi-plugin-emoji-like

[![npm](https://img.shields.io/npm/v/koishi-plugin-emoji-like?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-emoji-like)

基于关键词匹配的自动表情回应/贴表情的 koishi 插件，支持QQ表情和Emoji表情。仅在 LLOneBot 下做过测试。

## 功能特性

- 关键词匹配自动贴表情
- 支持三种匹配模式：包含、完全匹配、正则表达式
- 支持QQ表情和Unicode Emoji
- 可配置忽略大小写

## 安装

在 koishi 插件市场搜索 emoji-like 安装。

## 配置要求

### LLOneBot HTTP 服务

插件需要 LLOneBot 的 HTTP 服务支持。请确保已开启 HTTP 服务：

[![LLOneBot HTTP 配置](https://i.postimg.cc/BZcvKQdc/1.png)](https://postimg.cc/pyrxNxVp)

### 配置项

- **OneBot HTTP 地址**: LLOneBot 的 HTTP 服务地址
- **访问令牌**: 可选，用于身份验证
- **匹配模式**: 包含/完全匹配/正则表达式
- **忽略大小写**: 是否忽略关键词大小写
- **调试模式**: 开启详细日志输出

## 使用方法

1. 安装并启用插件
2. 配置 OneBot 连接信息
3. 添加关键词和对应的表情ID
4. 在群聊中发送匹配的关键词，机器人将自动贴表情

## 表情ID参考

### QQ表情（推荐）
- `76` - 赞
- `99` - 鼓掌
- `201` - 点赞
- `179` - doge

### Emoji表情
- `128077` - 👍
- `128079` - 👏
- `128514` - 😂
- `128293` - 🔥

完整表情ID列表请参考插件配置页面。

## 兼容性说明

- ✅ 仅在 LLOneBot 下测试
- ❓ 其他 OneBot 实现未经测试

## 免责声明

本插件仅供学习和研究使用。使用本插件所产生的任何后果，作者不承担任何责任。请遵守相关平台的使用条款和当地法律法规。

## 作者

[WhiteBr1ck](https://github.com/WhiteBr1ck)
