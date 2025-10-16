---
title: Transform objects in three.js
category: tech
---


# Transform objects in three.js

three.js 에서 오브젝트들을 움직이는 방법을 배워보자.

## 움직임에는 4가지 속성이 있다

- position
- scale
- rotation
  - quaternion

`Object3D` 클래스를 상속하는 `PerspectiveCamera`나 `Mesh`는 모두 위의 속성들을 가지고 있다. 오브젝트의 transforming을 담당하는 이러한 속성들은 `matrices` 로 컴파일된다고 한다.


## 1. Position

### 1이 무엇인지 정해라

```
mesh.position.y = 1;
```

미터인가, 센티미터인가, 인치인가? 용도에 걸맞는 기준으로 정하는 것이 좋다. 집을 만들고 싶다면 미터로 정의하는 것이 편리할 것이다.


### position은 [`Vector3`](https://threejs.org/docs/?q=vector3#api/en/math/Vector3)이다.

그리고 `Vector3` 는 x, y, z를 가지고 있는것 이상으로 유용한 여러가지 메서드들을 가지고 있는 클래스이다.

### length()

예를 들어 `mesh.position.length()` 를 로깅해보면 소숫점의 값이 나오는 것을 확인할 수 있는데 이는 scene의 중심과 object position 사이의 거리를 의미한다.

> .length () : Float\
Computes the [Eucildean length](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line length) from (0, 0, 0) to (x, y, z).

### distanceTo()

`distanceTo()` 라는 메서드도 있다. 이는 또 다른 Vector3 와의 거리를 계산해준다.

```
mesh.position.distanceTo(new THREE.Vector3(0, 1, 2);
```

### set()

```
mesh.position.x = 0.7;
mesh.position.x = 0.6;
mesh.position.x = -1;
```

아래의 코드가 동일한 역할을 한다.

```
mesh.position.set(0.7, 0.6, -1);
```

### AxesHelper

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/three-axeshelper.png" style="display: inline; margin: 0" />

```
new AxesHelper(number);
```

초록, 빨강, 파랑으로 그어진 선이 axes helper의 역할이다. 포지션을 변경하는 기준선을 만들어준다. number 값을 조정해 선의 길이를 조절할 수 있다.

## 2. Scale

```
mesh.scale.set(x, y, z);
```

## 3. Rotation

mesh.position이 Vector3를 상속하듯 mesh.rotation은 [`Euler`](https://threejs.org/docs/#api/en/math/Euler)를 상속한다.

```
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
```

### Axes order, gimbal lock**

회전에 따라 회전축이 변경되면 의도치 않는 회전이 이루어질 수 있다. 

아래 2가지 회전을 몸으로 실험해보라.

- Y축으로 30도, X축으로 30도 회전
- X축으로 30도, Y축으로 30도 회전

이번에는 처음의 회전축을 유지한다고 생각하고 실험해보라.

이렇게 회전에 이용하는 축의 순서에 따라 결과가 달라질 수 있다. `reorder` 메서드로 회전을 실행할 순서를 지정할 수 있다.

```
mesh.rotation.reorder("YXZ"); // 기본값은 "XYZ" 이다.
mesh.rotation.x = Math.PI * 0.35;
mesh.rotation.y = Math.PI * 0.35;
```

두개의 축이 겹치게 되면 어떤 한 축에 대해서는 회전을 시행할 수 없게 되는데, 이것을 gimbal lock 이라고 부른다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/syQnn_xuB8U?si=8WOJL7NY3gCvSh2n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

위와 같은 문제들을 해결하기 위해 사용하는게 `quaternion` 이라고 한다.

### Quaternion

> Quaternion also expresses a rotation, but in a more mathematical way

### lookAt

```
camera.lookAt(mesh.position);
```

Object3D에 포함된 메서드이다. 오브젝트가 해당 지점을 바라보도록 만든다!

위의 코드처럼 사용해서 카메라를 원하는 오브젝트에 포커싱하기에 매우 적합하다.

> .lookAt(Vector3) / .lookAt(x, y, z) \
Rotates the object to face a point in world space.

## 묶어서 관리하기 (Scene Graph)

### Group

여러개의 오브젝트를 그룹지어 관리할 수 있도록 돕는다.

```
const group = new THREE.Group();

// 이렇게 그룹에 존재하는 모든 오브젝트를 한번에 조종(?)할 수 있다.
group.position.y = 1;
group.scale = 2;
group.rotation.y = 1;

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube2.position.x = -2;

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube2.position.x = 2;

group.add(cube1);
group.add(cube2);
group.add(cube3);
```

---