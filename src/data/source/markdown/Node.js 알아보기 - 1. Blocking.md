---
title: Node.js 알아보기 - 1. Blocking
category: tech
---


# Node.js 알아보기 - 1. Blocking

[Overview of Blocking vs non-blocking](https://nodejs.dev/en/learn/overview-of-blocking-vs-non-blocking/)

## Blocking

Blocking이라는 용어에는 약간의 오해가 있는데, Blocking은 그저 무거운(CPU intensive) 자바스크립트 오퍼레이션을 처리하느라 생기는 병목을 말하는 것이 아니다.

> In Node.js, JavaScript that exhibits poor performance due to being CPU intensive rather than waiting on a non-JavaScript operation, such as I/O, isn't typically referred to as `blocking`.

그러므로 다시 정의하자면, Node.js에서의 Blocking은 I/O와 같은 `non JavaScript operation` 때문에 이벤트룹의 작동이 제대로 이어지지 못하는 것을 의미하는 것이다.

> `Blocking` is when the execution of additional JavaScript in the Node.js process must wait, until a non-JavaScript operation completes.

그래서 Node.js의 I/O 메서드는 모두 non-blocking을 위한 async 버전을 지원한다. readFile가 그러한(non-blocking) 경우이고, readFileSync가 blocking 이다.

```
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

만약 readFileSync에서 발생하는 데이터가 제대로 처리되지 않는다면 the process will crash, 라고 한다.

하지만 아래와 같은 async 버전에서는 에러가 잡히지 않더라도 프로세스가 깨지지는 않는다.

```
const fs = require('fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});

moreWork();
```

> The ability to run `moreWork()` without waiting for the file read to complete, is a key design choice that allows for higher throughput.

## Concurrency and Throughput

다 아는 이야기이다. Node.js에서의 자바스크립트 실행은 싱글스레드로 이루어진다. concurrent work를 위해 여러개의 추가적인 스레드를 생성하는 다른 언어들과는 달리, 자바스크립트는 Event loop이 이러한 동시성 처리를 가능하게 만든다.

---
