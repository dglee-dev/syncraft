---
title: AWS SDK로 S3에 이미지 업로드하기
category: tech
---


# AWS SDK로 S3에 이미지 업로드하기


이제 문서의 내용으로 돌아와서, 원하는 목적을 이루기 위해 한 걸음씩 나아가보자.

사진을 첨부한 화면에서 4개의 그리드 중 왼쪽 위에 가장 중요한 내용이 있을것으로 짐작할 수 있다. 인간은 왼쪽 위에서 오른쪽 아래로 문서를 읽어나가기 때문에 당연히 그렇게 배치했어야 좋은 문서이다.

> 'Developer Guide' - Introduces you to JavaScript with AWS services and resources, both in browser scripts and in Node.js applications. Describe how to set up the SDK, ..

역시나 뉴비인 우리가 가야할 곳은 여기라는 것을 한눈에 알 수 있다.



---

구글링을 해보면 [AWS에서 제공해주는 예제코드](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html)는 다음과 같은데,

```js
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const main = async () => {
  const command = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
```

이대로 복사 밑 붙여넣기를 해서는 작동이 되지 않는다. 이유는 여기에 빠져있는 정보들이 있는데

- 누가 가지고 있는
- 어떤 리전에 위치한
- 그리고 지금 하려는 Command를 실행할 수 있는 권한을 가지고 있는

에 대한 것들이다. 이 세가지 정보를 새로운 S3Client를 생성하는 시점에서 넘겨지는 비어있는 객체에 전달해야 한다.

자, 우리는 S3를 만들어 낸 사람이 아니기 때문에 어떻게 이러한 정보를 세팅할 수 있는지에 대해 알아보기 위해 문서를 확인할 시간이다.

[AWS SDK for JavaScript > \
Developer Guid for SDK Version 3 > \
Configuring the SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/configuring-the-jssdk.html)

`S3Client` 인스턴스를 생성할 때 빈 객체로 작성된 부분에 추가적인 정보를 입력해야한다.

### Region 입력하기

버킷의 속성 탭에서 AWS 리전 부분을 참고하면 된다.

```
S3Client({
  region: "<여기에 입력>"
});
```

### Credentials 세팅

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/aws-security-certify.png" style="display: inline; margin: 0" />

'보안 자격 증명' 에서 액세스 키를 생성하고 두 개의 값을 얻을 수 있다.

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```
```
S3Client({
  ...,
  credentials: {
    accessKeyId: "<AWS_ACCESS_KEY_ID>",
    secretAccessKey: "<AWS_SECRET_ACCESS_KEY>",
  }
});
```
이외에 `sessionToken` 이라는 것도 탑재할 수 있는데, 이것의 정체는 일정 기간 동안만 사용될 수 있는 temporary credential을 의미한다.

 [여기](https://docs.aws.amazon.com/AmazonS3/latest/userguide/MakingRequests.html)의 Temporary security credentials 파트를 읽어보면 알 수 있는데,

> IAM provides the AWS Security Token Service API for you to request temporary security credentials.\
...\
The API returns temporary security credentials (`access key ID` and `secret access key`), and a `security token`.

마지막에 언급된 `security token` 이 바로 sessionToken이다. 