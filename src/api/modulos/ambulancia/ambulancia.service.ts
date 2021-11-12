import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReadAmbulanciaDto, CreateAmbulanciaDto, UpdateAmbulanciaDto } from './dto';
import { AmbulanciaRepository } from './ambulancia.repository';
import { BaseServiceI } from '@interfaces/base.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ResI } from '@interfaces/res.interfaces';
import { plainToClass } from 'class-transformer';
import { Ambulancia } from './ambulancia.entity';
import { Estado } from '@enums/estado.enum';

@Injectable()
export class AmbulanciaService implements BaseServiceI {

    public ResPuesta: ResI;

    constructor(
        @InjectRepository(AmbulanciaRepository) private readonly _ambRepository: AmbulanciaRepository
    ) { }

    async ObtenerTodos(): Promise<ReadAmbulanciaDto[]> {
        try {
            const ambulancias: Ambulancia[] = await this._ambRepository.createQueryBuilder('amb')
                .select(['amb.Placa', 'amb.Descripcion'])
                .where('Estado = :estado', { estado: Estado.ACTIVO })
                .getMany();

            if (!ambulancias) throw new ConflictException('Error al listar las Ambulancia');

            return ambulancias.map((amb) => plainToClass(ReadAmbulanciaDto, amb));
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async ObtenerUno(placa: string): Promise<ReadAmbulanciaDto> {
        try {
            const ambulancia: Ambulancia = await this._ambRepository.createQueryBuilder('amb')
                .select(['amb.Placa', 'amb.Descripcion'])
                .where('Placa = :placa', { placa })
                .andWhere('Estado = :estado', { estado: Estado.ACTIVO })
                .getOne();

            if (!ambulancia) throw new NotFoundException('Ambulancia No Encontrada');

            return plainToClass(ReadAmbulanciaDto, ambulancia)
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async CrearUno(crearAmbulanciaDto: CreateAmbulanciaDto): Promise<ResI> {
        try {
            const { Placa, Descripcion } = crearAmbulanciaDto;

            const exist: Ambulancia = await this._ambRepository.createQueryBuilder('amb')
                .select(['amb.Placa', 'amb.Descripcion'])
                .where('Placa = :placa', { placa: Placa })
                .getOne();

            if (exist) throw new NotFoundException('Ambulancia ya Existe');

            const nuevo = await this._ambRepository.createQueryBuilder('amb')
                .insert()
                .into(Ambulancia)
                .values([
                    {
                        Placa: Placa.toUpperCase(), Descripcion: Descripcion.toUpperCase(), Estado: Estado.ACTIVO
                    }
                ])
                .execute()

            this.ResPuesta = nuevo.raw;

            if (this.ResPuesta.affectedRows === 0) throw new ConflictException('No se Pudo Crear la Ambulancia');

            this.ResPuesta.message = "Ambulancia Creado Satisfactoriamente"

            return this.ResPuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async ActualizarUno(placa: string, updateAmbulanciaDto: UpdateAmbulanciaDto): Promise<ResI> {
        try {
            const { Descripcion } = updateAmbulanciaDto;

            const ambulancia: Ambulancia = await this._ambRepository.createQueryBuilder('amb')
                .select(['amb.Placa', 'amb.Descripcion'])
                .where('Placa = :placa', { placa })
                .getOne();

            if (!ambulancia) throw new NotFoundException('No Se Encontro la Ambulancia Seleccionada');

            const update = await this._ambRepository.createQueryBuilder('amb')
                .update(ambulancia)
                .set({ Descripcion: Descripcion.toUpperCase() })
                .where("Placa = :placa", { placa })
                .execute();

            this.ResPuesta = update.raw;

            if (this.ResPuesta.affectedRows === 0) throw new ConflictException('No se Pudo Actualizar la Ambulancia');

            this.ResPuesta.message = "Ambulancia Actualizado Satisfactoriamente"

            return this.ResPuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async EliminarUno(placa: string): Promise<ResI> {
        try {
            const ambulancia: Ambulancia = await this._ambRepository.createQueryBuilder('amb')
                .select(['amb.Placa', 'amb.Descripcion'])
                .where('amb.Placa = :placa', { placa })
                .getOne();

            if (!ambulancia) throw new NotFoundException('No Se Encontro la Ambulancia Seleccionada');

            const delet = await this._ambRepository.createQueryBuilder('amb')
                .update(ambulancia)
                .set({ Estado: Estado.INACTIVO })
                .where("Placa = :placa", { placa })
                .execute();

            this.ResPuesta = delet.raw;

            if (this.ResPuesta.affectedRows === 0) throw new ConflictException('No se Pudo Eliminar la Ambulancia');

            this.ResPuesta.message = "Ambulancia Eliminado Satisfactoriamente"

            return this.ResPuesta;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}
