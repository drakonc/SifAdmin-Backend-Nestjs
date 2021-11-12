import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { DepartamentoRepository } from './departamento.repository';
import { Departamento } from './departamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DepartamentoService {

    constructor(
        @InjectRepository(DepartamentoRepository) private readonly _dptRepository: DepartamentoRepository
    ) { }

    async GetAllDepartamento(): Promise<Departamento[]> {
        try {
            const departamento: Departamento[] = await this._dptRepository.createQueryBuilder('dpt')
                .select(['dpt.Codigo', 'dpt.Nombre'])
                .getMany();
            if (!departamento) throw new ConflictException('Departamento no Encontrado');
            return departamento
        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    async GetAllDepartamentoMunicipios(): Promise<Departamento[]> {
        try {
            const departamento: Departamento[] = await this._dptRepository.createQueryBuilder('dpt')
                .select(['dpt.Codigo', 'dpt.Nombre'])
                .addSelect(['mun.CoigoLargo', 'mun.Codigo', 'mun.Nombre'])
                .innerJoin('dpt.Municipios', 'mun', 'dpt.Codigo = mun.departamentoCodigo')
                .getMany();
            if (!departamento) throw new ConflictException('Departamento no Encontrado');
            return departamento
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async GetOneDepartamento(codigo: string): Promise<Departamento> {
        try {
            const departamento: Departamento = await this._dptRepository.createQueryBuilder('dpt')
                .select(['dpt.Codigo', 'dpt.Nombre'])
                .where('dpt.Codigo = :codigo', { codigo })
                .getOne();
            if (!departamento) throw new ConflictException('Departamento no Encontrado');
            return departamento
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async GetOneDepartamentoMunicipios(codigo: string): Promise<Departamento> {
        try {
            const departamento: Departamento = await this._dptRepository.createQueryBuilder('dpt')
                .select(['dpt.Codigo', 'dpt.Nombre'])
                .addSelect(['mun.CoigoLargo', 'mun.Codigo', 'mun.Nombre'])
                .innerJoin('dpt.Municipios', 'mun', 'dpt.Codigo = mun.departamentoCodigo')
                .where('dpt.Codigo = :codigo', { codigo })
                .getOne();
            if (!departamento) throw new ConflictException('Departamento no Encontrado');
            return departamento
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}