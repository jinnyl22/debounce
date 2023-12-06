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
    clearTimeout(timer);
    console.log('timer cancel!!!');
  };

  return { debounced, cancel };
}
