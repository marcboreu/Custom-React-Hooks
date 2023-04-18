# usePortal

## Descripción
El hook usePortal crea un portal para renderizar un componente en un elemento HTML específico. Devuelve una función de componente y una referencia al elemento contenedor del portal.

## Valor de retorno
El hook devuelve una tupla que incluye lo siguiente:

Portal: una función de componente que se utiliza para envolver el contenido que se va a renderizar en el portal.

portalContainer: una referencia al elemento HTML que se utiliza como contenedor para el portal. Este valor es null hasta que el portal se ha creado.

removePortal: una función que elimina el portal de la página.

## Ejemplo:

```

import { FC, ReactNode } from 'react';
import usePortal from './usePortal';

type PortalProps = {
  children: ReactNode;
  container?: HTMLDivElement;
};

const App = () => {
  const [Portal, portalContainer, removePortal] = usePortal();

  return (
    <div>
      <button onClick={removePortal}>Remover Portal</button>
      <Portal>
        <h1>Este es un portal</h1>
      </Portal>
    </div>
  );
};

```