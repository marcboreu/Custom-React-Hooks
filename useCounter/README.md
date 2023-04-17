# useCounter

## Descripción
Hook personalizado para manejar un contador con funcionalidades de incremento, decremento y reinicio.

## Parámetros
El hook useCounter acepta un parámetro opcional:

initialState (opcional): Valor inicial del contador. Por defecto, es 10.

## Valor de retorno
El hook useCounter retorna un objeto con las siguientes propiedades y funciones:

counter: Valor actual del contador.
increment: Función para incrementar el valor del contador en 1.
decrement: Función para decrementar el valor del contador en 1.
reset: Función para reiniciar el valor del contador al valor inicial.

## Ejemplo:

```

import { useCounter } from "./useCounter";

const MyComponent = () => {
  const { counter, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h1>Contador: {counter}</h1>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={reset}>Reiniciar</button>
    </div>
  );
};

export default MyComponent;

```