# useForm

Ejemplo:

```

const initialPassword = {
    firstPassword: '',
    secondPassword: '',
    requiredLength: 8,
}

const [ validLength, hasNumber, upperCase, lowerCase, match, specialChar ] = usePasswordValidator(initialPassword);

```

