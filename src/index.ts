import { Context, Logger, Schema, Session } from 'koishi'

export const name = 'keyword-emoji-like'

export const usage = `

---

## 关键词贴表情插件

支持三种匹配模式：**包含**、**完全匹配**、**正则表达式**，每条规则可独立配置。

---

## 使用前准备

### OneBot 配置：

- 确保 LLOneBot 或其他 OneBot 实现正常运行
- 配置正确的 HTTP 地址和访问令牌（如果需要）

---

<details>
<summary>📝 表情ID参考表（点击展开）</summary>

### QQ表情 (类型1)

| ID | 表情 | ID | 表情 | ID | 表情 | ID | 表情 | ID | 表情 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 得意 | 5 | 流泪 | 8 | 睡 | 9 | 大哭 | 10 | 尴尬 |
| 12 | 调皮 | 14 | 微笑 | 16 | 酷 | 21 | 可爱 | 23 | 傲慢 |
| 24 | 饥饿 | 25 | 困 | 26 | 惊恐 | 27 | 流汗 | 28 | 憨笑 |
| 29 | 悠闲 | 30 | 奋斗 | 32 | 疑问 | 33 | 嘘 | 34 | 晕 |
| 38 | 敲打 | 39 | 再见 | 41 | 发抖 | 42 | 爱情 | 43 | 跳跳 |
| 49 | 拥抱 | 53 | 蛋糕 | 60 | 咖啡 | 63 | 玫瑰 | 66 | 爱心 |
| 74 | 太阳 | 75 | 月亮 | **76** | **赞** | 78 | 握手 | 79 | 胜利 |
| 85 | 飞吻 | 89 | 西瓜 | 96 | 冷汗 | 97 | 擦汗 | 98 | 抠鼻 |
| **99** | **鼓掌** | 100 | 糗大了 | 101 | 坏笑 | 102 | 左哼哼 | 103 | 右哼哼 |
| 104 | 哈欠 | 106 | 委屈 | 109 | 左亲亲 | 111 | 可怜 | 116 | 示爱 |
| 118 | 抱拳 | 120 | 拳头 | 122 | 爱你 | 123 | NO | 124 | OK |
| 125 | 转圈 | 129 | 挥手 | 144 | 喝彩 | 147 | 棒棒糖 | 171 | 茶 |
| 173 | 泪奔 | 174 | 无奈 | 175 | 卖萌 | 176 | 小纠结 | 179 | doge |
| 180 | 惊喜 | 181 | 骚扰 | 182 | 笑哭 | 183 | 我最美 | **201** | **点赞** |
| 203 | 托脸 | 212 | 托腮 | 214 | 啵啵 | 219 | 蹭一蹭 | 222 | 抱抱 |
| 227 | 拍手 | 232 | 佛系 | 240 | 喷脸 | 243 | 甩头 | 246 | 加油抱抱 |
| 262 | 脑阔疼 | 264 | 捂脸 | 265 | 辣眼睛 | 266 | 哦哟 | 267 | 头秃 |
| 268 | 问号脸 | 269 | 暗中观察 | 270 | emm | 271 | 吃瓜 | 272 | 呵呵哒 |
| 273 | 我酸了 | 277 | 汪汪 | 278 | 汗 | 281 | 无眼笑 | 282 | 敬礼 |
| 284 | 面无表情 | 285 | 摸鱼 | 287 | 哦 | 289 | 睁眼 | 290 | 敲开心 |
| 293 | 摸锦鲤 | 294 | 期待 | 297 | 拜谢 | 298 | 元宝 | 299 | 牛啊 |
| 305 | 右亲亲 | 306 | 牛气冲天 | 307 | 喵喵 | 314 | 仔细分析 | 315 | 加油 |
| 318 | 崇拜 | 319 | 比心 | 320 | 庆祝 | 322 | 拒绝 | 324 | 吃糖 |
| 326 | 生气 | | | | | | | | |

### Emoji表情 (类型2)

| ID | 表情 | ID | 表情 | ID | 表情 | ID | 表情 |
|---|---|---|---|---|---|---|---|
| 9728 | ☀ 晴天 | 9749 | ☕ 咖啡 | 9786 | ☺ 可爱 | 10024 | ✨ 闪光 |
| 10060 | ❌ 错误 | 10068 | ❔ 问号 | 127801 | 🌹 玫瑰 | 127817 | 🍉 西瓜 |
| 127822 | 🍎 苹果 | 127827 | 🍓 草莓 | 127836 | 🍜 拉面 | 127838 | 🍞 面包 |
| 127847 | 🍧 刨冰 | 127866 | 🍺 啤酒 | 127867 | 🍻 干杯 | 127881 | 🎉 庆祝 |
| 128027 | 🐛 虫 | 128046 | 🐮 牛 | 128051 | 🐳 鲸鱼 | 128053 | 🐵 猴 |
| 128074 | 👊 拳头 | 128076 | 👌 好的 | **128077** | **👍 厉害** | **128079** | **👏 鼓掌** |
| 128089 | 👙 内衣 | 128102 | 👦 男孩 | 128104 | 👨 爸爸 | 128147 | 💓 爱心 |
| 128157 | 💝 礼物 | 128164 | 💤 睡觉 | 128166 | 💦 水 | 128168 | 💨 吹气 |
| 128170 | 💪 肌肉 | 128235 | 📫 邮箱 | 128293 | 🔥 火 | 128513 | 😁 呲牙 |
| **128514** | **😂 激动** | 128516 | 😄 高兴 | 128522 | 😊 嘿嘿 | 128524 | 😌 羞涩 |
| 128527 | 😏 哼哼 | 128530 | 😒 不屑 | 128531 | 😓 汗 | 128532 | 😔 失落 |
| 128536 | 😘 飞吻 | 128538 | 😚 亲亲 | 128540 | 😜 淘气 | 128541 | 😝 吐舌 |
| 128557 | 😭 大哭 | 128560 | 😰 紧张 | 128563 | 😳 瞪眼 | |

**推荐常用：** 76 (赞)、99 (鼓掌)、128077 (👍厉害)、128079 (👏鼓掌)、128514 (😂激动)

</details>

---

## 快速上手

1. 配置 OneBot 连接信息
2. 添加关键词规则，例如：
   - 关键词：\`哈哈\` → 表情ID：\`128514\` (😂激动)
   - 关键词：\`666\` → 表情ID：\`76\` (赞)
3. 测试：发送 \`emoji-test\` 命令验证功能

---
`

