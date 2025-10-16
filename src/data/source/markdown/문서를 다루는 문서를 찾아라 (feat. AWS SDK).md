---
title: 문서를 다루는 문서를 찾아라 (feat. AWS SDK)
category: tech
---


# 문서를 다루는 문서를 찾아라 (feat. AWS SDK)

대부분의 블로그 서비스는 포스트를 작성할 때 드래그-드랍으로 이미지를 추가할 수 있도록 하는 기능을 지원한다. 포스트를 작성하며 이 기능이 없어 매번 S3에 직접 이미지를 업로드하고 URL을 가져와 이미지를 추가하는 것이 불편해서 구현하기로 결정했다.

당연하게도 이 기능을 위해서는 드래그-드랍된 이미지를 S3에 업로드 할 수 있도록 AWS에서 제공하는 API를 이용해 코드를 작성해야 할 것이다. 이리저리 헤맨 끝에 [아래의 문서](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)를 발견할 수 있었다.

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/aws-sdk-docs-main.png" style="width: 100%" />

잠시 읽어보자.

> The AWS SDK for JavaScript enables developers to build libraries and applications that use AWS services. You can use the JavaScript API in the browser and inside Node.js applications on the server.

라고 써있는 것으로 보아 자바스크립트 프로젝트에서 AWS 프로덕트에 요청과 응답을 주고받으려면 이 SDK를 사용하면 된다는 것을 알 수 있고, 브라우저와 서버(Node.js) 환경에서 모두 이 SDK를 사용할 수 있음을 알 수 있다.

그런데 잠깐, 여기에서 중요한 부분은 "이 문서를 어떻게 찾아내었는가?" 이다. 시간을 두고 이리저리 구글링을 하다보면 AWS SDK에는 v2와 v3가 존재함을 눈치챌 수 있다. v3의 JavaScript SDK 문서를 찾아 breadcrumbs를 타고 올라가다 보면 링크의 문서까지 도달할 수도 있다.

하지만 구글링으로 이 문서를 단번에 찾을 확률은 높지 않다는 것이 문제이다. 첫 검색결과를 통해 v2의 문서로 갈수도 있고, 그러면 최신버전인 v3를 사용할 수 있음에도 v2의 코드를 실험하게 되는 불상사가 생긴다. 만약 Node.js에서의 예제를 먼저 만나게 된다면 브라우저에서 해당 SDK를 사용할 수 있는지 없는지조차 알아내기가 힘들다. 위의 문서를 처음부터 만나게 된다면 두 가지 환경 모두에서 사용이 가능한 것을 파악하고 취사선택해 사용할 수 있다.

> 여기에서 얻을 수 있는 교훈은 '문서를 설명하는 문서' 를 가장 먼저 찾아야 한다는 것이다.

말하자면 내가 찾아낸 문서의 정체를 의심해보고 이를 설명해줄 수 있는 더 고수준의 문서를 찾아보는 것은 문서를 이해하고 더 전체적인 그림을 파악해 올바른 방법으로 남이 작성한 코드를 사용하도록 매우 큰 도움을 준다.

이를 위해 추천하는 방법은 구글링으로 시작해서 방법을 찾되, 원류가 되는 문서를 찾는 시간을 잠시 가지는 것이다. 지금과 같은 상황에서는 먼저 구글링을 통해 SDK라는 키워드를 잡아낸 후 aws documentation 등으로 AWS 문서에 접근해서 내부 검색 기능을 활용해 javascript sdk 등을 검색해볼 수 있겠다.

다음 글에서는 해당 문서를 읽어나가며 실제로 AWS SDK를 이용해 S3에 어떻게 이미지를 업로드 할 수 있는지 알아보려고 한다.