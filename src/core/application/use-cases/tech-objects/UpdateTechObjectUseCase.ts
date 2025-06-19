// src/core/application/use-cases/tech-objects/UpdateTechObjectUseCase.ts

export class UpdateTechObjectUseCase {
    constructor(private techObjectRepo: ITechObjectRepository) {}
  
    async execute(id: string, updates: Partial<TechObjectDto>): Promise<TechObjectDto> {
      const existing = await this.techObjectRepo.findById(id);
      if (!existing) throw new Error('TechObject not found');
  
      const updated = existing.update(updates);
      const saved = await this.techObjectRepo.save(updated);
      
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