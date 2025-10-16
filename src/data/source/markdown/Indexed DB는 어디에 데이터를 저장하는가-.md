---
title: Indexed DB는 어디에 데이터를 저장하는가?
category: tech
---


# Indexed DB는 어디에 데이터를 저장하는가?

이 질문에 답하기 위해 자료를 찾아보았다.  
간단히 대답하자면, 어디에/얼마나 저장하는지는 브라우저마다 다르다.

MDN의 [이 문서](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria), 'Storage quotas and eviction criteria' 를 확인하면 이 외의 많은 정보를 얻을 수 있다.

해당 문서에서는 먼저 웹 브라우저가 데이터들을 저장하기 위해 사용하는 여러가지 기술들이 무엇인지 나열해준다.

- 쿠키: 브라우저(클라이언트)와 서버가 주고받으며 정보를 교환하는 매개체.
- 웹 스토리지 (로컬, 세션 스토리지): 간단한 구조와 작은 용량의 string only key/value pair를 저장할 수 있는 용도로 사용된다.
- Indexed DB: 비교적 크고 복잡한 데이터를 저장할 수 있다.
- Cache API: 웹페이지 로드를 빠르게 하기 위해, Request/Response 페어를 저장하는 시스템.
- OPFS (Origin Private File System): 브라우저에서 파일시스템에 접근하도록 돕는다.

내가 알고싶은건 indexed DB니까 해당 내용을 찾아보았다.

> The data that's stored by using other(쿠키와 웹스토리지 외의) web technologies, such as IndexedDB, Cache API, or File System API (which defines the Origin Private File System), is managed by a storage management system that's specific to each browser.

그렇다. 브라우저에 따라 다르다고 말해준다.
그래서 사파리 항목을 찾아보았다.

> Starting with macOS 14 and iOS 17, Safari allots up to around 20% of the total disk space for each origin. If the user has saved it as a web app on the Home Screen or the Dock, this limit is increased to up to 60% of the disk size. For privacy reasons, cross-origin frames have a separate quota, amounting to roughly 1/10 of their parents.

> Additionally, Safari also enforces an overall quota that stored data across all origins cannot grow beyond: 80% of disk size for each browser and web app, and 15% of disk size for each non-browser app that displays web content.

기본적으로 디스크 공간의 20% 까지 각 origin에 할당해주고, 홈스크린이나 독에 웹앱으로 저장되었을 때는 60% 까지도 제공해준다고, 그러나 모든 origin에 할당되어 사용되는 총 공간은 80% 이하로 제한된다고 한다.

> In earlier versions of Safari, an origin is given an initial 1 GiB quota. Once the origin reaches this limit, Safari asks the user for permission to let the origin store more data. This happens whether the origin stores data in best-effort mode or persistent mode.

이전 버전의 사파리들에서는 1기가가 기본이라고 한다. 나는 그리 많지 않은 이미지들을 저장할 요량이기에 이 정도로도 사실 충분하다.

더 확실한 정보를 원하면 [Webkit 문서](https://www.webkit.org/blog/14403/updates-to-storage-policy/) 를 읽으라 권한다. 

또한 `navigator.storages.estimate()`를 사용하면 아래처럼 남은 용량도 알려준다.

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/2023_12_03_12_56_04_3f9ea8a2d3.png">

그러나 '어디에 저장하는가' 는 아직까지 확실치 않다. 얼마나 저장할 수 있는지에 대해서만 이야기해준다. 더 구글링을 하던 중 Arron Powell 이라는 마이크로소프트의 개발자 블로그에서 [해당 내용](https://www.aaron-powell.com/posts/2012-10-05-indexeddb-storage/)을 발견할 수 있었다.

이 개발자는 아무래도 C++로 구현된 웹킷의 소스코드를 들여다 본 모양이다. 글에서도 [웹킷 소스코드 링크](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/indexeddb)를 제시해준다.

크롬은

> %AppData%\Local\Google\Chrome\User Data\Default

에 IndexedDB 데이터를 저장한다고 한다. 맥에는 AppData가 없어 검색해보니 /Library/Application Support 가 해당 폴더와 같은 역할을 한다고. 그런데 못찾겠다. 어쨌든 IndexedDB를 이용해 저장한 데이터들은 브라우저 메모리 등이 아닌 파일시스템에 저장된다는 것을 알 수 있다.