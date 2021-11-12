import { AutorizadoresModule } from '@modulos/autorizadores/autorizadores.module';
import { DepartamentoModule } from '@modulos/departamento/departamento.module';
import { AmbulanciaModule } from '@modulos/ambulancia/ambulancia.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

export class SwaggerTarget {

    private app;

    constructor(app) {
        this.app = app;
    }

    public Start() {
        this.SWGenetral();
        this.AmbulanciaSW();
        this.AutorizadoresSW();
        this.DepartamentosSW();
    }

    private async SWGenetral(): Promise<void> {
        const options = new DocumentBuilder()
            .setTitle('Api Sif Admin')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
            .build();

        const document = SwaggerModule.createDocument(this.app, options);
        SwaggerModule.setup('swApi', this.app, document, { swaggerOptions: { filter: true, showRequestDuration: true } });
        Logger.log('Mapped {/swApi, GET} router', 'RouterSwagger');
    }

    private async AmbulanciaSW(): Promise<void> {
        const options = new DocumentBuilder()
            .setTitle('Api Sif Admin Ambulancia')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
            .build();

        const document = SwaggerModule.createDocument(this.app, options, { include: [AmbulanciaModule] });
        SwaggerModule.setup('swApi/ambulancia', this.app, document, { swaggerOptions: { showRequestDuration: true } });
        Logger.log('Mapped {/swApi/ambulancia, GET} router', 'RouterSwagger');
    }

    private async AutorizadoresSW(): Promise<void> {
        const options = new DocumentBuilder()
            .setTitle('Api Sif Admin Autorizadores')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
            .build();

        const document = SwaggerModule.createDocument(this.app, options, { include: [AutorizadoresModule] });
        SwaggerModule.setup('swApi/autorizadores', this.app, document, { swaggerOptions: { showRequestDuration: true } });
        Logger.log('Mapped {/swApi/autorizadores, GET} router', 'RouterSwagger');
    }

    private async DepartamentosSW(): Promise<void> {
        const options = new DocumentBuilder()
            .setTitle('Api Sif Admin Departamentos')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
            .build();

        const document = SwaggerModule.createDocument(this.app, options, { include: [DepartamentoModule] });
        SwaggerModule.setup('swApi/departamento', this.app, document, { swaggerOptions: { showRequestDuration: true } });
        Logger.log('Mapped {/swApi/departamento, GET} router', 'RouterSwagger');
    }

}
