console.log('Inicio del programa'); // 1

setTimeout(()=>{
    console.log('Primer Timeout');  // 5
},3000);

setTimeout(()=>{
    console.log('Segundo Timeout'); // 2 :: 3
},0);

setTimeout(()=>{
    console.log('Tercer Timeout'); // 3 :: 4
},0);

console.log('Fin del programa');  // 4 :: 2