// 单条规则
interface Rule {
  keyword: string
  emojiId: string  // 恢复为字符串，支持逗号分隔的多个ID
  groups?: string  // 改为字符串，支持逗号分隔的多个群组ID
  matchMode?: '包含' | '完全匹配' | '正则表达式'
  ignoreCase?: boolean
}

// 插件配置
interface Config {
  rules: Rule[]
  matchMode: '包含' | '完全匹配' | '正则表达式'
  ignoreCase: boolean
  cooldownSec: number
  debug: boolean
  onebotUrl: string
  onebotToken?: string

  // 新增：纯随机贴表情
  randomEnabled?: boolean
  randomIntervalMessages?: number // 每隔N条消息触发（0~500，0=每条都触发）
  randomEmojiPool?: string // 随机池，逗号分隔的表情ID字符串
  randomGroups?: string // 限定随机生效的群，逗号分隔的群组ID字符串
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    onebotUrl: Schema.string().default('http://127.0.0.1:3000').description('OneBot 客户端的 HTTP 地址'),
    onebotToken: Schema.string().description('OneBot 客户端的访问Token')
  }).description('OneBot 配置'),
  
  Schema.object({
    debug: Schema.boolean().default(false).description('启用调试模式')
  }).description('调试配置'),
  
  Schema.object({
    matchMode: Schema.union(['包含', '完全匹配', '正则表达式'])
      .default('包含')
      .description('匹配模式'),
    ignoreCase: Schema.boolean().default(true).description('忽略大小写'),
    cooldownSec: Schema.number().min(0).default(3).description('同一消息冷却时间（秒）'),
    rules: Schema.array(Schema.object({
      keyword: Schema.string().required().description('关键词'),
      emojiId: Schema.string().required().description('表情ID（多个表情请用英文逗号分隔，如：76,99,128077）'),
      groups: Schema.string().description('群组ID列表（多个群组请用英文逗号分隔，如：123456,789012，留空表示所有群）'),
      matchMode: Schema.union(['包含', '完全匹配', '正则表达式']).description('匹配模式（留空使用全局设置）'),
      ignoreCase: Schema.boolean().description('忽略大小写（留空使用全局设置）')
    })).default([]).description('关键词与表情映射规则')
  }).description('映射规则配置'),

  // 新增：纯随机贴表情（基于消息间隔）
  Schema.object({
    randomEnabled: Schema.boolean().default(false).description('启用纯随机贴表情（仅在未命中任何关键词时触发）'),
    randomIntervalMessages: Schema.number().min(0).max(500).default(20).description('每隔 N 条消息触发一次（0~500，0 表示每条消息都触发）'),
    // 精选 Emoji（类型2）默认池，改为逗号分隔字符串
    randomEmojiPool: Schema.string().default('9728,9749,9786,10024,10060,10068,127801,127817,127822,127827,127836,127838,127847,127866,127867,127881,128027,128046,128051,128053,128074,128076,128077,128079,128089,128102,128104,128147,128157,128164,128166,128168,128170,128235,128293,128513,128514,128516,128522,128524,128527,128530,128531,128532,128536,128538,128540,128541,128557,128560,128563').description('随机表情池，多个表情请用英文逗号分隔（如：76,99,128077）'),
    randomGroups: Schema.string().description('仅在这些群内进行随机贴表情（多个群组请用英文逗号分隔，如：123456,789012，留空表示所有群）')
  }).description('随机贴表情')
])

