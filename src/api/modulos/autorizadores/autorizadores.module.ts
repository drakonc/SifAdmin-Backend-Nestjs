import { AutorizadoresRepository } from './autorizadores.repository';
import { AutorizadoresController } from './autorizadores.controller';
import { AutorizadoresService } from './autorizadores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([AutorizadoresRepository])
    ],
    controllers: [AutorizadoresController],
    providers: [AutorizadoresService]
})
export class AutorizadoresModule { }
