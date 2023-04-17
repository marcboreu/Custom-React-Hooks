# useOutsideClick

## Descripción
El hook useOutsideClick es una utilidad personalizada que se utiliza en aplicaciones de React para detectar clics fuera de un elemento específico, como un modal, y ejecutar una función de retorno de llamada cuando se produce este evento. También puede detectar la presión de la tecla Escape para cerrar el elemento observado. Es útil para implementar funcionalidades como cerrar un modal cuando se hace clic fuera de él o al presionar la tecla Escape.

## Parámetros
ref: Una referencia mutable (MutableRefObject) al elemento que se quiere observar para los clics fuera de él y la presión de la tecla Escape.
callback: Una función de retorno de llamada que se ejecutará cuando se detecte un clic fuera del elemento o se presione la tecla Escape.

## Valor de retorno
El hook useOutsideClick retorna la referencia mutable (MutableRefObject) pasada como argumento. Esta referencia mutable se puede adjuntar a un elemento del DOM que se quiere observar para los clics fuera de él y la presión de la tecla Escape. La referencia mutable se puede utilizar para realizar acciones específicas, como cerrar el elemento observado o realizar otras operaciones, en la función de retorno de llamada que se pasa como segundo argumento al hook. Es importante tener en cuenta que la referencia mutable se actualiza automáticamente cuando el componente se vuelve a renderizar, lo que garantiza que siempre esté sincronizada con el último estado del componente.

## Ejemplo:

```

import { useRef } from 'react';
import { useOutsideClick } from './useOutsideClick';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    // Lógica para cerrar el modal
    onClose();
  };

  // Usar el hook useOutsideClick
  useOutsideClick(modalRef, handleCloseModal);

  return (
    <div ref={modalRef}>
      {/* Contenido del modal */}
    </div>
  );
};

export default Modal;

```