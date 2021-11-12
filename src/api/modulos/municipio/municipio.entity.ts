import { Entity, BaseEntity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Departamento } from '../departamento/departamento.entity';
import { DBName } from '../../shared/enums/database.enum';

@Entity('Municipios', { database: DBName.SIFCONFIG })
export class Municipio extends BaseEntity {

    @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
    CoigoLargo: string;

    @Column({ type: 'varchar', length: 3, nullable: false })
    Codigo: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    Nombre: string;

    @ManyToOne(type => Departamento, departamento => departamento.Municipios)
    Departamento: string;

}