// 编译规则
interface CompiledRule {
  keyword: string
  // 多表情支持：编译为数组
  emojiIds: string[]
  groups?: number[]  // 编译后转为数字数组
  matchMode: '包含' | '完全匹配' | '正则表达式'
  ignoreCase: boolean
  matcher: (text: string) => boolean
}

function compileRules(rules: Rule[], globalMatchMode: '包含' | '完全匹配' | '正则表达式', globalIgnoreCase: boolean): CompiledRule[] {
  return rules.map(rule => {
    // 使用规则级别的配置，如果没有则使用全局配置
    const matchMode = rule.matchMode || globalMatchMode
    const ignoreCase = rule.ignoreCase !== undefined ? rule.ignoreCase : globalIgnoreCase
    
    let matcher: (text: string) => boolean
    
    if (matchMode === '正则表达式') {
      try {
        const flags = ignoreCase ? 'i' : ''
        const regex = new RegExp(rule.keyword, flags)
        matcher = (text: string) => regex.test(text)
      } catch (e) {
        // 正则表达式无效时回退到包含模式
        const keyword = ignoreCase ? rule.keyword.toLowerCase() : rule.keyword
        matcher = (text: string) => {
          const testText = ignoreCase ? text.toLowerCase() : text
          return testText.includes(keyword)
        }
      }
    } else if (matchMode === '完全匹配') {
      const keyword = ignoreCase ? rule.keyword.toLowerCase() : rule.keyword
      matcher = (text: string) => {
        const testText = ignoreCase ? text.toLowerCase() : text
        return testText === keyword
      }
    } else {
      // 包含
      const keyword = ignoreCase ? rule.keyword.toLowerCase() : rule.keyword
      matcher = (text: string) => {
        const testText = ignoreCase ? text.toLowerCase() : text
        return testText.includes(keyword)
      }
    }

    const emojiIds = Array.isArray(rule.emojiId) ? rule.emojiId : rule.emojiId.split(',').map(id => id.trim()).filter(id => id)
    
    // 解析群组字符串为数字数组
    const groups = rule.groups ? rule.groups.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id)) : undefined
    
    return {
      keyword: rule.keyword,
      emojiIds,
      groups,
      matchMode,
      ignoreCase,
      matcher
    }
  })
}

// 小工具：随机选一个元素
function chooseRandom<T>(arr: T[]): T | undefined {
  if (!arr?.length) return undefined
  return arr[Math.floor(Math.random() * arr.length)]
}

