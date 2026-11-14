self.addEventListener('message', (e) => {
    const size = e.data;
    console.log("Массив размерностью: ", size);

    const t0 = performance.now();
    
    const x = new Array(size);
    let c = 0;

    for (let i = 0; i < size; i++){
        x[i] = (Math.random() * 100 | 0) + 1;
        c += x[i];
    }
    c = c / size;
    const ms = (performance.now() - t0).toFixed(0);
    console.log(c);

    self.postMessage({ c, ms });
})