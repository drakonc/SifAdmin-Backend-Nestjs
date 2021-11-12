import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { ReadAutorizadoresDto, CreateAutorizadoresDto, UpdateAutorizadoresDto } from './dto';
import { AutorizadoresRepository } from './autorizadores.repository';
import { BaseServiceI } from '@interfaces/base.interface';
import { Autorizadores } from './autorizadores.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResI } from '@interfaces/res.interfaces';
import { plainToClass } from 'class-transformer';
import { Estado } from '@enums/estado.enum';


@Injectable()
export class AutorizadoresService implements BaseServiceI {

    public ResPuesta: ResI;

    constructor(
        @InjectRepository(AutorizadoresRepository) private readonly _autRepository: AutorizadoresRepository
    ) { }

    async ObtenerTodos(): Promise<ReadAutorizadoresDto[]> {
        try {
            const autorizadores: Autorizadores[] = await this._autRepository.createQueryBuilder('aut')
                .select(['aut.Codigo', 'aut.Nombre', 'aut.Eps'])
                .getMany();

            if (!autorizadores) throw new ConflictException('Error al listar los Autorizadores');

            return autorizadores.map((aut) => plainToClass(ReadAutorizadoresDto, aut));
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async ObtenerUno(codigo: string): Promise<ReadAutorizadoresDto> {
        try {
            const autorizador: Autorizadores = await this._autRepository.createQueryBuilder('aut')
                .select(['aut.Codigo', 'aut.Nombre', 'aut.Eps'])
                .where('Codigo = :codigo', { codigo })
                .getOne();

            if (!autorizador) throw new NotFoundException('Autorizador no Encontrado');

            return plainToClass(ReadAutorizadoresDto, autorizador);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async CrearUno(crearAutorizadores: CreateAutorizadoresDto): Promise<ResI> {
        try {
            const { Nombre, Eps } = crearAutorizadores;

            const existe: Autorizadores = await this._autRepository.createQueryBuilder('aut')
                .select(['aut.Codigo', 'aut.Nombre', 'aut.Eps'])
                .where('Nombre = :Nombre', { Nombre: Nombre.toUpperCase() })
                .getOne();

            if (existe) throw new NotFoundException('Autorizadores ya Encontrada');

            const nuevo = await this._autRepository.createQueryBuilder('aut')
                .insert()
                .into(Autorizadores)
                .values([
                    {
                        Nombre: Nombre.toUpperCase(), Eps: Eps.toUpperCase(), Estado: Estado.ACTIVO
                    }
                ])
                .execute()

            this.ResPuesta = nuevo.raw;

            if (this.ResPuesta.affectedRows === 0) throw new ConflictException('No se Pudo Crear el Autorizador');

            this.ResPuesta.message = "Autorizador Creado Satisfactoriamente"

            return this.ResPuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async ActualizarUno(codigo: string, updateAutorizadores: UpdateAutorizadoresDto): Promise<ResI> {
        try {
            const { Nombre, Eps } = updateAutorizadores;

            const autorizador: Autorizadores = await this._autRepository.createQueryBuilder('aut')
                .select(['aut.Codigo', 'aut.Nombre', 'aut.Eps'])
                .where('Codigo = :codigo', { codigo })
                .getOne();

            if (!autorizador) throw new NotFoundException('No Se Encontro el Autorizadores Seleccionado');

            const update = await this._autRepository.createQueryBuilder('aut')
                .update(autorizador)
                .set({ Nombre: Nombre.toUpperCase(), Eps: Eps.toUpperCase() })
                .where("Codigo = :Codigo", { Codigo: codigo })
                .execute();

            this.ResPuesta = update.raw;

            if (this.ResPuesta.affectedRows === 0) throw new ConflictException('No se Pudo Actualizar el Autorizador');

            this.ResPuesta.message = "Autorizador Actualizado Satisfactoriamente"

            return this.ResPuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async EliminarUno(codigo: string): Promise<ResI> {
        try {
            const autorizador: Autorizadores = await this._autRepository.createQueryBuilder('aut')
                .select(['aut.Codigo', 'aut.Nombre', 'aut.Eps'])
                .where('Codigo = :codigo', { codigo })
                .getOne();

            if (!autorizador) throw new NotFoundException('No Se Encontro el Autorizadores Seleccionado');

            const delet = await this._autRepository.createQueryBuilder('aut')
                .update(autorizador)
                .set({ Estado: Estado.INACTIVO })
                .where("Codigo = :Codigo", { Codigo: codigo })
                .execute();

            this.ResPuesta = delet.raw;

            if (this.ResPuesta.affectedRows === 0) throw new ConflictException('No se Pudo Eliminar el Autorizador');

            this.ResPuesta.message = "Autorizador Eliminado Satisfactoriamente"

            return this.ResPuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}