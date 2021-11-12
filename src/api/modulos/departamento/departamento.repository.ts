import { EntityRepository, Repository } from 'typeorm';
import { Departamento } from './departamento.entity';

@EntityRepository(Departamento)
export class DepartamentoRepository extends Repository<Departamento> { }