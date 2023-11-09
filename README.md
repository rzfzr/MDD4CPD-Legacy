# MDD4CPD
Model Driven Methodology For Cyber-Physical Devices

More info about this here: https://dl.acm.org/doi/abs/10.1145/3535511.3535542


## Tool Architectural Flow
```mermaid
graph TD;
    ArduinoLibrary-->|LibraryParser|ComponentPalette-->|Dragged|Diagram-->|onChange -> diagram serialization|Nodes&Links-->CodeGenerator-->Problems;
    CodeGenerator-->ArduinoCode;
    CodeGenerator-->CodeComments;
```

## Master's Thesis

[Document is hosted here](documents/thesis.pdf)