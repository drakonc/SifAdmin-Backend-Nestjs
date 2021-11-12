import { AmbulanciaController } from './ambulancia.controller';
import { AmbulanciaRepository } from './ambulancia.repository';
import { AmbulanciaService } from './ambulancia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        TypeOrmModule.forFeature([AmbulanciaRepository])
    ],
    controllers: [AmbulanciaController],
    providers: [AmbulanciaService]
})
export class AmbulanciaModule { }
