# useIntersectionObserver

## Descripción
useIntersectionObserver es un hook personalizado de React que te permite detectar si un elemento está en el área visible del usuario. Utiliza el [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) para determinar si el elemento es visible o no.

## Parámetros
ref: Una referencia a un elemento del DOM que se desea observar. Debe ser una instancia de RefObject<HTMLElement>.
options (opcional): Un objeto que contiene opciones para configurar el observador de intersecciones.

Este objeto tiene tres propiedades opcionales:

### root (opcional): 
El elemento en el que se desea observar las intersecciones. Debe ser una instancia de HTMLElement o null. Si no se especifica, se utiliza el viewport.

### rootMargin (opcional):
Una cadena que representa el margen delimitador del elemento raíz. Debe ser una cadena que contenga una lista de cuatro valores de longitud separados por espacios. El primer valor representa el margen superior, el segundo valor representa el margen derecho, el tercer valor representa el margen inferior y el cuarto valor representa el margen izquierdo. Si no se especifica, se utiliza el valor por defecto "0px 0px 0px 0px".

### threshold (opcional):
Un valor o una matriz de valores que representan la fracción del elemento que debe estar visible para que se considere una intersección. Debe ser un valor entre 0 y 1. Si se proporciona una matriz, cada valor debe estar entre 0 y 1. Si no se especifica, se utiliza el valor por defecto de 0.

## Valor de retorno
El hook devuelve un valor booleano que indica si el elemento es visible o no.

## Ejemplo:

```

import { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

function MyComponent() {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref);

  return (
    <div>
      <div ref={ref}>Observar este elemento</div>
      {isIntersecting ? 'Visible' : 'No visible'}
    </div>
  );
}

```