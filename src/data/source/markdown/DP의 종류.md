---
title: DP의 종류
category: tech
---


# DP의 종류

Dynamic programming 이란 복잡한 하나의 문제를 여러 하위 문제들로 나누고, 각각의 결과를 저장한 후 해당 문제에 대한 중복 컴퓨팅을 제거하여 효율성을 개선하는 문제 해결 방법이다.

따라서 **같은 인풋에 대한 반복되는 호출을 하는 솔루션을 만났을 때**, 우리는 그것을 Dynamic programming 으로 최적화시킬 수 있다.



DP의 두가지 방법

- Tabulation (bottom up)
- Memoization (top down)



Tabulation이란 도표, 도표를 작성 - 의 뜻.

예를 들어 `factorial(n)`을 구하는 과정에 적용된 Tabulation 방식의 DP를 살펴보면..

```javascript
// factorial은 n까지의 수를 모두 곱한 것 이므로,
// factorial(n) = factorial(n-1) * n 으로 계산이 가능하다

// 따라서 i부터 n까지 '작은 값 에서부터 차례로 (= tabulation)' 팩토리얼 값들을 구하고, 
// 재사용 해 나가며 factorial(n)을 구할 수 있다.

const DP = [];

DP[0] = 1;

for (let i = 1; i < n; i++) {
    DP[i] = DP[i-1] * i;
}
```
설명하자면 n이 9로 주어지고 DP[9] 를 구하기 위해서는 DP[0], DP[1], DP[2] ... DP[9]의 순서대로 차근차근 값을 구하고 구한 값을 토대로 (그에 대한 중복된 계산을 하지 않고) 다음 값을 빠르게 구해나가는 bottom - up 형태를 취한다.




다음으로 Memoization은 top-down 방식이라 하였음으로 결과값`factorial(n)`에 대한 접근을 먼저 시도하지 않을까 유추해 볼 수 있다.

```javascript
const DP = [];

function solve (x) {
    if (x == 0) {
        return 1;
    }
    
    // 값이 DP에 존재한다면 사용한다.
    if (DP[x] !== undefined) {
        return DP[x];
    }
   	
    // 값이 DP에 존재하지 않는다면 구하고, 메모한다.
    return DP[x] = x * solve(x-1);
}
```

Tabulation 방식과 달리 먼저 결과값에 접근하려는 시도를 하고, 해당 값에 가까운 값을 DP에서 찾아나가며 탑다운의 형태로 중복된 값을 사용하거나 메모하는 형태를 띈다.

예를 들어, 팩토리얼 9를 구하기 위해 `solve(9)` 가 호출되었을 때 DP[0] 에서 차근차근 DP[9]까지 구해나가는 Tabulation과 달리 DP[9] 에서 부터 접근하여 DP[8], ... DP[1] 의 값들을 확인하고 재귀적인 호출 과정을 거친 이후 최종적인 값을 구할 수 있게 된다. 

아하!

<br>

다음 포스팅에서는 DP를 적용할 수 있는 문제가 가지고 있는 특성들에 대해 알아보도록 하자.

---

DP 관련 포스팅은 모두 [geeksforgeeks](https://www.geeksforgeeks.org/tabulation-vs-memoization/) 자료를 기반으로 작성하였습니다.