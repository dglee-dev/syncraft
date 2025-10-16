---
title: AWS Secrets Manager
category: tech
---


# AWS Secrets Manager

### Overview of managing master use passwords with AWS Secrets Manager

With AWS Secret Manager, you can replace hard-coded credentials in your code, including database passwords, with an API call to Secret Manager to retrieve the secret programatically.

아하, 그동안 매번 `.env` 등의 파일에서 힘들게(?) 관리되던 DB 비밀번호 등을 API 콜로 받아올 수 있도록 만들어주는 비밀번호 저장소, 비밀번호 관리자 서비스구나.

### [AWS Secrets Manager User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)

AWS Secrets Manager helps you manage, retrieve, and rotate database credentials, application credentials, OAuth tokens, API keys, and other secrets throughout their lifecycles.

Many AWS services store and use secrets in Secrets Manager.

Secrets Manager helps you improve your `security posture`, because you no longer need hard-coded credentials in application source code.

Storing the credentials in Secrets Manager helps avoid possible compromise by anyone who can inspect your application or the components. You replace hard-coded credentials with a runtime call to the Secrets Manager service to retrieve credentials dynamically when you need them.

With Secrets Manager, you can configure an `automatic rotation schedule` for your secrets. This enables you to replace long-term secrets with short-term ones, significantly reducing the risk of compromise.

Since the credentials are no longer stored with the application, rotating credentials no longer requires updating your applications and deploying changes to application clients.

어플리케이션 코드에 저장해두었던 API Key, 데이터베이스 암호 등을 런타임의 API 콜로 대체할 수 있기 때문에 이를 관리하는 위험과 불편함에서 벗어날 수 있고, 주기를 설정해 해당 비밀키들의 유효성을 재설정 할 수 있기 때문에 더 안전하기까지 하다는 이야기이다.

또 다른 organization secret을 저장할 수 있는 방법들은..

<img src="https://justin-cms-images.s3.ap-northeast-2.amazonaws.com/2024_02_27_11_26_32_0c527913ff.png">

### How Secret Managers Works - [AWS Secret Manager Concepts](https://docs.aws.amazon.com/secretsmanager/latest/userguide/getting-started.html)

1. Secret

In Secret Manager, 
