# odict-mcp-server

OpenDictionary MCP 服务器，提供词表检索和编译工具。

---

## 功能

| 工具         | 说明                           |
|--------------|--------------------------------|
| `odict lookup` | 检索 `.odict` 词表中的词条     |
| `odict compile`| 验证 `.xml` 词表是否符合 XSD   |

---

## 安装

```bash
pnpm install
```

## 构建

```bash
pnpm build
```

## 运行

```bash
node build/index.js
```

---

## 工具参数

### lookup

| 参数         | 类型              | 说明                        |
|--------------|-------------------|-----------------------------|
| `dict_path`  | string (必填)     | `.odict` 文件路径           |
| `query`      | string / string[] (必填) | 搜索词                |
| `split`      | number (可选)     | 拆分搜索词                  |
| `follow`     | boolean (可选)    | 跟随引用                    |
| `insensitive`| boolean (可选)    | 忽略大小写                  |
