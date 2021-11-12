import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                type: 'mysql' as 'mysql',
                name: 'default',
                host: config.get(Configuration.HOST),
                port: Number(config.get(Configuration.PORT_DB)),
                username: config.get(Configuration.USERNAME),
                database: config.get(Configuration.DATABASE_PRIMARY),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions;
        },
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                type: 'mysql' as 'mysql',
                name: 'second_DB',
                host: config.get(Configuration.HOST),
                port: Number(config.get(Configuration.PORT_DB)),
                username: config.get(Configuration.USERNAME),
                database: config.get(Configuration.DATABASE_SECONDARY),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions;
        },
    })
];