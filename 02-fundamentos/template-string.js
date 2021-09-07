const nombre = 'Deadpool';
const real = 'Wade Winston';

const normal = nombre + ' '+ real;
const template = `${nombre} ${real}`; // dentro de $ se puede ejecutar sumas lo que sea de javascript

console.log(normal);
console.log(template);

console.log(normal === template);