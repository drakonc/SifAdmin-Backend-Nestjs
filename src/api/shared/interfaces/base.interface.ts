import { ResI } from "./res.interfaces";

export interface BaseServiceI {

    ResPuesta: ResI;

    ObtenerTodos();
    ObtenerUno(Id: any)
    CrearUno(ObjectDto: any)
    ActualizarUno(Id: any, ObjectDto: any)
    EliminarUno(Id: string)

}