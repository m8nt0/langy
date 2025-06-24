import { ITechObjectRepository } from '../../ports/outbound';
import { TechObject } from '../../../domain/entities';
import { TechObjectDto, VersionDto } from '../../dto';
import {
  AbstractionLevel,
  CompleteViewerData,
  TechObjectId,
  VersionNumber,
} from '../../../domain/value-objects';
import { TechVersion } from '../../../domain/entities/TechObject';

export class CreateTechObjectUseCase {
  constructor(private readonly techObjectRepo: ITechObjectRepository) {}

  async execute(dto: Omit<TechObjectDto, 'id'>): Promise<TechObjectDto> {
    const techObject = new TechObject(
      TechObjectId.generate(), // Generate new ID
      dto.name,
      new AbstractionLevel(dto.level),
      this.mapVersionsFromDto(dto.versions),
      dto.viewersData as CompleteViewerData, // Directly use the rich viewersData
    );

    const saved = await this.techObjectRepo.save(techObject);
    return this.mapToDto(saved);
  }

  private mapVersionsFromDto(versionDtos: VersionDto[]): TechVersion[] {
      return versionDtos.map(dto => new TechVersion(
          dto.id,
          new VersionNumber(dto.version.major, dto.version.minor, dto.version.patch),
          // dto.metadata,
          this.mapVersionsFromDto(dto.children), // Recursively map children
          dto.viewersData as CompleteViewerData
      ));
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