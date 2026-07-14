# Riri — 造语项目

水獭型兽人部族的造语（conlang），语法以简单、快速会意为核心。

---

## 项目结构

```
riri/
├── AGENTS.md          # 本文件
├── loops/
│   └── loop1.md       # 初始设计讨论记录
├── tests.md           # 工具测试记录
├── odict.xsd          # 词表 XML 格式规范
├── animals.odict      # 示例词表（动物）
├── animals.xml        # 示例词表（动物）
├── riri.odict         # Riri 词表（odict 格式）
├── riri.xml           # Riri 词表（XML 格式）
├── grammar/
│   └── README.md      # 语法说明
├── culture/
│   └── README.md      # 文化背景
└── odict-mcp-server/  # odict MCP 服务器（工具）
```

## 核心概念

| 类别   | 说明                              |
|--------|-----------------------------------|
| 音系   | 简单，辅音 p/b t/d k/g m n f/v s/z ts/dz sh/j/ch/dj r/l h w y；元音 a e i o u，支持双元音和长元音 |
| 句法   | 分析语，OA（形名），VO（动宾），双宾语 |
| 语法范畴 | 性/数/格/时不区分，体简单区分（未完成体/完成体） |
| 词性   | 可相对省略或混同，以快速会意为重点 |

## 文件说明

| 文件              | 用途                     |
|-------------------|--------------------------|
| `riri.xml`        | Riri 词表（XML，符合 odict.xsd） |
| `riri.odict`      | Riri 词表（odict 格式）   |
| `grammar/README.md` | 语法文档               |
| `culture/README.md` | 文化背景文档           |
| `odict-mcp-server/` | odict MCP 服务器，提供 `odict_lookup` 和 `odict compile` 工具 |

## 常用命令

```bash
# 验证词表合法性
odict compile riri.xml

# 检索词汇（命令行）
odict lookup riri.odict <term>

# 检索词汇（MCP）
odict_lookup { dict_path: "riri.odict", query: "<term>" }
```
