# 📌 테스트 사용 예제

debounce를 사용해보는 예제로
버튼을 여러번 클릭해도 마지막 호출에서 wait만큼 시간이 지나야 카운트가 올라가도록 했습니다.
cancel 버튼을 누르면 타이머가 취소 되고 카운트가 올라가지 않습니다.
옵셔널로 immediate가 주어지면 wait되는 시간 없이 카운트가 올라가도록 했습니다.

**assert**를 위해 아래의 두가지 버튼을 만들었습니다.
debounce를 테스트 하기위한 debounceBtn,
debounce를 취소 하기위한 debounceCancel.

카운트를 올리기위해 debounceCnt을 0으로 만들고 textContent로 텍스트 노드를 가져와 카운트로 사용해주었습니다.

```
가장 최신 버전의 문법 사용과<br>
컴파일된 js파일의 경로를 dist 폴더로 지정해주기 위해
compilerOptions의 target과 outDir만 설정해주었습니다.
html에는 컴파일된 js파일의 경로를 script로 넣어놓았습니다.

과제를 받고 하나씩 주어진 요구사항에 맞게 발전시켜나갔습니다.
처음에는 아래와 같이 debounce 기법만 구현을 해보고
```

```javascript
const debounced = (...args) => {
  if (immediate) {
    func(...args);
  } else {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, wait, ...args);
  }
};
```

프로미스를 반환하도록 해준 후

```typescript
const debounced = (...args) => {
  if (immediate) {
    func(...args);
    return Promise.resolve('func done now!');
  } else {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, wait, ...args);
    return Promise.resolve('func done!');
  }
};
```

마지막으로 원래 함수의 실행이 완료될 때 프로미스가 해결되도록 해주었습니다.

```javascript
const debounced = (...args) => {
  return new Promise((resolve, reject) => {
    if (immediate) {
      resolve(func(...args));
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => resolve(func(...args)), wait);
  });
};
```
