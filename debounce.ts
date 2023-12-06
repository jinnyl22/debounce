type debounce = {
  func: (...args: unknown[]) => void;
  wait: number;
  immediate: boolean;
};

// function debounce<T>(func: (...args: T extends any[]) => void, wait = 1000, immediate = false) {
function debounce(
  func: (...args: unknown[]) => void,
  wait = 1000,
  immediate = false
) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: unknown[]) => {
    return new Promise((resolve, reject) => {
      if (immediate) {
        resolve(func(...args));
      }

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => resolve(func(...args)), wait);
    });
  };

  const cancel = () => {
    clearTimeout(timer);
    console.log('timer cancel!!!');
  };

  return { debounced, cancel };
}

function debounce2<T extends unknown[]>(
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

// 기본 debounce
const x = debounce2((a: number) => a + 1, 1000, true);
console.log(x.debounced(10));
