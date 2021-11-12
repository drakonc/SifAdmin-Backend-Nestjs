import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAmbulanciaDto {

    @IsString()
    @MaxLength(6, { message: 'La Placa tiene que tener un Maximo 6 Caracteres' })
    @MinLength(2, { message: 'La Placa tiene que tener Minimo 2 Caracteres' })
    @ApiProperty({ type: 'string', required: true })
    readonly Placa: string;

    @IsString()
    @MaxLength(50, { message: 'La Descripción tiene que tener un Maximo 50 Caracteres' })
    @MinLength(2, { message: 'La Placa tiene que tener Minimo 2 Caracteres' })
    @ApiProperty({ type: 'string', required: true })
    readonly Descripcion: string;

}