async function likeMessage(
  session: Session,
  emojiId: string,
  logger: Logger,
  debug: boolean,
  ctx: Context,
  onebotUrl: string,
  onebotToken?: string
): Promise<boolean> {
  const message_id = Number(session.messageId)
  const emoji_id = Number(emojiId)

    if (debug) {
      logger.debug(`[keyword-emoji-like] [DEBUG] 开始贴表情流程`)
      logger.debug(`[keyword-emoji-like] [DEBUG] - 消息ID: ${message_id} (类型: ${typeof message_id})`)
      logger.debug(`[keyword-emoji-like] [DEBUG] - 表情ID: ${emoji_id} (类型: ${typeof emoji_id})`)
      logger.debug(`[keyword-emoji-like] [DEBUG] - API地址: ${onebotUrl}`)
      logger.debug(`[keyword-emoji-like] [DEBUG] - Token配置: ${onebotToken ? '已设置' : '未设置'}`)
    }

  try {
    const apiUrl = `${onebotUrl.replace(/\/$/, '')}/set_msg_emoji_like`
    
    const payload = {
      message_id,
      emoji_id
    }

    const headers = {
      'Content-Type': 'application/json'
    } as any

    // 添加 token 认证
    if (onebotToken) {
      headers['Authorization'] = `Bearer ${onebotToken}`
    }

    if (debug) {
      // 脱敏处理：不打印 token 内容
      const safeHeaders = { ...headers }
      if (safeHeaders.Authorization) {
        safeHeaders.Authorization = '[REDACTED]'
      }
      
      logger.debug(`[keyword-emoji-like] [DEBUG] HTTP 请求: ${apiUrl}`)
      logger.debug(`[keyword-emoji-like] [DEBUG] 请求头:`, JSON.stringify(safeHeaders, null, 2))
      logger.debug(`[keyword-emoji-like] [DEBUG] 请求体:`, JSON.stringify(payload, null, 2))
    }

    const startTime = Date.now()
    const response = await ctx.http.post(apiUrl, payload, { headers })
    const endTime = Date.now()

    if (debug) {
      logger.debug(`[keyword-emoji-like] [DEBUG] 请求耗时: ${endTime - startTime}ms`)
      logger.debug(`[keyword-emoji-like] [DEBUG] 响应:`, JSON.stringify(response, null, 2))
    }

    // 检查响应状态
    if (response && typeof response === 'object') {
      if (('retcode' in response && response.retcode === 0) || 
          ('status' in response && response.status === 'ok')) {
        logger.info(`[keyword-emoji-like] 成功贴表情 ${emoji_id} 到消息 ${message_id}`)
        return true
      } else {
        logger.error(`[keyword-emoji-like] 贴表情失败:`, response)
        return false
      }
    } else {
      // 没有返回 JSON，可能是成功的空响应
      logger.info(`[keyword-emoji-like] 贴表情请求完成`)
      return true
    }

  } catch (e) {
    const error = e as Error
    logger.error(`[keyword-emoji-like] HTTP 调用失败: ${error.message}`)
    if (debug) {
      logger.debug(`[keyword-emoji-like] [DEBUG] 错误详情:`, error.stack)
    }
    return false
  }
}

/**
 * 插件主体
 */
