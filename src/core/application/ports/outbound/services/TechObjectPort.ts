import { ITechObjectRepository } from "../../../../domain/repositories";

export class TechObjectPort implements ITechObjectRepository {
    findAll(): Promise<TechObject[]> {
        
    }
}