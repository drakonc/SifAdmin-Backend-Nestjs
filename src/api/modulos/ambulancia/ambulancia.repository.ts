import { Repository, EntityRepository } from "typeorm";
import { Ambulancia } from "./ambulancia.entity";

@EntityRepository(Ambulancia)
export class AmbulanciaRepository extends Repository<Ambulancia> { }