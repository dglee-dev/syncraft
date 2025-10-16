---
title: Blender 튜토리얼 1: 화면 이동, 오브젝트 이동
category: tech
---


# Blender 튜토리얼 1: 화면 이동, 오브젝트 이동

<iframe width="560" height="315" src="https://www.youtube.com/embed/nIoXOplUvAw?si=1gjiBfrCO_XQngM4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

위와 같은 좋은 학습자료를 발견하여 시청하며 내용을 정리해본다.\
Thanks to `Blender Guru` 😴 🌸

---

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-1.png" style="width: 100%" />

내가 만든 첫 블렌더 연습장의 모습이다.

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-camera-1.png" style="width: 100%" />

위 사진을 보면 노란색 박스와 초점이 보이는데, 이것이 카메라이다. `F12` 키를 누르면 아래의 사진과 같이 스냅샷을 찍어 카메라가 바라보고 있는 씬을 확인할 수 있다.

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-camera-snapshot.png
" style="width: 100%" />

---

## 오브젝트 이동
- 오브젝트가 선택 된 상태에서 `G`로 Grabbing
- `GX`, `GY`, `GZ`로 축을 기준으로 이동가능

## 오브젝트 회전
- `R` 키로 Rotate
- `RX`, `RY`, `RZ`

## 화면 이동

### 궤도 관측(Orbiting)
  - `마우스 휠키` 클릭한 채로 드래그
  - 화면 오른쪽의 <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/orbiting.png" style="width: auto; display: inline; height: 50px; margin:0; border-radius: 100%;" /> 를 클릭한 채로 마우스 드래그
    - 동그라미 `X`, `Y`, `Z`를 클릭하면 프리셋으로 설정되어있는 각도로 이동한다.

### 줌
- 마우스 휠 (마우스에 따라 도도독거림)
- `cmd` + `마우스 휠키` 클릭한 채로 드래그
- 화면 오른쪽 돋보기 <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-zoom.png" style="width: auto; display: inline; height: 50px; margin:0; border-radius: 100%;" /> 클릭한 채로 마우스 드래그

### 패닝
- `shift` + `마우스 휠키` 클릭한 채로 드래그
- 화면 오른쪽 돋보기 <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-move.png" style="width: 50px; display: inline; height: 50px; margin:10px 0; border-radius: 100%;" /> 클릭한 채로 마우스 드래그

### 오브젝트에 화면 포커스
  - 오브젝트를 선택한 채로 넘버패드의 `.` 키 누르기
  - `~` 키(tilde)를 클릭해 다음과 같은 버튼들(pie menu)이 나타났을 때 `선택된 항목을 보기` 클릭
  -   <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-focus.png" style="display: inline; width: 70%" />

## Perspective(원근법) vs Orthographic(정사법)

<div style="display: flex; justify-content: space-between width: 100%; margin: 2em;">
  <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-perspective.png" style="width: 48%; margin: 0;" />
  <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-orthographic.png" style="width: 48%; margin: 0; margin-left: auto;" />
</div>

  - 넘버패드의 `num5` 를 누르면 토글링 할 수 있다.
  - 또는 화면 오른쪽의 밭두렁모양(?) <img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-projection-icon.png" style="width: auto; display: inline; height: 50px; margin:0; border-radius: 100%;" /> 을 클릭하면 된다.
  - 원근법(왼쪽)은 현실에서 눈으로 사물을 바라볼 때 멀리 있는 것은 작게, 가까이 있는 것은 크게 보이는 현상을 반영해주는 투시법이다.
  - 정사법(오른쪽)은 모델링 시 편의를 위해 크기가 같은 오브젝트들은 멀리있어도 동일한 크기로 보여준다.

![properties](https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/blender-properties.png)

위 사진은 properties 이다. 갖가지 속성들을 제어할 수 있는데, 앞으로 하나씩 사용해보면서 알아가자..