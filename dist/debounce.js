// function debounce<T>(func: (...args: T extends any[]) => void, wait = 1000, immediate = false) {
function debounce(func, wait = 1000, immediate = false) {
    let timer;
    const debounced = (...args) => {
        return new Promise((resolve, reject) => {
            if (immediate) {
                resolve(func(...args));
            }
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(() => resolve(func(...args)), wait);
        });
    };
    const cancel = () => {
        clearTimeout(timer);
        console.log('timer cancel!!!');
    };
    return { debounced, cancel };
}
function debounce2(func, wait = 1000, immediate = false) {
    let timer;
    const debounced = (...args) => new Promise((resolve, reject) => {
        if (immediate) {
            resolve(func(...args));
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => resolve(func(...args)), wait);
    });
    const cancel = () => {
        clearTimeout(timer);
        console.log('timer cancel!!!');
    };
    return { debounced, cancel };
}
// 기본 debounce
const x = debounce2((a) => a + 1, 1000, true);
console.log(x.debounced(10));
