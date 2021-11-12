import { Controller, Get, Param, Post, Body, Put, Delete, UsePipes } from '@nestjs/common';
import { ReadAmbulanciaDto, CreateAmbulanciaDto, UpdateAmbulanciaDto } from './dto';
import { ValidationPipe } from '@functions/validation.pipe';
import { AmbulanciaService } from './ambulancia.service';
import { ResI } from '@interfaces/res.interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ambulancia')
@Controller('ambulancia')
export class AmbulanciaController {

    constructor(private readonly _ambService: AmbulanciaService) { }

    @Get()
    ObtenerTodos(): Promise<ReadAmbulanciaDto[]> {
        return this._ambService.ObtenerTodos();
    }

    @Get(':placa')
    ObtenerUno(@Param('placa') placa: string): Promise<ReadAmbulanciaDto> {
        return this._ambService.ObtenerUno(placa);
    }

    @Post()
    @UsePipes(ValidationPipe)
    CrearUno(@Body() ambulancia: CreateAmbulanciaDto): Promise<ResI> {
        return this._ambService.CrearUno(ambulancia);
    }

    @Put(':placa')
    @UsePipes(ValidationPipe)
    ActualizarUno(@Param('placa') placa: string, @Body() ambulancia: UpdateAmbulanciaDto): Promise<ResI> {
        return this._ambService.ActualizarUno(placa, ambulancia);
    }

    @Delete(':placa')
    EliminarUno(@Param('placa') placa: string): Promise<ResI> {
        return this._ambService.EliminarUno(placa);
    }

}