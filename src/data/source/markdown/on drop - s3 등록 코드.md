---
title: on drop - s3 등록 코드
category: tech
---


# on drop - s3 등록 코드

### Frontend

```tsx
<textarea
  onDrop={() => {
    const file = e.dataTransfer.files[0];
    const filename = encodeURI(file.name); // utf-8로 인코딩
    
    const newFile = new File([file], filename);
    const formData = new FormData();
    formData.append("image", newFile);
  }}
/>
```

### Backend

```ts
async function handler () {
  const  = req.files[0].originalname // multer를 사용했을 때 이렇게 가져올 수 있다
  
  await s3client.send(
    new PutObjectCommand({
      Bucket: "<bucket-name>",
      Key: filename,
      Body: req.files[0].buffer
    });
  );
}
```