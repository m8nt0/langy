import { ITechObjectRepository } from '../../ports/outbound';
import { AbstractionService } from '../../../domain/services';
import { AbstractUpCommand } from '../../commands/NavigationCommands';
import { TechObjectDto, VersionDto } from '../../dto';
import { TechObject, TechVersion } from '../../../domain/entities';
import { TechObjectId } from '../../../domain/value-objects';

export class AbstractUpUseCase {
  private readonly abstractionService: AbstractionService;

  constructor(private readonly techObjectRepository: ITechObjectRepository) {
    this.abstractionService = new AbstractionService(techObjectRepository);
  }

  async execute(command: AbstractUpCommand): Promise<TechObjectDto[]> {
    const currentTechObjectId = new TechObjectId(command.currentTechObjectId);
    const currentTechObject = await this.techObjectRepository.findById(
      currentTechObjectId,
    );

    if (!currentTechObject) {
      throw new Error('Current TechObject not found');
    }

    const abstractedObjects = await this.abstractionService.abstractUp(
      currentTechObject,
      command.filters,
      command.combinationLogic,
    );

    return abstractedObjects.map((techObject) => this.mapToDto(techObject));
  }

  private mapToDto(techObject: TechObject): TechObjectDto {
    return {
      id: techObject.id.toString(),
      name: techObject.name,
      level: techObject.level.toNumber(),
      versions: techObject.versions.map((v) => this.mapVersionToDto(v)),
      // The full, rich viewer data is passed directly to the DTO
      viewersData: techObject.viewersData,
      metadata: techObject.metadata,
    };
  }

  private mapVersionToDto(version: TechVersion): VersionDto {
    return {
      id: version.id,
      version: version.version,
      metadata: version.metadata,
      children: version.children.map((v) => this.mapVersionToDto(v)),
    };
  }
}