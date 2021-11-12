import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadAutorizadoresDto {

    @Expose()
    @IsString()
    readonly Codigo: string;

    @Expose()
    @IsString()
    readonly Nombre: string;

    @Expose()
    @IsString()
    readonly Eps: string
}