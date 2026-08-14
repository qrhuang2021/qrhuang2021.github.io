本文尝试回答一个问题：如何为 deep learning project 设计一个**易用**的**代码架构**？

假设我们正在推进一个 deep learning project。为了让它能够持续迭代，需要将相关代码组织成一个 library，以下简称 `dl_lib`。本文讨论的，就是如何设计这个 `dl_lib`。

`dl_lib` 天然定义了一条边界。站在边界外部，人们使用它已经提供的能力；进入边界内部，人们实现或扩展这些能力。由此，可以区分人与 library 交互时的两种身份：

- **库使用者（Library User）**：使用已有能力完成训练、推理和评估等。
- **库开发者（Library Developer）**：实现新的 model、dataset、loss 或 metric 等。

这是对使用方式的逻辑划分，而不是对人的固定分类。一个 deep learning project 可能只有一名参与者，但他仍然会在不同场景下切换身份。

## Requirements Analysis

两种身份观察 library 的角度不同，带来的需求也不同：

- **Library User**：希望使用已有能力。
    - *训练*：从头训练一个 model，或者从 checkpoint 继续训练。
    - *推理*：加载 pretrained model，对单个或一批 samples 进行推理。
    - *评估*：在指定 benchmark 上评估 model，并获得结构化结果。
    - *集成*：将已有能力集成到 downstream application 中。
- **Library Developer**：希望扩展 library。
    - *模型*：实现新的 model architecture、encoder 或 decoding strategy。
    - *数据*：添加新的 dataset、data transform 或 batch construction 方式。
    - *训练*：添加新的 loss、optimizer 或 training strategy。
    - *评估*：添加新的 benchmark、metric 或 evaluation protocol。

## Public API Design

首先从 Library User 的角度设计 `dl_lib` 的 public API。三个需求分别对应三个 API，“集成”可以通过组合已有 API 实现：

```text
Library User 的 4 类需求
├── 训练   → train()
├── 推理   → pipeline()
├── 评估   → evaluate()
└── 集成   → 组合已有 API，不新增核心 API
```

参考 [Transformers](https://huggingface.co/docs/transformers)，`dl_lib` 提供三个核心 API：

```python
from dl_lib import train, pipeline, evaluate

# 训练 → train()
result = train(config)

# 推理 → pipeline()
predictor = pipeline(model)
result = predictor(data)

# 评估 → evaluate()
result = evaluate(model, benchmark)
```

进一步明确每个 API 的 input 和 output types，可以得到一份最小的 API contract：

```python
train(
    config: TrainingConfig
) -> TrainingResult

pipeline(
    model: Model,
    config: InferenceConfig | None = None
) -> InferencePipeline

InferencePipeline.__call__(
    data: InferenceInput
) -> InferenceResult

evaluate(
    model: Model,
    benchmark: Benchmark,
    config: EvaluationConfig | None = None,
) -> EvaluationResult
```

这些 types 的含义如下：

- `TrainingConfig`：一次训练所需的完整配置。
- `TrainingResult`：一次训练的结构化结果，其中包含产出的 `Model`。
- `Model`：可被加载并用于推理或评估的 pretrained model。
- `InferenceConfig`：运行 inference pipeline 所使用的配置。
- `InferencePipeline`：持有已加载 `Model`、可重复调用的推理能力。
- `InferenceInput`：一次 inference 调用的完整输入。
- `InferenceResult`：与输入对应的推理结果。
- `Benchmark`：评估 model 所使用的数据与规则。
- `EvaluationConfig`：执行 benchmark evaluation 所使用的配置。
- `EvaluationResult`：benchmark evaluation 的结构化结果。
