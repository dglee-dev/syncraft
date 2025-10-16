---
title: 쿼리스트링 다루는 방법들 (qs, URLSearchParams)
category: tech
---


# 쿼리스트링 다루는 방법들 (qs, URLSearchParams)

 웹 개발자라면 쿼리스트링을 다루는 일은 빈번한데 주로 페이지네이션 등 리소스를 원하는 방식으로 가져오기 위해 파라미터를 전달해야하는 상황에서 사용된다.

이런 상황 속에서 쿼리스트링을 다루기 위한 유틸리티들이 발전해왔는데, 오늘 간단히 알아볼 것은 오픈소스 라이브러리 `qs` 와 ECMA Script 빌트인 객체인 `URLSearchParams` 이다.

먼저 빌트인 객체인 `URLSearchParams` 를 먼저 살펴보자.

```
const searchParams = URLSearchParams('?type=tech'); // 물음표는 제거된다.

for (p of searchParams) {
  console.log(p); // ['type', 'tech']
}
```

간단하다. 쿼리스트링을 전달해주면 엔트리를 순회할 수 있는 이터레이터를 반환해준다.

이터레이터의 역할을 할 뿐 아니라 여러가지 메서드를 탑재하고 있는데, `get`, `set`은 물론 다시 스트링으로 확인할 수 있는 `toString`, 존재여부를 확인하는 `has`, 새로운 엔트리를 추가할 수 있는 `append` 등이 있다.

아래처럼 객체를 넘겨줄수도 있다!

```
const searchParams = URLSearchParams({ name: 'justin', age: 100 });

for (p of searchParams) { .. }
```

이 정도면 대부분의 상황에서 쿼리스트링을 다루는데에 문제가 없어보인다. 그런데 왜 `qs` 라이브러리는 아직도 7백만의 주간 다운로드 횟수를 자랑하는걸까?

![qs](https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/qs-library.png)

이에 대한 아주 좋은 답변이 있어 가져와보았다. 클릭하면 해당 이슈를 직접 확인해 볼 수 있다.

[![why-use-qs](https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/why-use-qs.png)](https://github.com/denolib/qs/issues/3#issuecomment-512703136)

간단히 정리하자면,

- URLSearchParams 는 2019년 기준 92%의 브라우저를 대응하므로 polyfill이 필요할 수 있다. (대부분의 경우에는 해당하지 않을 듯 하고, 2023년 기준으로는 더더욱 그렇다)
- nesting을 지원하지 않는다!**

두번째 이슈는 꽤나 중요하다. 예를 들어 `qs`는 다음과 같이 사용할 수 있다.

```
const queryString = qs.stringify({ person: { name: 'justin', age: 100 } });

console.log(queryString); // "person[name]=justin&person[age]=18"
```

이렇게 쿼리스트링을 중첩해서 사용하는 것이 좋은가? 에 대해서는 의견이 분분할 수 있겠으나 현재 내가 블로그의 백엔드 프레임워크로 사용하고 있는 스트라피를 예로 들면, 애초에 프론트엔드에서 모든 쿼리에 대한 주도권을 가지고 여러 사용처에 대응할 수 있도록  인터페이스가 구현되어야 하기 때문에 쿼리스트링을 중첩된 객체로 전달하는 것이 유의미하다고 볼 수 있겠다.

간단하게 쿼리스트링을 다루는 두가지 방법에 대해 알아보았다.