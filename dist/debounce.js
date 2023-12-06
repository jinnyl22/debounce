function debounce(func, wait = 1000, immediate = false) {
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
