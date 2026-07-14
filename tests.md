# 测试记录

## 1. 测试 MCP — 查找词汇

### 查找当前目录的 odict 文件，并从中检索 "cat"

**步骤 1：查找 odict 文件**

```bash
$ find /home/homodeluna/src/riri -name "*.odict" -type f 2>/dev/null
/home/homodeluna/src/riri/animals.odict
```

**步骤 2：使用 MCP 检索 "cat"**

```json
{
  "dict_path": "/home/homodeluna/src/riri/animals.odict",
  "query": "cat"
}
```

**结果：**

| 字段   | 内容                                       |
|--------|--------------------------------------------|
| 词源   | 源自拉丁语 *cattus*                        |
| 词性   | 名词                                       |
| 释义   | 小型家养肉食哺乳动物，有柔软的毛皮         |
| 例句   | The cat sat on the mat.                    |
| 例句   | She adopted two cats from the shelter.     |
| 非正式义 | 指人，尤指男人                             |
| 例句   | He's a cool cat.                           |

---

## 2. 测试添加词条

### 从 loop1.md 提取词汇，编写 riri.xml

**提取的词汇（16 个词条）：**

| 词汇     | 词性  | 释义                 | 备注/衍生        |
|----------|-------|----------------------|------------------|
| tsri     | v     | 投下矛/鱼叉          |                  |
| tsri daa | —     | 命中                 | 短语             |
| luh      | n     | 船                   |                  |
| luuh     | n     | 家庭                 |                  |
| voluh    | n     | 链接的船 → 社区      | 引申义           |
| kuvin    | v     | (船)停泊             |                  |
| gro      | v     | 吃                   |                  |
| biri     | n     | 鱼                   |                  |
| hana     | n/adv | 周围；一旁；旁侧     |                  |
| a        | pron  | 我                   |                  |
| ye       | pron  | 他；那个             |                  |
| du       | adv   | 不                   |                  |
| lik      | num   | 二；两               |                  |
| allik    | pron  | 我们两个             | lik + a 衍生     |
| mra      | quant | 大量；很多；群；群组 |                  |
| amra     | pron  | 我们（三个以上）     | a + mra 衍生     |

**步骤：**

1. 创建空 `riri.xml` 文件头
2. 逐个添加词条，每次添加后运行 `odict compile riri.xml` 验证合法性
3. 修正结构使其符合 `odict.xsd` 规范

**结构修正要点：**

- 每个 `<entry>` 下包裹 `<ety>` 元素（词源）
- `<ety>` 的 `description` 属性存放词条释义
- `<sense>` 下使用 `<definition id="..." value="...">` 结构
- `<definition>` 内嵌套 `<example value="...">`
- `<dictionary>` 添加 `id` 属性

---

## 3. 测试查找词汇

### 命令行检索

```bash
odict lookup riri.odict luuh
```

```
────────────────────────────────
luuh
────────────────────────────────

家庭

noun

  1. 家庭
     ▸ luuh a
```

### MCP 检索

```json
{
  "dict_path": "/home/homodeluna/src/riri/riri.odict",
  "query": "luuh"
}
```

**结果：**

| 字段 | 内容   |
|------|--------|
| 词源 | 家庭   |
| 词性 | noun   |
| 释义 | 家庭   |
| 例句 | luuh a |

---

## 测试结果

- ✅ MCP 查找 odict 文件 — 正常
- ✅ MCP 检索词汇 — 正常
- ✅ 创建并编辑 riri.xml — 正常
- ✅ `odict compile` 验证 — 正常
- ✅ 结构修正符合 `odict.xsd` — 正常
- ✅ 命令行 `odict lookup` — 正常
- ✅ MCP `odict_lookup` — 正常


## 测试编写语法

用户: 根据loop1.md, 编写 grammar/README.md
## 测试编写文化

用户: 根据loop1.md, 编写 culture/README.md
