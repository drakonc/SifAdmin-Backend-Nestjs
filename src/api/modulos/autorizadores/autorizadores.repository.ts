import { Repository, EntityRepository } from 'typeorm';
import { Autorizadores } from './autorizadores.entity';

@EntityRepository(Autorizadores)
export class AutorizadoresRepository extends Repository<Autorizadores> { }