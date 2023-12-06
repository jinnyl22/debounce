function debounce(func, wait = 1000, immediate = false) {
  let timer;

  const debounced = (...args) => {
    return new Promise((resolve, reject) => {
      if (immediate) {
        resolve(func(...args));
      }

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => resolve(func(...args)), wait);
      // 위의 코드가 큐에 어떻게 들어갈까?
      // setTimeout안에 있는게 태스크 큐에 들어가고
      // resolve가 마이크로 태스크 큐?..
    });
  };

  const cancel = () => {
    clearTimeout(timer);
    console.log('timer cancel!!!');
  };

  return { debounced, cancel };
}