export function apply(ctx: Context, config: Config) {
  const logger = new Logger(name)

  const compiled = compileRules(config.rules, config.matchMode, config.ignoreCase)

  // 用于同一条消息的去重（TTL）
  const dedup = new Map<string, number>()
  const ttl = Math.max(0, config.cooldownSec) * 1000
  if (ttl > 0) {
    ctx.setInterval(() => {
      const now = Date.now()
      for (const [k, v] of dedup) {
        if (v <= now) dedup.delete(k)
      }
    }, Math.min(30_000, Math.max(5_000, ttl)))
  }

  // 新增：纯随机消息计数器（按群分别计算）
  const groupRandomCounters = new Map<number, number>()
  const clampInterval = (n: number | undefined) => {
    const x = typeof n === 'number' ? n : 20
    return Math.max(0, Math.min(500, Math.floor(x)))
  }

  // 添加测试命令，用于测试贴表情功能
  ctx.command('emoji-test [emojiId:string]', '测试贴表情功能')
    .action(async ({ session }, emojiId = '128077') => {
      if (!session?.messageId) {
        return '无法获取消息ID，请确保在群聊中使用此命令'
      }

      try {
        const success = await likeMessage(session, emojiId, logger, true, ctx, config.onebotUrl, config.onebotToken) // 测试时总是开启debug
        if (success) {
          return `✅ 成功贴表情 ${emojiId} 到消息 ${session.messageId}\nAPI地址: ${config.onebotUrl}`
        } else {
          return `❌ 贴表情失败，请查看控制台日志获取详细信息\nAPI地址: ${config.onebotUrl}`
        }
      } catch (e) {
        return `❌ 贴表情异常: ${(e as Error).message}\nAPI地址: ${config.onebotUrl}`
      }
    })

  // 监听贴表情事件，用于获取emoji ID (同时验证功能是否可用)
  ctx.on('internal/session' as any, (session) => {
    const event = session.event as any
    if (event?.notice_type === 'group_msg_emoji_like') {
      logger.info(`[emoji-debug] 检测到贴表情事件 (功能正常):`, {
        group_id: event.group_id,
        user_id: event.user_id,
        message_id: event.message_id,
        likes: event.likes
      })
    }
  })

  ctx.middleware(async (session, next) => {
    // 过滤空消息
    const text = session.content?.trim()
    if (!text) return next()

    if (config.debug) {
      logger.debug(`[keyword-emoji-like] [DEBUG] 处理消息: "${text}" (消息ID: ${session.messageId})`)
    }

    const groupId = Number(session.channelId || 0) || undefined
    // 寻找首个命中的规则（支持多表情）
    const rule = compiled.find((r) => {
      if (r.groups?.length && groupId && !r.groups.includes(groupId)) {
        if (config.debug) {
          logger.debug(`[keyword-emoji-like] [DEBUG] 规则 "${r.keyword}" 跳过：群组不匹配 (当前群: ${groupId}, 允许群: ${r.groups.join(',')})`)
        }
        return false
      }
      const matched = r.matcher(text)
      if (config.debug) {
        logger.debug(`[keyword-emoji-like] [DEBUG] 规则 "${r.keyword}" (${r.matchMode}, 忽略大小写: ${r.ignoreCase}) 匹配结果: ${matched}`)
      }
      return matched
    })
    
    if (rule) {
      const msgId = session.messageId
      if (!msgId) return next()

      if (ttl > 0) {
        const exists = dedup.get(msgId)
        if (exists && exists > Date.now()) {
          if (config.debug) {
            logger.debug(`[keyword-emoji-like] [DEBUG] 消息 ${msgId} 在冷却中，跳过`)
          }
          return next()
        }
      }

      const chosenEmoji = chooseRandom(rule.emojiIds)
      if (config.debug) {
        logger.debug(`[keyword-emoji-like] [DEBUG] 匹配成功！规则: "${rule.keyword}" -> 候选(${rule.emojiIds.join(', ')}) 选中: ${chosenEmoji}`)
      }

      if (chosenEmoji) {
        try {
          const success = await likeMessage(session, chosenEmoji, logger, config.debug, ctx, config.onebotUrl, config.onebotToken)
          if (!success && config.debug) {
            logger.debug(`[keyword-emoji-like] [DEBUG] 贴表情失败，规则: ${rule.keyword} -> ${chosenEmoji}`)
          }
        } catch (e) {
          logger.error(`[keyword-emoji-like] 贴表情失败：${(e as Error).stack || (e as Error).message}`)
        } finally {
          if (ttl > 0) dedup.set(msgId, Date.now() + ttl)
        }
      }

      return next()
    }

    // 未命中关键词时：尝试纯随机（按消息间隔）
    if (config.randomEnabled) {
      // 群过滤
      const randomGroupIds = config.randomGroups ? config.randomGroups.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id)) : []
      if (randomGroupIds.length && groupId && !randomGroupIds.includes(groupId)) {
        if (config.debug) {
          logger.debug(`[keyword-emoji-like] [DEBUG] 随机功能跳过：群组不匹配 (当前群: ${groupId}, 允许群: ${randomGroupIds.join(',')})`)
        }
        return next()
      }

      const interval = clampInterval(config.randomIntervalMessages)
      // 按群分别统计"未命中关键词"的消息
      const currentCount = groupRandomCounters.get(groupId || 0) || 0
      const newCount = currentCount + 1
      groupRandomCounters.set(groupId || 0, newCount)

      if (config.debug) {
        logger.debug(`[keyword-emoji-like] [DEBUG] 随机计数 (群${groupId || 0}): ${newCount}/${interval} (${interval === 0 ? '每条触发' : '间隔触发'})`)
      }

      if (interval === 0 || newCount >= interval) {
        const poolStr = config.randomEmojiPool ?? '9728,9749,9786,10024,10060,10068,127801,127817,127822,127827,127836,127838,127847,127866,127867,127881,128027,128046,128051,128053,128074,128076,128077,128079,128089,128102,128104,128147,128157,128164,128166,128168,128170,128235,128293,128513,128514,128516,128522,128524,128527,128530,128531,128532,128536,128538,128540,128541,128557,128560,128563'
        const pool = poolStr.split(',').map(id => id.trim()).filter(id => id)
        const randomEmoji = chooseRandom(pool)
        if (randomEmoji && session.messageId) {
          try {
            const success = await likeMessage(session, randomEmoji, logger, config.debug, ctx, config.onebotUrl, config.onebotToken)
            if (success) {
              groupRandomCounters.set(groupId || 0, 0) // 重置该群的计数器
            }
          } catch (e) {
            logger.error(`[keyword-emoji-like] 随机贴表情失败：${(e as Error).message}`)
          }
        }
      }
    }

    return next()
  })

  logger.info('关键词贴表情中间件已注册。')
  if (config.debug) {
    logger.debug(`[keyword-emoji-like] [DEBUG] 调试模式已启用`)
    logger.debug(`[keyword-emoji-like] [DEBUG] 配置信息:`)
    logger.debug(`[keyword-emoji-like] [DEBUG] - 全局匹配模式: ${config.matchMode}`)
    logger.debug(`[keyword-emoji-like] [DEBUG] - 全局忽略大小写: ${config.ignoreCase}`)
    logger.debug(`[keyword-emoji-like] [DEBUG] - 冷却时间: ${config.cooldownSec}秒`)
    logger.debug(`[keyword-emoji-like] [DEBUG] - OneBot API地址: ${config.onebotUrl}`)
    logger.debug(`[keyword-emoji-like] [DEBUG] - OneBot Token: ${config.onebotToken ? '已配置' : '未配置'}`)
    logger.debug(`[keyword-emoji-like] [DEBUG] - 规则数量: ${config.rules.length}`)
    compiled.forEach((rule, index) => {
      const originalRule = config.rules[index]
      const modeStr = originalRule.matchMode ? `${originalRule.matchMode}` : `${config.matchMode}(全局)`
      const caseStr = originalRule.ignoreCase !== undefined ? `${originalRule.ignoreCase}` : `${config.ignoreCase}(全局)`
      logger.debug(`[keyword-emoji-like] [DEBUG] - 规则${index + 1}: "${rule.keyword}" -> [${rule.emojiIds.join(', ')}] [${modeStr}, 忽略大小写: ${caseStr}]`)
    })
    logger.debug(`[keyword-emoji-like] [DEBUG] - 随机功能: ${config.randomEnabled ? '启用' : '禁用'}`)
    if (config.randomEnabled) {
      const interval = clampInterval(config.randomIntervalMessages)
      logger.debug(`[keyword-emoji-like] [DEBUG] - 随机间隔: ${interval === 0 ? '每条消息' : `每${interval}条消息`}`)
      logger.debug(`[keyword-emoji-like] [DEBUG] - 随机表情池(Emoji): ${config.randomEmojiPool || '使用默认池'}`)
      logger.debug(`[keyword-emoji-like] [DEBUG] - 随机群限制: ${config.randomGroups || '无'}`)
    }
  }
}
