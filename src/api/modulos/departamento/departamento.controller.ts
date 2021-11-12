import { DepartamentoService } from './departamento.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { Departamento } from './departamento.entity';

@ApiTags('Departamentos')
@Controller('departamento')
export class DepartamentoController {

    constructor(private readonly _dptService: DepartamentoService) { }

    @Get()
    GetAllDepartamento(): Promise<Departamento[]> {
        return this._dptService.GetAllDepartamento();
    }

    @Get('municipios')
    GetAllDepartamentoMunicipios(): Promise<Departamento[]> {
        return this._dptService.GetAllDepartamentoMunicipios();
    }

    @Get(':codigo')
    GetOneDepartamento(@Param('codigo') codigo: string): Promise<Departamento> {
        return this._dptService.GetOneDepartamento(codigo)
    }


    @Get('municipios/:codigo')
    GetOneDepartamentoMunicipios(@Param('codigo') codigo: string) {
        return this._dptService.GetOneDepartamentoMunicipios(codigo);
    }

}
