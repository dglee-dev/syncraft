---
title: pnpm vs npm
category: tech
---


# pnpm vs npm

출처: [https://pnpm.io/pnpm-vs-npm](https://pnpm.io/pnpm-vs-npm)

> npm maintains a flattened dependency tree as of version 3. This leads to less disk space bloat, with a messy `node_module` directory as a side effect.

링크의 내용을 간단히 정리하자면, 먼저 `npm` 은 디펜던시를 플랫한 구조 로 유지해 디스크 용량을 덜 차지 하도록 제한하지만 이것이 매우 복잡하게 보여 사용자로 하여금 불편함을 야기한다.

반면 `pnpm` 은 하드/심볼릭 링크 를 사용해 디스크 용량 차지도 줄이고 node_modules 폴더의 구조도 매우 심플하게 유지할 수 있도록 도와준다. 결과적으로 'silly bugs' 를 방지한다.