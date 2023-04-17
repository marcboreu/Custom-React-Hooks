# useFetch

## Descripción
El hook useFetch es una forma conveniente de manejar solicitudes HTTP en React. Maneja automáticamente el estado de carga, los datos obtenidos y los errores de la solicitud.

## Parámetros
El hook useFetch toma un parámetro obligatorio:

url (string): La URL de la API a la que se va a hacer la solicitud.

## Valor de retorno
El hook useFetch devuelve un objeto con las siguientes propiedades:

data (T | null): Los datos obtenidos de la solicitud. Pueden ser null si la solicitud aún no ha finalizado.
loading (boolean): Un indicador booleano que representa si la solicitud está en progreso (true) o ha finalizado (false).
error (string | null): Un mensaje de error en caso de que ocurra un error durante la solicitud, o null si no hay errores.

## Ejemplo:

```

import { useFetch } from './useFetch';

const MyComponent = () => {
    const url = 'endpoint de una api';
    const { data, loading, error } = useFetch(url);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
        {/* Renderizar los datos obtenidos */}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

```