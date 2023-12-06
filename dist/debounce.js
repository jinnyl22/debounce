function debounce(func, wait = 1000, immediate = false) {
    let timer;
    const debounced = (...args) => new Promise((resolve, reject) => {
        if (immediate) {
            resolve(func(...args));
            return;
        }
        if (timer)
            clearTimeout(timer);
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
    const cancel = () => {
        clearTimeout(timer);
        console.log('timer cancel!!!');
    };
    return { debounced, cancel };
}
