本文尝试回答一个问题：如何为 deep learning project 设计一个**易用**的**代码架构**？

假设我们正在推进一个 deep learning project。为了让它能够持续迭代，需要将相关代码组织成一个 library，以下简称 `dl_lib`。本文讨论的，就是如何设计这个 `dl_lib`。

`dl_lib` 的 main distribution 天然定义了一条边界。根据人与这条边界的交互方式，可以区分两种身份：

- **库使用者（Library User）**：使用已有能力完成训练、推理和评估等。
- **库开发者（Library Developer）**：开发和维护 Public API、Core Mechanisms 和 Built-in Features。

这是对使用方式的逻辑划分，而不是对人的固定分类。一个 deep learning project 可能只有一名参与者，但他仍然会在不同场景下切换身份。

## Requirements Analysis

两种身份观察 library 的角度不同，带来的需求也不同：

- **Library User**：使用已有能力。
    - *训练*：从头训练一个 model，或者从 checkpoint 继续训练。
    - *推理*：加载 pretrained model，对单个或一批 samples 进行推理。
    - *评估*：在指定 benchmark 上评估 model，并获得结构化结果。
    - *集成*：将已有能力集成到 downstream application 中。
- **Library Developer**：开发和维护 main distribution。
    - *Public API*：设计和维护稳定、易用的 public workflows。
    - *Core Mechanisms*：维护 contracts 和共享 mechanisms。
    - *Built-in Features*：实现随 library 一同发布的 model、dataset、loss、metric 或 benchmark 等。

## Library User: Public API

首先从 Library User 的角度设计 `dl_lib` 的 Public API。训练和评估围绕同一个 model lifecycle，可以由同一个 `Trainer` 管理；推理则由负责加载 model、准备输入并执行预测的 `Pipeline` 管理。“集成”可以通过组合这两个 API 实现：

```text
Library User 的 4 类需求
├── 训练   → Trainer.fit()
├── 推理   → Pipeline.__call__()
├── 评估   → Trainer.evaluate()
└── 集成   → 组合已有 API，不新增核心 API
```

参考 Transformers 的 [Trainer](https://huggingface.co/docs/transformers/main/trainer) 和 [Pipeline](https://huggingface.co/docs/transformers/main_classes/pipelines)，`dl_lib` 提供两个核心 workflow objects：

```python
from dl_lib import Pipeline, Trainer

# Trainer
trainer = Trainer(config)

# 训练与评估
training_result = trainer.fit()
evaluation_result = trainer.evaluate(benchmark)

# 推理
pipeline = Pipeline(model)
inference_result = pipeline(data)
```

这里省略了 `config`、`model`、`benchmark` 和 `data` 的具体构造，只表达 Public API 的使用形态。其中，`model` 既可以是已经加载的 `Model`，也可以是类似 Transformers model name 的 `ModelIdentifier`。

进一步明确每个 API 的 input 和 output types，可以得到一份最小的 API contract：

```python
Trainer.__init__(
    config: TrainerConfig,
)

Trainer.fit() -> TrainingResult

Trainer.evaluate(
    benchmark: Benchmark,
    config: EvaluationConfig | None = None,
) -> EvaluationResult

Pipeline.__init__(
    model: Model | ModelIdentifier,
    config: PipelineConfig | None = None,
)

Pipeline.__call__(
    data: InferenceInput,
    config: InferenceConfig | None = None,
) -> InferenceResult
```

这些 types 的含义如下：

- `TrainerConfig`：选择 model、data、loss 和 optimizer，指定 initial weights 或 checkpoint，并配置 training runtime；Library User 不需要在 `Trainer` 外部实例化这些 components。
- `Trainer`：持有 training/evaluation 所需 components 和 runtime state 的 workflow object。
- `TrainingResult`：一次训练的结构化结果，其中包含产出的 `Model`。
- `Model`：已经实例化并加载到内存中、可用于推理或评估的 model。
- `ModelIdentifier`：可由 library 解析的 model name、local checkpoint path 或 remote repository ID。
- `PipelineConfig`：创建和初始化 inference pipeline 所使用的配置。
- `Pipeline`：接收 `Model` 或 `ModelIdentifier`，解析并加载 model、preprocessing 和 runtime state，提供可重复调用的 inference workflow。
- `InferenceInput`：一次 inference 调用的完整输入。
- `InferenceConfig`：执行一次 inference 调用所使用的配置。
- `InferenceResult`：与输入对应的推理结果。
- `Benchmark`：评估 model 所使用的数据与规则。
- `EvaluationConfig`：执行 benchmark evaluation 所使用的配置。
- `EvaluationResult`：benchmark evaluation 的结构化结果。


## Library Developer

Library Developer 负责开发和维护 `dl_lib` 的 Public API、Core Mechanisms 和 Built-in Features。

### Public API Development

Library Developer 需要将 Library User 的需求转化为稳定、易用的 public workflows，并维护其 input/output contracts 和 backward compatibility。前文的 `Trainer` 和 `Pipeline` 就属于这一层。

### Core Mechanism Development

Core Mechanisms 是支撑 Public API 和 Built-in Features 的最小共享机制集合，例如 registry、serialization 和 runtime，以及 model、dataset、loss、metric 和 benchmark 等内部 contracts。

Core Mechanisms 不以实现所有具体 use cases 为目标，也不应依赖某个 Built-in Feature。

### Built-in Feature Development

Built-in Features 是与 `dl_lib` 一同开发、测试和发布的 model、dataset、loss、metric 和 benchmark 等具体能力。它们建立在 Core Mechanisms 之上，并获得 main distribution 的 compatibility 和 maintenance commitment。

```text
Library User      ──使用──> Public API
Library Developer ──开发和维护──> Public API + Core Mechanisms + Built-in Features
```


## 延伸阅读

- Yuxin Wu, [How to Maintain Clean Core APIs for Research](https://ppwwyyxx.com/blog/2022/Maintain-Clean-Core-APIs-for-Research/)
- John Ousterhout, [A Philosophy of Software Design](https://go7hic.github.io/A-Philosophy-of-Software-Design)
