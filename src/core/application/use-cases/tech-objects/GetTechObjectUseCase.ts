import { ITechObjectRepository } from '../../ports/outbound/ITechObjectRepository';
import { TechObjectDto, VersionDto } from '../../dto/TechObjectDto';
import { TechObjectId } from '../../../domain/value-objects';
import { TechObject, TechVersion } from '../../../domain/entities';

// import { PostgreSQLAdapter } from '../../../../adapters/persistence/relational/PostgreSQLAdapter';

export class GetTechObjectUseCase {
  constructor(private readonly techObjectRepo: ITechObjectRepository) {}

  async execute(id: string): Promise<TechObjectDto> {
    const techObjectId = new TechObjectId(id);
    const techObject = await this.techObjectRepo.findById(techObjectId);
    if (!techObject) {
      throw new Error('TechObject not found');
    }

    return this.mapToDto(techObject);
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

  private mapVersionToDto(version: TechVersion): VersionDto {
    return {
        id: version.id,
        version: version.version,
        metadata: version.metadata,
        children: version.children.map(child => this.mapVersionToDto(child))
    };
  }
}