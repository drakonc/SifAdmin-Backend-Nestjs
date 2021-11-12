import {MigrationInterface, QueryRunner} from "typeorm";

export class PrimeraMigracion1593481513363 implements MigrationInterface {
    name = 'PrimeraMigracion1593481513363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `SIFCONFIG`.`Ambulancias` (`Placa` varchar(6) NOT NULL, `Descripcion` varchar(50) NOT NULL, `Estado` varchar(10) NOT NULL DEFAULT 'Activo', PRIMARY KEY (`Placa`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `SIFCONFIG`.`Autorizadores` (`Id` int NOT NULL AUTO_INCREMENT, `Codigo` varchar(7) NULL, `Nombre` varchar(50) NOT NULL, `Eps` varchar(6) NOT NULL, `Estado` varchar(10) NOT NULL DEFAULT 'Activo', UNIQUE INDEX `IDX_cd1299c75b8761de642712938f` (`Codigo`), PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `SIFCONFIG`.`Municipios` (`CoigoLargo` varchar(5) NOT NULL, `Codigo` varchar(3) NOT NULL, `Nombre` varchar(100) NOT NULL, `departamentoCodigo` varchar(2) NULL, PRIMARY KEY (`CoigoLargo`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `SIFCONFIG`.`Departamentos` (`Codigo` varchar(2) NOT NULL, `Nombre` varchar(30) NOT NULL, PRIMARY KEY (`Codigo`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `SIFCONFIG`.`Municipios` ADD CONSTRAINT `FK_bd9f06813e4f31c4dc87d0d2908` FOREIGN KEY (`departamentoCodigo`) REFERENCES `SIFCONFIG`.`Departamentos`(`Codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `SIFCONFIG`.`Municipios` DROP FOREIGN KEY `FK_bd9f06813e4f31c4dc87d0d2908`");
        await queryRunner.query("DROP TABLE `SIFCONFIG`.`Departamentos`");
        await queryRunner.query("DROP TABLE `SIFCONFIG`.`Municipios`");
        await queryRunner.query("DROP INDEX `IDX_cd1299c75b8761de642712938f` ON `SIFCONFIG`.`Autorizadores`");
        await queryRunner.query("DROP TABLE `SIFCONFIG`.`Autorizadores`");
        await queryRunner.query("DROP TABLE `SIFCONFIG`.`Ambulancias`");
    }

}
