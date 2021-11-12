import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAutorizadoresDto {

    @IsString()
    @MaxLength(50, { message: 'El Nombre tiene que tener un Maximo 6 Caracteres' })
    @MinLength(2, { message: 'El Codido tiene que tener Minimo 2 Caracteres' })
    @ApiProperty({ type: 'string', required: true })
    readonly Nombre: string;

    @IsString()
    @MaxLength(6, { message: 'El Codigo EPS tiene que tener un Maximo 6 Caracteres' })
    @MinLength(2, { message: 'El Codigo EPS tiene que tener Minimo 2 Caracteres' })
    @ApiProperty({ type: 'string', required: true })
    readonly Eps: string
}