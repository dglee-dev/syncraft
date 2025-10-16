---
title: DP는 어떻게 적용될 수 있을까?
category: tech
---


# DP는 어떻게 적용될 수 있을까?

당신이 풀려고 하는 문제에 DP가 적용될 수 있음을 알았다면, 이제 적용해서 잘 푸는 일만 남았다. 

그런데 실제적으로 DP는 어떻게 적용될 수 있을까?


아래와 같은 문제가 있다고 하자.


> 1, 3, 5 라는 숫자가 주어진다. 
> N을 입력받고, 주어진 세 숫자를 더해 N을 만들 수 있는 모든 경우의 수를 구하라.
> 숫자는 중복해서 사용할 수 있고, 더하는 위치가 바뀌는 경우는 다른 경우로 생각한다.
> `ex => (1 + 1 + 3  !== 1 + 3 + 1)`


1. 이 문제는 왜 DP인가?

DP는 큰 문제를 작은, 부분적으로 중복되어 있는 문제들로 나눌 수 있다 (overlapping subproblems).  이 문제의 경우 N이 6으로 주어졌을 경우를 main problem으로 본다면 이를 다음과 같은 sub problem들로 나눌 수 있다.

1) 합해서 5가 나오는 경우에 1을 더한다.

2) 합해서 3이 나오는 경우에 3을 더한다.

3) 합해서 1이 나오는 경우에 5를 더한다.



sub problem들은 각각 또 더 작은 sub problem들로 나누어질 수 있을 것이다. 코드에서는 이를 재귀호출로 표현할 수 있겠다.



```javascript
function solve (n) {
    if (n < 1) {
		return 0;        
    }        
    if (n === 1) {
        return 1;
    }
        
    return solve(n - 1) + solve(n - 3) + solve(n - 5)
}

solve(6);
```



solve(6)을 호출했을 때 solve(5) + solve(3) + solve(1) 이 리턴될 것이다. solve(1)은 1을 리턴하고, solve(3)은 solve(2) + solve(0) + solve(-2) 로 또 다시 sub problem들로 나뉘어 solve를 재귀호출 한다. solve(5) 또한 마찬가지다. 따져보면 solve(2)나 solve(3) 등 중복된 input으로 호출되는 시행이 있음을 알 수 있다. 따라서 메모이제이션 기능을 추가한다.



```javascript
const MEMO = [];

function solve (n) {
    if (n < 1) {
		return 0;        
    }   
    
    if (n === 1) {
        return 1;
    }
    
    if (MEMO[n] !=== undefined) {
        return MEMO[n];
    }
        
    return MEMO[n] = solve(n - 1) + solve(n - 3) + solve(n - 5);
}

solve(6);
```



또 다른 방법으로는, 태뷸레이션을 활용할 수도 있겠다.


다음시간에는 리트코드에서 실제 DP 문제를 풀어보고, 어떻게 풀었는지, 어떻게 풀었어야 했는지(...) 등을 공유해보도록 하겠다!