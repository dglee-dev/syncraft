---
title: 텍스트와 Buffer
category: tech
---


# 텍스트와 Buffer

먼저 버퍼란, 스트리밍되는 바이너리 데이터를 모아둘 수 있는 보관소 같은거다.
모아두어야 하는 이유는, 모이는 속도보다 처리속도가 늦어지거나 - 반대로 처리속도보다 모이는 속도가 느린 경우가 생기기 때문이다.

```
const buffer = Buffer.alloc(10);
```

이렇게 하면 10의 길이를 가진 버퍼를 하나 만들 수 있다.

```
const buffer = Buffer.alloc(10);
buffer.write("My name is Justin")
```

이것의 결과로 만들어지는 buffer는 `<Buffer 4d 79 20 6e 61 6d 65 20 69 73>` 로 출력된다.

표기되는 숫자는 Hexadecimal로 표현된 바이너리이다. 4d(0x4d)는 16이 4개, d로 표현되는 13이 1개 있는 것이므로 10진수로 변환하면 77이라는 숫자가 된다.

`buffer.toJSON()` 메서드를 이용해 확인해보면 아래와 같은 결과가 나오는데,

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/2023_12_10_11_47_37_97f2f227f3.png">

data: 에서 표현되는 숫자들은 십진수이고, 방금 계산해본 것과 같이 4d가 77로 표현되고 있음을 확인할 수 있다. 이것들은 우리가 write에서 입력한 문자열들을 유니코드 코드포인트로 표현해 준 결과이다.