export default function validationErrorHandler(

    error,

    setErrores

){

    const errores =
        error.response?.data?.data;

    if(errores){

        setErrores(errores);

    }

}