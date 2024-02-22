const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api');

// Ejemplo de uso

const ubicacionActual = path.resolve(__dirname);
function cargarPalabrasDesdeArchivo(nombreArchivo) {
  const contenido = fs.readFileSync(`${ubicacionActual}/${nombreArchivo}`, 'utf-8');
  const palabras = contenido.trim().split('\n');
  return palabras;
}

function seleccionarPalabraAleatoria(palabras) {
  const indiceAleatorio = Math.floor(Math.random() * palabras.length);
  return palabras[indiceAleatorio];
}

 function generarFraseAleatoria() {
  const sustantivos = cargarPalabrasDesdeArchivo('sustantivos.txt');
  const adjetivos = cargarPalabrasDesdeArchivo('adjetivos.txt');
  const verbos = cargarPalabrasDesdeArchivo('verbos.txt');
  const complementos = cargarPalabrasDesdeArchivo('complementos.txt');

  const sustantivoAleatorio = seleccionarPalabraAleatoria(sustantivos);
  const adjetivoAleatorio = seleccionarPalabraAleatoria(adjetivos);
  const verboAleatorio = seleccionarPalabraAleatoria(verbos);
  const complementoAleatorio = seleccionarPalabraAleatoria(complementos);

  const fraseAleatoria = `El ${sustantivoAleatorio} ${verboAleatorio} ${adjetivoAleatorio} ${complementoAleatorio}.`;
  let number = Math.floor(Math.random() * (4 - 1) + 1);
  return number+" "+fraseAleatoria ;
}

module.exports = {generarFraseAleatoria}