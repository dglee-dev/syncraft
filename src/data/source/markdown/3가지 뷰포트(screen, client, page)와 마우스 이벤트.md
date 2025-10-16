---
title: 3가지 뷰포트(screen, client, page)와 마우스 이벤트
category: tech
---


# 3가지 뷰포트(screen, client, page)와 마우스 이벤트

`screenX/Y`, `clientX/Y`, `pageX/Y` 는 모두 [MouseEvent](https://developer.mozilla.org/ko/docs/Web/API/MouseEvent) 의 속성이다. 마우스 클릭 등의 이벤트가 발생했을 때 해당 이벤트가 발생한 위치를 여러 뷰포트를 기준으로 표기하기 위한 지표들인 것이다.

그렇다면 이 세가지 뷰포트, `screen`,`client`,`page`가 어떻게 다른지 아래 그림(피그마로 만들었다)을 살펴보자.

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/screen-x--client-y--page-y.png" style="width: 100%; margin:0" />

간단하게 설명하자면,

- `screen`은 모니터 뷰포트를 의미한다.
- `client`는 브라우저의 뷰포트를 의미한다.
- `page`는 작성된 HTML document를 의미한다.

따라서 그림에서와 같은 위치에서 마우스가 클릭되었다면

- `pageY` 는 페이지 최상단과 커서의 Y축 거리이다.
- `screenX`는 모니터 뷰포트 왼쪽 끝과 커서의 X축 거리이다.
- `clientY` 는 브라우저 뷰포트 왼쪽 끝과 커서의 Y축 거리이다.

아하! 세가지 종류의 뷰포트와 그것을 기준으로 계산되는 마우스 이벤트 위치들에 대해 간단히 알아보았다.