import { Entity, BaseEntity, Column, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { DBName } from '../../shared/enums/database.enum';
import { Municipio } from '../municipio/municipio.entity';

@Entity('Departamentos', { database: DBName.SIFCONFIG })
export class Departamento extends BaseEntity {

    @PrimaryColumn({ type: 'varchar', length: 2, nullable: false })
    Codigo: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    Nombre: string;

    @OneToMany(type => Municipio, municipio => municipio.Departamento, { nullable: false })
    Municipios: Municipio[];
}