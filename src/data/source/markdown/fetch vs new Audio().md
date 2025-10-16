---
title: fetch vs new Audio()
category: tech
---


# fetch vs new Audio()

GPT에게 다음과 같이 물어보았다.

> 오디오를 불러올 때fetch랑 new Audio로 가져오는게 다르니?

그러자 그렇다고 답했다.

요약하자면 fetch로 오디오 데이터를 로딩하면, ArrayBuffer로 가져오기 때문에 로딩프로세스에 더 직접적으로 관여할 수 있게 된다. 반면, new Audio를 사용해 오디오를 불러오는 순간 오디오 로딩은 브라우저가 책임지게 된다. 문법 상으로는 더 직관적일 수 있으나 오디오 로딩 프로세스를 직접적으로 제어하기 비교적 어려워진다.

fetch로 가져온 결과를 decodeAudioData로 디코딩해 raw audio data를 만들어내고, 이 상태에서 오디오 컨텍스트 안에서 많은 프로세싱이 가능.

new Audio는, 만드는 순간 로딩되고 플레이될 때 브라우저에서 자동으로 디코딩이 시작된다.

암튼 그렇다. 오랜만의 글.