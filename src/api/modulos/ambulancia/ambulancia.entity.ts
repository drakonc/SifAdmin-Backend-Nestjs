import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { DBName } from '../../shared/enums/database.enum';
import { Estado } from '../../shared/enums/estado.enum';

@Entity('Ambulancias', { database: DBName.SIFCONFIG })
export class Ambulancia extends BaseEntity {

    @PrimaryColumn({ type: 'varchar', length: 6, nullable: false })
    Placa: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Descripcion: string;

    @Column({ type: 'varchar', length: 10, nullable: false, default: Estado.ACTIVO })
    Estado: string;

}