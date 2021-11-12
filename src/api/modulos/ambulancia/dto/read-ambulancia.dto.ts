import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadAmbulanciaDto {

    @Expose()
    @IsString()
    readonly Placa: string;

    @Expose()
    @IsString()
    readonly Descripcion: string;
}