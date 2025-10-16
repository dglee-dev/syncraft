---
title: Leetcode 1025 `Divisor Game` 을 풀어보자.
category: tech
---


# Leetcode 1025 `Divisor Game` 을 풀어보자.

DP문제인 리트코드 1025번을 풀어보자.

문제는 다음과 같다.

> 앨리스와 밥이 돌아가며 게임을 하고, 앨리스가 항상 먼저 시작한다. 칠판에 `N` 이라는 숫자가 주어지고, 
앨리스와 밥은  `1 < x < N 이고 N을 나누어 떨어지는 (나머지가 0인) x값` 중 하나를 골라 게임을 진행한다. 
이후 `N` 에서 플레이어가 고른 `x` 값을 빼고, 다음 차례로 넘긴다. 
자신의 차례에서 게임을 진행할 수 없을 때, (숫자를 고를 수 없을 때, 즉 N이 1이 되었을 때) 패배한다. 
N이 주어질 때, 앨리스가 이기는 경우에만 `true` 를 리턴하는 함수를 작성하라. 
(앨리스와 밥은 각각의 게임에서 승리에 최적화된 숫자를 선택한다고 가정한다.)

> Alice and Bob take turns playing a game, with Alice starting first. 
Initially, there is a number N on the chalkboard.
On each player's turn, that player makes a move consisting of: 
Choosing any x with 1 < x < N and N % x == 0.
Replacing the number N on the chalkboard with N - x. 
Also, if a player cannot make a move, they lose the game.
 
> Return True if and only if Alice wins the game,
assuming both players play optimally.

친절하게 원문을 포함시켰다.

먼저 문제를 이해해보자. 항상, 코드를 쓰기 전에 문제를 충분히 이해하고 명확하게 정의하는 것이 문제해결의 지름길임을 명심하자.

예를 들어 N이 4로 주어졌다고 하자. 앨리스가 선택할 수 있는 숫자는 1과 4 사이의 숫자 중 4를 나누어 나머지가 0인 `1` 과 `2` 이다. 

이 두 숫자 중 어떤 것을 택하느냐에 따라 앨리스의 승패는 바뀔 수 있다. 1을 택하는 경우, N에서 1을 뺀 3을 밥에게 전달하고 밥은 1만을 선택할 수 있다. 밥이 1을 선택하면 다시 앨리스에게 2가 전달되고, 앨리스는 1을 선택하고, 밥은 1을 넘겨받게 되어 앨리스의 승리가 결정된다.

앨리스가 처음에 2를 선택한다면 위에서 보았듯 2를 전달받은 밥은 1만을 선택할 수 있고, 앨리스는 1을 전달받아 패배한다. 여기에서 `중복되는 상황` 이 발생했음을 알 수 있고, 이 문제가 DP를 활용해 최적화 된 형태로 해결될 수 있음을 알 수 있다. (4가 주어진 경우에 어떤 결과가 나오는가? 가 Main problem이라면, 이를 해결하기 위해 3이 주어진 경우 - 2가 주어진 경우 - 1이 주어진 경우들의 결과를 알아내어야 하고, 한번의 Main problem을 해결할 때 이러한 시행들이 중복되어 일어난다. 또한 Main problem에서 택하는 optimal solution은 Sub problem들의 optimal solution의 합이다 - Sub problem들을 이어서 앨리스가 이기는 경우가 하나라도 있다면, 그것이 optimal main solution으로 선택되기 때문. [DP시리즈의 두번째 글](https://velog.io/@nninnnin7/%EC%96%B4%EB%96%A4-%EB%AC%B8%EC%A0%9C%EC%97%90-DP%EA%B0%80-%EC%A0%81%EC%9A%A9%EB%90%98%EB%8A%94%EA%B0%80)을 보면 DP 솔루션을 적용할 수 있는 조건을 모두 갖추었음을 알 수 있다.)

때문에 중복되는 계산의 결과를 저장할 수 있는 DP를 배열로 만들어야 함을 생각할 수 있고, 각각의 게임을 재귀호출로 Sub-problem화 시켜야 함을 생각해볼 수 있다. 재귀호출의 결과가 리턴되었을 때 해당 결과(boolean)를 뒤집은 값으로 Sub-problem들 에서의 앨리스의 승패를 처음 호출된 함수에게 전달할 수 있다. (앨리스 - 밥의 차례로 게임이 진행되고, 승패가 true-false로 반환되기 때문) 우리가 원하는 것은 앨리스가 이길 수 있는 루트가 하나라도 있느냐? 없느냐? 이므로 or 연산자 `||` 를 사용하여 재귀함수 바깥에 선언된 `result` 등의 변수에 truthy 값을 저장하고, 모든 게임의 결과가 고려된 값을 리턴할 수 있다.

...장황한 글과 코드의 조합으로 누군가를 이해시킬 수 있다면 좋으련만, 일단은 나 자신의 이해를 남기기 위한 기록으로 한다.

코드는 아래와 같다.

```javascript

var divisorGame = function (N) {
  const DP = [];
  DP[1] = false;
  
  function checkGameResult (num) {
    let result = false;

    if (DP[num] !== undefined) {
      console.log(`DP for ${num} = ${DP[num]} has used!`);
      return DP[num];
    }

    const selectedNumbers = selectNumbers(num);

    for (let i = 0; i < selectedNumbers.length; i++) {
      result = result || !checkGameResult(num - selectedNumbers[i]);

      DP[num] = result;
    }
    
    return result;
  }

  function selectNumbers (N) {
    const selected = [];

    for (let num = 1; num < N; num++) {
      if (N % num === 0) {
        selected.push(num);
      }
    }

    return selected;
  }

  return checkGameResult(N);
};


```