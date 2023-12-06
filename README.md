# 📌 테스트 방법

> debounce 사용 예제로 버튼을 여러번 클릭해도 마지막 호출에서 wait만큼 시간이 지나야 카운트가 올라가도록 했습니다.  
cancel 버튼을 누르면 타이머가 취소 되고 카운트가 올라가지 않습니다.  
옵셔널로 immediate가 주어지면 wait되는 시간 없이 카운트가 올라가도록 했습니다.
>

<br>

✅ **테스트 링크 : https://jinnyl22.github.io/debounce/**

1. 테스트를 위해 위의 링크에 들어갑니다.
2. click 버튼을 누르면 기본 debounce가 실행되면서 2초 후 카운트 2가 증가합니다.
3. immediate click 버튼을 누르면 immediate가 true로 주어진 debounce가 실행되면서 wait 시간과 관계없이 즉시 카운트가 2 증가합니다.
4. click 버튼을 누른 후 2초가 지나기전에 cancel 버튼을 누르면 카운트가 올라가지 않습니다.

<br>

# 🔎 테스트 코드 상세

### ✔️ **assert**를 위해 아래의 세가지 버튼과 카운트를 만들었습니다.

- debounce를 테스트 하기위한 **debounceBtn**,
- immediate 옵션이 주어진 즉시 실행을 테스트 하기 위한 **debounceImmeBtn,**
- debounce를 취소 하기위한 **debounceCancel**.
- 카운트를 올리기위해 **debounceCnt**을 0으로 만들고 textContent로 텍스트 노드를 가져와 카운트로 사용해주었습니다.

<br>

### ✔️ tsconfig.json의 compilerOptions

- **target** → 가장 최신 버전의 문법 사용을 위해 설정
- **outDir** → 컴파일된 js파일의 경로를 dist 폴더로 지정해주기 위해 설정

html에는 컴파일된 js파일의 경로를 script로 넣어놓았습니다.

<br>

# ▶️ 코드 설명

과제를 받고 하나씩 주어진 요구사항에 맞게 발전시켜나갔습니다.

처음에는 자바스크립트로 아래와 같이 debounce 기법만 구현을 해보고

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

```javascript
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

원래 함수의 실행이 완료될 때 프로미스가 해결되도록 해주었습니다.

```javascript
const debounced = (...args) => {
  return new Promise((resolve, reject) => {
    if (immediate) {
      resolve(func(...args));
      return;
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => resolve(func(...args)), wait);
  });
};

```

마지막으로 try, catch문을 사용하여 reject 되었을 경우도 처리해주었습니다.

```javascript
const debounced = (...args) => new Promise((resolve, reject) => {
        if (immediate) {
            resolve(func(...args));
            return;
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                const result = func(...args);
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        }, wait);
    });
```

<br>

### ✔️ 타입스크립트로 구현한 완성 코드

- rest 파라미터로 여러 타입이 들어올 수 있기 때문에 unknown[] 타입을 extends 해주었습니다.
- setTimeout은 timerId를 반환해주는데 브라우저에서는 숫자를 반환해주지만 node.js에서는 객체를 반환해주기 때문에 어떤 것을 반환하든 setTimeout의 return 타입으로 받기위해 유틸리티 타입인 `ReturnType<typeof setTimeout>` 을 사용하여 timer의 타입을 지정해주었습니다.

```typescript
function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait = 1000,
  immediate = false
) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: T) =>
    new Promise((resolve, reject) => {
      // immediate가 true로 주어졌을 경우
      if (immediate) {
        resolve(func(...args));
        return;
      }
			
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const result = func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, wait);
    });

  const cancel = () => {
    // 호출 스케줄링 취소
    clearTimeout(timer);
    console.log('timer cancel!!!');
  };

  return { debounced, cancel };
}
```
