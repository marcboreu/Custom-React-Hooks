# useWindowSize

## Descripción
El hook useWindowSize es una utilidad personalizada de React que permite detectar el tamaño actual de la ventana del navegador. Proporciona un objeto con las propiedades width y height que representan el ancho y alto de la ventana del navegador, respectivamente. Además, el hook también ofrece la capacidad de debouncing, lo que permite controlar la frecuencia de actualización de los valores de tamaño de ventana para mejorar el rendimiento.

## Parámetros
El hook useWindowSize acepta un parámetro opcional:

debounceDelay (opcional, por defecto: 100): Un valor numérico en milisegundos que determina el retardo para el debouncing de la actualización del tamaño de ventana. Es decir, el tiempo que debe pasar sin cambios en el tamaño de ventana antes de que se actualice el valor. Un valor más alto puede reducir la frecuencia de actualización, lo que puede ser útil para mejorar el rendimiento en casos de redimensionamiento de ventana frecuente.

## Valor de retorno
El hook useWindowSize retorna un objeto con las siguientes propiedades:

width: Un número que representa el ancho actual de la ventana del navegador en píxeles.
height: Un número que representa el alto actual de la ventana del navegador en píxeles.
Estas propiedades se actualizan automáticamente cada vez que el tamaño de la ventana del navegador cambia.

## Ejemplo:

```

import { useWindowSize } from "./useWindowSize";

const MyComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h1>Window Size</h1>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

export default MyComponent;

```