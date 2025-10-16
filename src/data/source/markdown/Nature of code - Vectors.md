---
title: Nature of code - Vectors
category: tech
---


# Nature of code - Vectors

<iframe src="https://mini-examples.s3.ap-northeast-2.amazonaws.com/p5-vector/index.html"></iframe>

p5에서 평면 벡터를 다루는 법.  
코드는 다음과 같다..

```
let position;
let velocity;

function setup () {
  createCanvas(200, 200);
  
  position = createVector(width / 2, height);
  velocity = createVector(0, -1);
}

function draw () {
  position.add(velocity);
  
  if (position.y < 0) position.y = height;
  
  strokeWeight(5);
  point(position);
}
```