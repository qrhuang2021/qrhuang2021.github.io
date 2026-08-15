本文直接讨论一个 Web-based User Study 系统的代码架构设计，并以 Markdown 创意写作作为具体案例。Participant 可以领取 Task 并提交写作结果，也可以脱离 Study 自由写作；Researcher 则负责设计 Study、发布 Tasks 和查看实验数据。

创意写作足够简单，可以让讨论集中在多用户、角色权限、任务流程和数据隔离等核心问题；同时，它又包含 Study、Session、Task 和 Response，能够代表一类通用的 User Study 系统。

## 代码架构设计流程

代码架构设计从需求出发，逐步把业务问题转化为可以实现和验证的软件结构：

1. **Requirements Analysis**：明确系统目标、用户角色、核心场景和范围边界。
2. **Use Case Analysis**：描述不同角色如何使用系统，识别系统需要支持的核心操作。
3. **Domain Modeling**：从 Use Cases 中提取稳定的业务概念及其关系。
4. **Module Design**：按照职责划分模块，明确模块边界和依赖方向。
5. **Data Flow Design**：分析一次操作如何经过 UI、API、业务逻辑和数据库。
6. **Technical Design**：选择 frontend、backend 和 database，并设计 API、数据表和代码目录。
7. **Implementation and Review**：先实现一条完整的 vertical slice，再根据实际问题调整架构。

整个过程可以简化为：

```text
需求 → Use Case → 领域模型 → 模块 → 数据流 → 技术实现
```

## 1. Requirements Analysis

系统的目标是构建一个多用户创意写作平台，并支持任务写作与自由写作两种模式。

系统中的用户统一表示为 `User`，并通过 `role` 区分两种角色：

- **PARTICIPANT**：参与 Study、领取 Task，并使用 Markdown 完成写作；也可以不参与 Study，直接自由写作。
- **RESEARCHER**：创建和管理 Study 与 Tasks，并查看 Participants 提交的实验数据。

任务写作的核心流程是：Participant 登录后选择 Study，开始或继续一次 Session，领取 Task，在 Markdown 编辑器中写作并实时预览，最后提交 Response。自由写作不依赖 Study、Session 或 Task，Participant 可以直接创建和保存自己的 Document。

系统需要提供身份认证、基于角色的权限控制和 Participant 数据隔离；支持 Study 与 Task 管理、Session 状态维护、Markdown 编辑与实时预览、Response 提交，以及独立 Document 的创建和保存。Participant 只能访问自己的 Sessions、Responses 和 Documents，Researcher 可以管理 Studies 并查看相关实验数据。

暂不涉及搜索、分享、多人协作、AI 写作、跨设备同步和自动化数据分析。

## 2. Use Case Analysis

这里采用最小形式描述 Use Case：

```text
Use Case = Actor + Action + Flow + Result
```

| ID | Actor | Action | Result |
|---|---|---|---|
| UC-01 | Participant / Researcher | 登录系统 | 系统确认身份并授予对应角色的访问权限 |
| UC-02 | Participant | 查看 Studies | 系统显示当前可参与的 Studies |
| UC-03 | Participant | 开始或继续 Session | 系统创建或恢复一次实验过程 |
| UC-04 | Participant | 领取 Task | 系统分配 Task，并建立待完成的 Response |
| UC-05 | Participant | 完成并提交 Response | 系统保存 Markdown 写作结果并关联当前 Session 与 Task |
| UC-06 | Participant | 自由写作 | 系统保存一个不关联 Study 的 Document |
| UC-07 | Researcher | 管理 Study | 系统允许创建、编辑或关闭 Study 及其 Tasks |
| UC-08 | Researcher | 查看实验数据 | 系统显示 Participants、Sessions 和 Responses |

其中，Flow 描述 Actor 完成目标时与系统交互的主要过程。这里选择三个具有代表性的 Use Cases 展开：

**UC-03 开始或继续 Session**

1. Participant 登录并选择一个可参与的 Study。
2. 系统验证 Participant 是否可以参与该 Study。
3. 系统查找尚未完成的 Session；如果不存在，则创建新的 Session。
4. 系统将 Session 与当前 Participant 和 Study 关联，并进入任务页面。

如果 Study 已关闭或 Participant 没有参与权限，系统拒绝创建 Session。

**UC-05 完成并提交 Response**

1. Participant 打开已领取的 Task，系统验证当前 Session 和 Response 的归属关系。
2. 系统打开与 Response 关联的 Document。
3. Participant 使用 Markdown 写作，系统实时更新预览，并允许保存草稿。
4. Participant 提交 Response，系统再次验证身份、Session 和 Task 状态。
5. 系统保存最终 Document，将 Response 标记为已提交，并记录提交结果。

如果保存失败，系统保留尚未提交的内容并提示错误；已经提交的 Response 不能被重复提交。

**UC-08 查看实验数据**

1. Researcher 选择一个自己管理的 Study。
2. 系统验证 Researcher 对该 Study 的访问权限。
3. 系统读取相关 Participants、Sessions、Tasks 和 Responses。
4. 系统展示 Study 的参与进度和已提交的写作结果。

Researcher 不能访问自己无权管理的 Study 数据。

## 3. Domain Modeling

Domain Modeling 从 Use Cases 中提取稳定的业务对象、关系和规则，而不是直接设计数据库表。这个系统包含 `User`、`Study`、`Task`、`Session`、`Response` 和 `Document` 六个核心领域对象。

```text
User
└── role: PARTICIPANT | RESEARCHER

Study 1 ── contains ── * Task
User(PARTICIPANT) 1 ── starts ── * Session
Session * ── belongs to ── 1 Study
Session 1 ── records ── * Response
Response * ── answers ── 1 Task
Response 1 ── references ── 1 Document
User(PARTICIPANT) 1 ── owns ── * Document
User(RESEARCHER) 1 ── manages ── * Study
```

`Study` 表示一项完整的研究设计，`Task` 是其中的具体写作任务，`Session` 表示某位 Participant 的一次参与过程，`Response` 表示该 Session 对某个 Task 的回答。Participant 领取 Task 时，系统创建一个处于草稿状态的 Response；提交后，Response 进入已提交状态。

`Document` 专门承载 Markdown 内容。任务写作中的 Document 由 Response 引用，自由写作中的 Document 则不关联任何 Response。这样，写作内容与实验流程保持分离，同时可以复用同一套 Markdown 编辑能力。
