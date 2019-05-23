// tslint:disable-next-line: class-name
export interface DatosPersonales {
    nombres?: string;
    apellidos?: string;
    cedula?: boolean;
    numCedula?: number;
    fechaDeNacimeinto?: Date;
    pasaporte?: boolean;
    numPasaporte?: string;
    fechaDeVencimientoPasaporte?: Date;
    registroElectoral?: string;
    lugarRegistroElectoral?: string;
    estadoDeNacimiento?: string;
    ciudadDeNacimiento?: string;
    estadoCivil?: string;
    sexo?: string;
    edad?: number;
    profesion?: string;
    gradoEducacional?: string;
    hijosMenores?: boolean;
    cantidadHijosMenores?: number;
    cep?: string;
    numCasa?: string;
    complemento?: string;
    email?: string;
    telefono?: string;
}