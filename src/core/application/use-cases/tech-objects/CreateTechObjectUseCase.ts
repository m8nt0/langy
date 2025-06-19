// src/core/application/use-cases/tech-objects/CreateTechObjectUseCase.ts
import { ITechObjectRepository } from "../../../domain/repositories";
import { TechObjectDto } from "../../dto/TechObjectDto";
import { TechObject } from "../../../domain/entities";

export class CreateTechObjectUseCase {
    constructor(private techObjectRepo: ITechObjectRepository) {}
  
    async execute(dto: Omit<TechObjectDto, 'id'>): Promise<TechObjectDto> {
      const techObject = new TechObject({
        name: dto.name,
        type: dto.type,
        level: new AbstractionLevel(dto.level),
        versions: dto.versions.map(v => new Version(v.major, v.minor, v.patch, new Date(v.releaseDate), v.status)),
        metadata: dto.metadata,
        relationships: dto.relationships,
        content: dto.content
      });
  
      const saved = await this.techObjectRepo.save(techObject);
      return this.mapToDto(saved);
    }
  
    private mapToDto(techObject: any): TechObjectDto {
      return {
        id: techObject.id.value,
        name: techObject.name,
        type: techObject.type,
        level: techObject.level.value,
        versions: techObject.versions.map(v => ({
          major: v.major,
          minor: v.minor,
          patch: v.patch,
          releaseDate: v.releaseDate.toISOString(),
          status: v.status
        })),
        metadata: techObject.metadata,
        relationships: techObject.relationships,
        content: techObject.content
      };
    }
  }