const notWW = document.getElementById("notWW");
const withWW = document.getElementById("withWW");
const outrose = document.getElementById("outrose");
const outsky = document.getElementById("outsky");
let out_NotWW = document.createElement("pre");
let out_WithWW = document.createElement("pre");

const worker = new Worker('./worker.js');

let counter = 0;
setInterval(() => {
    document.getElementById('counter').textContent = ++counter;
}, 100);

const size = getRandomInt(50000000, 60000000);

notWW.addEventListener("click", () => {
    const t0 = performance.now();
    
    const x = new Array(size);
    let c = 0;
    console.log("Массив размерностью: ", size);

    for (let i = 0; i < size; i++){
        x[i] = (Math.random() * 100 | 0) + 1;
        c += x[i];
    }
    c = c / size;
    console.log(c);
    const ms = (performance.now() - t0).toFixed(0);

    out_NotWW.textContent = '';
    out_NotWW.textContent =
        `Размер массива: ${size.toLocaleString()}\nСреднее по массиву: ${c.toFixed(4)}\nВремя: ${ms} мс`;
    out_NotWW.setAttribute("class","p-4 border border-rose-800 inset-shadow-sm inset-shadow-rose-500/50 text-white font-semibold rounded-3xl");
    outrose.appendChild(out_NotWW);
    console.log('Готово за', ms, 'мс');
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

withWW.addEventListener("click", () => {
    console.log(size);
    worker.postMessage(size);
});

worker.addEventListener('message', (e) => {
    const { c, ms } = e.data;
    out_WithWW.textContent = '';
    out_WithWW.textContent =
        `Размер массива: ${size.toLocaleString()}\nСреднее по массиву: ${c.toFixed(4)}\nВремя: ${ms} мс`;
    out_WithWW.setAttribute("class","p-4 border border-sky-800 inset-shadow-sm inset-shadow-sky-500/50 text-white font-semibold rounded-3xl");
    outsky.appendChild(out_WithWW);
    console.log('Готово за', ms, 'мс');
})

worker.addEventListener('error', (err) => {
    console.error('Ошибка в воркере:', err);
})