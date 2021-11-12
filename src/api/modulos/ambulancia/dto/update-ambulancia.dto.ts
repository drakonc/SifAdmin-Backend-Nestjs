import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAmbulanciaDto {

    @IsString()
    @MaxLength(50, { message: 'La Descripción tiene que tener un Maximo 50 Caracteres' })
    @MinLength(2, { message: 'La Placa tiene que tener Minimo 2 Caracteres' })
    @ApiProperty({ type: 'string', required: true })
    readonly Descripcion: string;

}