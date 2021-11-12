import { DepartamentoRepository } from './departamento.repository';
import { DepartamentoController } from './departamento.controller';
import { DepartamentoService } from './departamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([DepartamentoRepository])
    ],
    controllers: [DepartamentoController],
    providers: [DepartamentoService]
})
export class DepartamentoModule { }
