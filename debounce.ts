function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait = 1000,
  immediate = false
) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: T) =>
    new Promise((resolve, reject) => {
      if (immediate) {
        resolve(func(...args));
      }

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => resolve(func(...args)), wait);
    });

  const cancel = () => {
    clearTimeout(timer);
    console.log('timer cancel!!!');
  };

  return { debounced, cancel };
}
