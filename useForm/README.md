# useForm

## Descripción
El hook useForm toma dos parámetros: initialValues y validationFunc. initialValues es un objeto que representa los valores iniciales de los campos del formulario, y validationFunc es una función de validación personalizada que toma los valores del formulario como entrada y devuelve un objeto con errores si existen.

## Parámetros
initialValues: Un objeto que representa los valores iniciales de los campos del formulario.
validationFunc: Una función de validación personalizada que toma los valores del formulario como entrada y devuelve un objeto con errores si existen.

## Valor de retorno
El hook useForm devuelve un objeto con las siguientes propiedades y métodos:

formRef: una referencia mutable a la referencia del formulario HTML generado.
values: un objeto que contiene los valores actuales de los campos del formulario.
errors: un objeto que contiene los errores de validación generados por validationFunc.
isSubmitting: un booleano que indica si el formulario se está enviando o no.
handleChange: una función de cambio de campo que maneja los eventos de cambio de los campos del formulario y actualiza los valores en el estado.
handleSubmit: una función de envío del formulario que maneja el evento de envío del formulario, ejecuta validationFunc para validar los datos y establece el estado de isSubmitting en true.
handleReset: una función de reinicio del formulario que restablece los valores y errores del formulario a su estado inicial.
resetForm: una función que permite reiniciar el formulario utilizando la referencia del formulario.

## Ejemplo:

```

import useForm from "./useForm";

// Definir una función de validación personalizada
const validateForm = (values) => {
  let errors = {};

  // Validar los valores de los campos del formulario
  if (!values.name) {
    errors.name = "El nombre es requerido";
  }
  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  }
  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
};

const MyForm = () => {
  const {
    formRef,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    resetForm
  } = useForm(
    { name: "", email: "", password: "" },
    validateForm
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Nombre"
      />
      {errors.name && <span>{errors.name}</span>}

      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      {errors.password && <span>{errors.password}</span>}
        <button type="submit" disabled={isSubmitting}>
            Enviar
        </button>
        <button type="button" onClick={handleReset}>
            Reiniciar
        </button>
        <button type="button" onClick={resetForm}>
            Reiniciar usando ref
        </button>
        </form>
        );
};
export default MyForm;

```