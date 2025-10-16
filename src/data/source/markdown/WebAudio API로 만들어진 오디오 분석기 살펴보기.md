---
title: WebAudio API로 만들어진 오디오 분석기 살펴보기
category: tech
---


# WebAudio API로 만들어진 오디오 분석기 살펴보기

오늘 살펴볼 오디오 분석기를 먼저 사용해보자.\
Start 버튼을 클릭하면 음악이 재생되고 파형을 분석하여 시각적으로 보여준다.

<iframe src="https://web-audio-examples.s3.ap-northeast-2.amazonaws.com/webaudio-examples/audio-analyser/index.html" width="560" height="315"></iframe>

멋지게 작동한다!\
어떻게 작동하는지 알아보기 위해 코드를 살펴보자.

```
fetch("tales-of-phantasia.mp3")
  .then(response => response.arrayBuffer())
```

먼저 음원을 가져온다. 좋아하는 게임인 테일즈 오브 판타지아의 OST를 사용해 보았다. fetch의 결과로 주어지는 `Response` 객체는 `arrayBuffer()` 라는 메서드가 존재하는데, 프로미스를 리턴하며 리졸브 시 [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 객체를 리턴한다.

```
.then(downloadedBuffer => audioContext.decodeAudioData(downloadedBuffer))
```

ArrayBuffer 형태로 가져온 데이터를 [`decodeAudioData`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) 메서드에 넣어 디코딩해준다. 여기에서의 디코딩은 ArrayBuffer에 담긴 오디오파일 데이터를 AudioContext의 샘플링 레이트로 리샘플되어지는 것을 의미한다.

디코딩 이후에는 본격적으로 오디오 노드들을 생성하고 입맛대로 처리(?)하기 위한 코드들을 작성하게 된다.

```
.then(decodedBuffer => {
  // 1.1. sourceNode를 생성한다.
  const sourceNode = new AudioBufferSourceNode(
    audioContext,
    {
      buffer: decodedBuffer,
      loop: true,
    }
  );

  // 1.2. AnalyserNode 를 생성한다.
  const analyserNode = new AnalyserNode(audioContext);

  // 1.3. 오디오 프로세싱에 필요한 ScriptProcessorNode 를 생성한다
  const javascriptNode = audioContext.createScriptProcessor(
    1024, // buffer size
    1, // numberOfInputChannels
    1 // numberOfOutputChannels
  );

  // ..
 });
```

브라우저에서의 오디오 프로세싱에 사용되었던 `audioContext.createScriptProcessor` 는 deprecated 되었으며 `AudioWorklet` API로 대체되었다고 한다. 이유는 main thread를 사용해 성능 저하를 일으키던 부분을 WebWorker인 worklet으로 구현하여 background audio processing을 하기 위해서라고. 관련된 자세한 내용은 [여기](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet)

```
// 2. ...
sourceNode.connect(audioContext.destination);
sourceNode.start(0);
```

sourceNode가 오디오를 출력할 수 있도록 destination에 연결시켜 준 후 `start` 메서드를 이용해 음원을 재생시킨다.

```
// 3. ..
sourceNode.connect(analyserNode);
analyserNode.connect(javascriptNode);
javascriptNode.connect(audioContext.destination);
```

analyserNode => javascriptNode => destination 의 순서로 연결시켜주어 분석에 이용될 수 있도록 노드를 연결해주었다.

다음은 analyserNode에서 전달받은 데이터로 오디오 프로세싱 단계에서 그려내는 과정을 코드로 작성한다.

```
javascriptNode.onaudioprocess = () => {
  // ..
}
```
프로세싱 단계에서 할 일을 `onaudioprocess` 이벤트를 핸들링하는 함수에 작성해준다.  그렇다면 `onaudioprocess` 이벤트는 언제, 얼마나 자주 발생할까?

> The `audioprocess` event of the ScriptProcessorNode is fired when an input buffer of a script processor is ready to be processed. (MDN)

`audioprocess`이벤트는 `input buffer`가 프로세싱 될 준비가 되었을 때 발생한다고  한다. 그렇다면 `input buffer`는 무엇인가?

이번에는 Chat GPT가 도움을 주었다.

> In the context of the ScriptProcessorNode, the input buffer is essentially a chunk of audio samples that are ready to be processed.

> The audioprocess event is fired periodically as audio data flows through the node. The rate at which this event is fired depends on the buffer size and the sample rate of the audio context.

정리하자면, `input buffer` 는 한번에 처리되는 오디오 샘플 덩어리이다. 따라서 이것이 얼마나 자주 프로세싱 되어야 하는지는 오디오 전체의 크기(buffer size)와 덩어리의 크기(sample rate)에 영향을 받는다. (왜, 어떻게 영향을 받는지에 대해서는 또 다른 글로 작성해보겠다.)

이제 `audioprocess` 이벤트가 일어날 때 어떤 일이 생기는지 코드로 확인해보자.

```
javascriptNode.onaudioprocess = () => {
  const amplitudeArray = new Uint8Array(
    analyserNode.frequencyBinCount
  );

  analyserNode.getByteTimeDomainData(amplitudeArray);

  if (audioContext.state === "running") {
    // ...
  }
}
```

마지막으로 canvas위에 시각화가 이루어지는 코드이다.

```
javascriptNode.onaudioprocess = () => {
  // ...

  if (audioContext.state === "running") {
    requestAnimationFrame(() => {
      const canvasContext = canvasElt.getContext("2d");

      canvasContext.clearRect(
        0,
        0,
        canvasElt.width,
        canvasElt.height
      );

      for (let i = 0; i < amplitudeArray.length; i++) {
        const value = amplitudeArray[i] / 256;
        const y = canvasElt.height - canvasElt.height * value;

        canvasContext.filStyle = "white";
        canvasContext.fillRect(i, y, 1, 1);
      }
    });
  }
}
```

---

해당 소스는 MDN의 WebAudio API 예제 중 일부입니다.

[webaudio-examples/audio-analyser - MDN Github](https://github.com/mdn/webaudio-examples/blob/main/audio-analyser/index.html)