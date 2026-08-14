本文尝试回答一个问题：如何为 deep learning project 设计一个**易用**的**代码架构**？

假设我们正在推进一个 deep learning project。为了让它能够持续迭代，需要将相关代码组织成一个 library，以下简称 `dl_lib`。本文讨论的，就是如何设计这个 `dl_lib`。

`dl_lib` 天然定义了一条边界。站在边界外部，人们使用它已经提供的能力；进入边界内部，人们实现或扩展这些能力。由此，可以区分人与 library 交互时的两种身份：

- **库使用者（Library User）**：使用已有能力完成训练、推理和评估等。
- **库开发者（Library Developer）**：实现新的 model、dataset、loss 或 metric 等。

这是对使用方式的逻辑划分，而不是对人的固定分类。一个 deep learning project 可能只有一名参与者，但他仍然会在不同场景下切换身份。

## 需求分析

两种身份观察 library 的角度不同，带来的需求也不同：

- **Library User**：希望使用已有能力。
    - *训练*：从头训练一个 model，或者从 checkpoint 继续训练。
    - *推理*：加载 pretrained model，对单个或一批 samples 进行推理。
    - *评估*：在指定 dataset 上运行 evaluation protocol，并获得结构化结果。
    - *部署*：导出能够脱离训练环境使用的 model，并集成到下游 application 中。
- **Library Developer**：希望扩展 library。
    - *模型*：实现新的 model architecture、encoder 或 decoding strategy。
    - *数据*：添加新的 dataset、data transform 或 batch construction 方式。
    - *训练*：添加新的 loss、optimizer 或 training strategy。
    - *评估*：添加新的 metric 或 evaluation protocol。
