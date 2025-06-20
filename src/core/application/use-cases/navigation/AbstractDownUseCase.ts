import { ITechObjectRepository } from '../../ports/outbound';
import { TechObjectDto, VersionDto } from '../../dto';
import { AbstractDownCommand } from '../../commands/NavigationCommands';
import { TechObjectId } from '../../../domain/value-objects';
import { TechObject, TechVersion } from '../../../domain/entities';

export class AbstractDownUseCase {
  constructor(private readonly techObjectRepo: ITechObjectRepository) {}

  async execute(command: AbstractDownCommand): Promise<TechObjectDto> {
    const targetId = new TechObjectId(command.targetTechObjectId);
    const techObject = await this.techObjectRepo.findById(targetId);

    if (!techObject) {
      throw new Error('Target TechObject not found for AbstractDown.');
    }

    return this.mapToDto(techObject);
  }

  private mapToDto(techObject: TechObject): TechObjectDto {
    // This mapping logic should be centralized if used in multiple places
    return {
      id: techObject.id.toString(),
      name: techObject.name,
      level: techObject.level.toNumber(),
      versions: techObject.versions.map((v) => this.mapVersionToDto(v)),
      viewersData: techObject.viewersData
    };
  }

  private mapVersionToDto(version: TechVersion): VersionDto {
    return {
        id: version.id,
        version: version.version,
        children: version.children.map(child => this.mapVersionToDto(child))
    };
  }
}