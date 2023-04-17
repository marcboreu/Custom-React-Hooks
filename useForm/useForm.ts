import { useState, useCallback, useRef, FormEvent } from "react";

type ValidationFunction<T> = (values: T) => { [key in keyof T]?: string };

const useForm = <T extends {}>(
  initialValues: T,
  validationFunc: ValidationFunction<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    ({ target }: { target: { name: keyof T; value: any } }) => {
      const { name, value } = target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors(validationFunc(values));
      setIsSubmitting(true);
    },
    [validationFunc, values]
  );

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const formRef = useRef<HTMLFormElement>(null);
  const resetForm = () => formRef.current?.reset();

  return {
    formRef,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    resetForm
  };
};

export default useForm;
