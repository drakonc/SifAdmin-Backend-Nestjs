import { Controller, Get, Param, Post, Body, Put, Delete, UsePipes } from '@nestjs/common';
import { ReadAutorizadoresDto, CreateAutorizadoresDto, UpdateAutorizadoresDto } from './dto';
import { ValidationPipe } from '@functions/validation.pipe';
import { AutorizadoresService } from './autorizadores.service';
import { ApiTags } from '@nestjs/swagger';
import { ResI } from 'src/api/shared/interfaces/res.interfaces';

@ApiTags('Autorizadores')
@Controller('autorizadores')
export class AutorizadoresController {

    constructor(private readonly _autService: AutorizadoresService) { }

    @Get()
    ObtenerTodos(): Promise<ReadAutorizadoresDto[]> {
        return this._autService.ObtenerTodos();
    }

    @Get(':codigo')
    ObtenerUno(@Param('codigo') codigo: string): Promise<ReadAutorizadoresDto> {
        return this._autService.ObtenerUno(codigo);
    }

    @Post()
    @UsePipes(ValidationPipe)
    CrearUno(@Body() newAutorizadores: CreateAutorizadoresDto): Promise<ResI> {
        return this._autService.CrearUno(newAutorizadores);
    }

    @Put(':codigo')
    @UsePipes(ValidationPipe)
    ActualizarUno(@Param('codigo') codigo: string, @Body() upAutorizadores: UpdateAutorizadoresDto): Promise<ResI> {
        return this._autService.ActualizarUno(codigo, upAutorizadores);
    }

    @Delete(':codigo')
    EliminarUno(@Param('codigo') codigo: string): Promise<ResI> {
        return this._autService.EliminarUno(codigo);
    }

}
