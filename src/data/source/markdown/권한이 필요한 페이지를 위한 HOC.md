---
title: 권한이 필요한 페이지를 위한 HOC
category: tech
---


# 권한이 필요한 페이지를 위한 HOC

사용하기 편리한 패턴을 만들어냈다고 생각이 들어서 공유/기록해보려 한다. 블로그를 개발하며 글을 에디팅 할 수 있는 페이지들을 만들다보니 관리자 권한을 확인해야하는 페이지들이 생겨났다. 이들 페이지에서 토큰을 이용해 사용자권한을 간편하게 확인할 수 있도록 만들어주는 고차 컴포넌트를 작성한 내용을 공유한다!

사용법은 아주 간단하다. 인증이 필요한 컨텐츠를 감싸주기만 하면 된다. 

```tsx
import Authorizer from "@components/Authorizer";
import React from "react";

const PostListPage = () => {
  return (
    <Authorizer>
      This contents have to be shown only for authorized users 🔐
    </Authorizer>
  );
};

export default PostListPage;

```

`Authorizer`는 고차 컴포넌트 (Higher Order Component, HOC)로, 원하는 컨텐츠를 `children`속성을 통해 주입시킬 수 있으며 해당 컨텐츠를 확인하기 위해 요구되는 권한이 존재하지 않는 경우 로그인 페이지로 리다이렉션 시킨다.

```tsx
import React, { useEffect } from "react";
import useAuth from "@src/hooks/useAuth";
import { useLocation } from "@reach/router";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

const Authorizer = ({ children, disabled }: Props) => {
  const { isAuthorized } = useAuth();
  const params = useLocation();

  useEffect(() => {
    if (isAuthorized === false) {
      location.href =
        "/login" + `?redirectTo=${params.href}`;
    }
  }, [isAuthorized]);

  if (isAuthorized === null && !disabled)
    return <div>토큰 유효성 판독중..</div>;

  return <div>{children}</div>;
};

export default Authorizer;
```

아래는 서버에 요청을 보내 사용자의 권한이 충분한지 확인하는 custom hook `useAuth`의 구현이다. 로컬 스토리지에 저장된 토큰이 유효한지 판별한 내용을 상태값 `isAuthorized`를 통해 전달한다.

```ts
import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const token = localStorage.getItem("token-key");

    if (!token) {
      setIsAuthorized(false);

      return;
    }

    (async () => {
      try {
        await axios.post(
          `<server-uri>/token/decrypt`,
          {
            token,
          }
        );

        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);

        console.log(error);
      }
    })();
  }, []);

  return { isAuthorized };
};

export default useAuth;
```

아주 기분좋게 쓸 수 있는 패턴이다. 더 이상 매번 토큰을 확인하고 리다이렉션 시키는 로직을 페이지별로 일일히 작성하지 않아도 된다.