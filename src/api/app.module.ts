import { AutorizadoresModule } from './modulos/autorizadores/autorizadores.module';
import { AmbulanciaModule } from './modulos/ambulancia/ambulancia.module';
import { LoggingInterceptor } from '@functions/logging.interceptor';
import { HttpErrorFilter } from '@functions/http-erro.filter';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';
import { Module } from '@nestjs/common';
import { DepartamentoModule } from './modulos/departamento/departamento.module';
import { MunicipioModule } from './modulos/municipio/municipio.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AmbulanciaModule, AutorizadoresModule, DepartamentoModule, MunicipioModule],
  providers: [
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }
  ]
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
