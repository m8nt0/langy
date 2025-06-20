import { ITechObjectRepository } from '../../ports/outbound';
import { TechObject } from '../../../domain/entities';
import { TechObjectDto, VersionDto } from '../../dto';
import { TechObjectId } from '../../../domain/value-objects';

export class UpdateTechObjectUseCase {
  constructor(private readonly techObjectRepo: ITechObjectRepository) {}

  async execute(id: string, updates: Partial<Omit<TechObjectDto, 'id'>>): Promise<TechObjectDto> {
    const techObjectId = new TechObjectId(id);
    const existing = await this.techObjectRepo.findById(techObjectId);
    if (!existing) {
      throw new Error('TechObject not found');
    }

    // This logic should be expanded in the entity to handle partial updates
    const updatedObject = existing.update(updates); 

    const saved = await this.techObjectRepo.save(updatedObject);
    return this.mapToDto(saved);
  }

  private mapToDto(techObject: TechObject): TechObjectDto {
    return {
      id: techObject.id.toString(),
      name: techObject.name,
      level: techObject.level.toNumber(),
      versions: techObject.versions.map((v) => this.mapVersionToDto(v)),
      viewersData: techObject.viewersData,
      metadata: techObject.metadata,
    };
  }

  private mapVersionToDto(version: any): VersionDto {
    // Mapping logic from domain Version to VersionDto
    return {
        id: version.id,
        version: version.version,
        metadata: version.metadata,
        children: version.children.map(child => this.mapVersionToDto(child))
    };
  }
}