import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { DBName } from '../../shared/enums/database.enum';
import { Estado } from '../../shared/enums/estado.enum';

@Entity('Autorizadores', { database: DBName.SIFCONFIG })
export class Autorizadores extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: 'varchar', length: 7, unique: true, nullable: true })
    Codigo: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    Nombre: string;

    @Column({ type: 'varchar', length: 6, nullable: false })
    Eps: string

    @Column({ type: 'varchar', length: 10, nullable: false, default: Estado.ACTIVO })
    Estado: string;

}