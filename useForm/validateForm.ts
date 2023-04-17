type RegistrationFormValues = {
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  terms?: boolean;
};

interface ValidationResult {
  errors: { [key: string]: string };
  success: boolean;
  message: { [key: string]: string };
}

const validateEmail = (email: string): ValidationResult => {
  const errors: { [key: string]: string } = {};
  const successMessages: { [key: string]: string } = {};

  if (!email) {
    errors.required = "El campo de correo electrónico es obligatorio";
  } else if (
    !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,7}$/.test(
      email
    )
  ) {
    errors.invalid = "El correo electrónico ingresado no es válido";
  } else {
    successMessages.valid = "El correo electrónico ingresado es válido";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
      success: false,
      message: {},
    };
  } else {
    return {
      errors: {},
      success: true,
      message: successMessages,
    };
  }
};

const validateName = (name: string): ValidationResult => {
  const result: ValidationResult = {
    errors: {},
    success: true,
    message: {},
  };

  if (!name) {
    result.errors.required = "El campo de nombre es obligatorio";
    result.success = false;
  } else {
    name = name.trim();
    if (name.length < 2) {
      result.errors.minLength = "El nombre debe tener al menos 2 caracteres";
      result.success = false;
    } else if (name.length > 25) {
      result.errors.maxLength = "El nombre no debe tener más de 25 caracteres";
      result.success = false;
    } else if (!/^[A-Za-z]+$/.test(name)) {
      result.errors.onlyLetters = "El nombre solo puede contener letras";
      result.success = false;
    }
  }

  return result;
};

const validatePhoneSpanish = (phone: string): ValidationResult => {
  const validationResult: ValidationResult = {
    errors: {},
    success: false,
    message: {},
  };

  if (!phone) {
    validationResult.errors.required = "El campo de teléfono es obligatorio";
  } else {
    phone = phone.replace(/[-\s]/g, "");
    if (!/^\d+$/.test(phone)) {
      validationResult.errors.invalidFormat =
        "El número de teléfono ingresado no es válido";
    } else if (!/^(\+|00)?34?\d{9}$/.test(phone)) {
      validationResult.errors.invalidNumber =
        "El número de teléfono ingresado no es válido";
    } else {
      validationResult.success = true;
      validationResult.message.success =
        "El número de teléfono ingresado es válido";
    }
  }

  return validationResult;
};

const validatePassword = (password: string) => {
  if (!password) {
    return {
      errors: {
        required: "El campo de contraseña es obligatorio",
      },
      success: false,
      message: "",
    };
  }

  const errors: { [key: string]: string } = {};
  const successMessages: { [key: string]: string } = {};

  // Verificar la longitud mínima de la contraseña
  if (password.length < 6) {
    errors.minLength = "La contraseña debe tener al menos 6 caracteres";
  } else {
    successMessages.minLength = "Cumple con la longitud mínima de caracteres";
  }

  // Verificar si la contraseña contiene al menos una letra minúscula
  if (!/[a-z]/.test(password)) {
    errors.lowercase =
      "La contraseña debe contener al menos una letra minúscula";
  } else {
    successMessages.lowercase = "Contiene al menos una letra minúscula";
  }

  // Verificar si la contraseña contiene al menos una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    errors.uppercase =
      "La contraseña debe contener al menos una letra mayúscula";
  } else {
    successMessages.uppercase = "Contiene al menos una letra mayúscula";
  }

  // Verificar si la contraseña contiene al menos un número
  if (!/\d/.test(password)) {
    errors.number = "La contraseña debe contener al menos un número";
  } else {
    successMessages.number = "Contiene al menos un número";
  }

  // Verificar si la contraseña contiene al menos un carácter alfanumérico
  if (!/\w/.test(password)) {
    errors.alphanumeric =
      "La contraseña debe contener al menos un carácter alfanumérico";
  } else {
    successMessages.alphanumeric = "Contiene al menos un carácter alfanumérico";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
      success: false,
      message: "",
    };
  } else if (
    password.length >= 6 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /\w/.test(password)
  ) {
    return {
      errors: {},
      success: true,
      message: successMessages,
    };
  } else {
    return {
      errors: {},
      success: false,
      message: "",
    };
  }
};

const validateConfirmPassword = (
  confirmPassword: string,
  password: string
): ValidationResult => {
  const validationResult: ValidationResult = {
    errors: {},
    success: false,
    message: {},
  };

  if (!confirmPassword) {
    validationResult.errors.required =
      "El campo de confirmación de contraseña es obligatorio";
  } else if (password !== confirmPassword) {
    validationResult.errors.match = "Las contraseñas no coinciden";
  } else {
    validationResult.success = true;
    validationResult.message.success = "Las contraseñas coinciden";
  }

  return validationResult;
};

const validateAge = (
  birthDate: Date,
  ageThreshold: number = 18
): ValidationResult => {
  const validationResult: ValidationResult = {
    errors: {},
    success: false,
    message: {},
  };
  const today = new Date();
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
      ? 1
      : 0);

  if (age >= ageThreshold) {
    validationResult.success = true;
    validationResult.message.success = "El usuario es mayor de edad.";
  } else {
    validationResult.errors.error = `El usuario debe tener al menos ${ageThreshold} años.`;
    validationResult.success = false;
  }

  return validationResult;
};

const validateTerms = (value: boolean) => {
  const validationResult: ValidationResult = {
    errors: {},
    success: false,
    message: {},
  };

  if (!value) {
    validationResult.success = false;
    validationResult.errors.error = "Debes aceptar los términos y condiciones";
  } else {
    validationResult.success = true;
    validationResult.message.success =
      "Has aceptado los términos y condiciones";
  }

  return validationResult;
};

export const validateForm = (values: RegistrationFormValues) => {
  const errors: Partial<RegistrationFormValues> = {};

  const fieldsToValidate = {
    email: validateEmail,
    name: validateName,
    surname: validateName,
    phone: validatePhoneSpanish,
    password: validatePassword,
    confirmPassword: (value: string) =>
      validateConfirmPassword(value, values.password || ""),
    birthDate: validateAge,
    // terms: validateTerms,
  };

  const messages: { [key: string]: string } = {};

  Object.entries(fieldsToValidate).forEach(([field, validateFunc]) => {
    if (values[field]) {
      const validationResult = validateFunc(values[field]);
      if (!validationResult.success) {
        errors[field] = validationResult.errors[field];
        messages[field] = validationResult.message[field];
      } else {
        messages[field] = validationResult.message[field];
      }
    }
  });

  return {
    errors: errors,
    success: Object.keys(errors).length === 0,
    message: messages,
  };
};
