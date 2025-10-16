---
title: Bit, Byte, Punchcard
category: tech
---


# Bit, Byte, Punchcard

'컴퓨터' 를 더 잘 알기 위한 몸부림..앞으로 이런 컴퓨터 구조와 관련된 공부를 지속해 나갈 생각.

소리나 그래픽을 다루는 API들을 공부하다보니 Binary data와 관련된 개념들 (float32Array 라던지, Buffer, ..)과 마주치게 되었고 모르는 영역에 대한 두려움이!

그래서 차근히 공부를 해나가야겠다는 생각으로.

비트, 바이트부터 시작해보자.

## bit와 byte

bit는 binary digit, 0 또는 1. 이진수.

byte는 8비트이다. 하나의 character를 표현하기 위한 수단으로 8개의 비트가 사용되는 것이 보편화되다 보니 8bit를 하나의 단위로 묶어 표현하게 되었다고 한다.

> The byte is a unit of digital information that most commonly consists of eight bits.\
Historically, the byte was the number of bits used to encode as single character of text in a computer and for this reason it is the smallest addressable unit of memory in many computer architectures. ([byte - Wikipedia](https://en.wikipedia.org/wiki/Byte))

하나의 비트는 0과 1, 이진수만을 표현할 수 있다.
계산기처럼 이진수로 숫자계산만을 할거라면 바이트라는 개념은 필요하지 않다.

그러나 우리는 컴퓨터를 사용하면서 인간이 사용하는 표현체계로 소통하기를 원한다. 그래서 여러개의 이진수를 묶은 단위로 2개(0과 1) 이상의 변수를 우리가 사용하는 '문자(character)' 로 'encoding' 시켜 인간 수준에서 추상화 된 의미있는 논리체계를 컴퓨터에서 사용할 수 있게 된다.

> If computers worked entirely in binary, and did nothing but calculcations with binary numbers, there would be no bytes. But to use and manipulate character information we must have encodings for those symbols. And much of this was already known from punch card days. ([Why is a byte 8bits? or is it? - web.archive.org](https://web.archive.org/web/20170403130829/http://www.bobbemer.com/BYTE.HTM))

단순한 수의 계산 이상으로 컴퓨터를 활용하기 위해 '문자' 라는 표현체계를 사용하기 위해서는 각각의 문자를 숫자에 대응시킬 수 있는 수단 -인코딩-이 필요하고, 이것은 펀치카드에서 이미 이뤄져왔던 일이라고 한다.

'펀치카드?'

## Punch card?

<iframe width="560" height="315" src="https://www.youtube.com/embed/KG2M4ttzBnY?si=bNSZhcdtXuYUEy-0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

펀치카드는 12행, 80열로 구성되어 있는 매트릭스에 구멍을 뚫어 원하는 정보를 담는 카드이다. 하나의 열에 2개 이하의 구멍을 뚫을 수 있고, 하나의 열은 하나의 character를 나타낸다.

그렇다면 펀치카드는 어떻게 알파벳을 encoding 하는가? 한 열의 12행 중 10, 11, 12는 Zone 이라고 불리는 영역이고, 나머지 0~9는 Number이다. Zone에서 1가지를 선택하고 Number에서 또 하나를 선택한 것을 하나의 문자의 표현으로 정하면 3*9 = 27가지의 경우를 표현할 수 있으며, 26개의 알파벳을 표현하기에 충분한 것을 알 수 있다.

아래는 당시 펀칭머신 컴퓨터로 널리 사용되었던 IBM 029를 교육하기 위한 자료라고 한다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kaQmAybWn-w?si=MBP2E4i3bHLjlu4k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

프로세싱으로 펀칭머신을 시각화 한 프로젝트도 있었는데 좋은 아이디어라는 생각이 든다. 실제로 있었던, 지금은 모종의 이유로 물리적으로 구현되고 있지 않은 장비나 공간들을 시각적으로 구현해 내는 것. 새로운 작품을 만들 때 좋은 작법이 될 것 같다.

IBM029의 늠름한 자태로 마무리..

<img src="https://twobithistory.org/images/ibm029_front.jpg" />

---

### References

- [자바스크립트 Buffer, ArrayBuffer, TypedArray 파헤치기 - 카레유 블로그](https://curryyou.tistory.com/441)
- [The IBM 029 Card Punch - twobithistory](https://twobithistory.org/2018/06/23/ibm-029-card-punch.html)
- [What did code on punch cards do with the other six bits per column? - Stack Exchange](https://retrocomputing.stackexchange.com/questions/16112/what-did-code-on-punch-cards-do-with-the-other-six-bits-per-column)