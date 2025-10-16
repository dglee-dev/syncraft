---
title: Texture
category: tech
---


# Texture

[3dtextures.me](https://3dtextures.me) 에서 여러가지 질감을 확인하고 다운로드 받을 수 있다.

`TextureLoader` 를 사용해 다운로드 받은 텍스쳐 이미지를 불러오고 MeshMaterial의 겉면에 매핑할 수 있다.

```js
const texture = new THREE.TextureLoader().load('..');

const material = new THREE.MeshStandardMaterial({ map: texture });
```

`MeshStandardMaterial` 에서는 다음과 같은 속성들로 추가적인 텍스처 매핑을 할 수 있다.

normalMap 법선 매핑 - 음영 추가?
displacementMap 변이맵 - 표면의 높낮이!
displacementScale - 변이의 수준 조절
roughnessMap - 재질에 따라 빛이 반사되는 정도