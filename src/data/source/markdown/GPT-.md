---
title: GPT?
category: tech
---


# GPT?

Generative AI의 prominent framework, GPT.

GPT는 Generative Pre-trained Transformer의 약자이다.

그렇다면 GPT는 'Transformer' 인데, 이것은 신경망(Neural Network) 모델의 일종을 의미한다.

Transformer 모델 이전에는 RNN(Recurrent Neural Network) 등을 사용했다. 하지만 이는 연산을 선형적으로 처리해야 하기에 트레이닝 속도가 느린데다가, Long-range dependency 등의 문제가 있었다.

Transformer의 등장으로 병렬(Parallel) 연산이 가능해졌다. 그 외에도 아래와 같은 장점들이 생겨났다고 한다. 이 또한 ChatGPT 3.5에게 물어본 결과이다.

1. Parallelization: Unlike RNNs, which process sequences sequentially, transformer models can process all tokens in the sequence simultaneously, leading to faster training times and improved scalability.  

2. Long-range dependencies: The self-attention mechanism in transformer models allows them to capture long-range dependencies between words in a sequence more effectively than traditional sequential models, making them well-suited for tasks requiring understanding of context over larger spans.

3. Transfer learning: Pre-trained transformer models can be fine-tuned on specific tasks with relatively small amounts of task-specific data, making them highly effective for transfer learning across various NLP tasks.

4. Language modeling: Transformer models have significantly advanced the field of unsupervised learning through techniques such as masked language modeling (as in BERT) and autoregressive generation (as in GPT), enabling the generation of coherent and contextually relevant text.

결과적으로 Transformer의 등장은 컴퓨터의 자연어 이해와 Generative AI의 등장에 큰 역할을 했다고 볼 수 있다.
