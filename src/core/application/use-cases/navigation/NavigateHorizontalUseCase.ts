import { ITechObjectRepository } from '../../ports/outbound';
import { TechObjectDto, VersionDto } from '../../dto';
import { NavigateHorizontalCommand } from '../../commands/NavigationCommands';
import { TechObjectId, VersionNumber } from '../../../domain/value-objects';
import { TechObject, TechVersion } from '../../../domain/entities';

export class NavigateHorizontalUseCase {
  constructor(private readonly techObjectRepo: ITechObjectRepository) {}

  async execute(command: NavigateHorizontalCommand): Promise<TechObjectDto> {
    const currentId = new TechObjectId(command.currentTechObjectId);
    const techObject = await this.techObjectRepo.findById(currentId);

    if (!techObject) {
      throw new Error('Current TechObject not found for NavigateHorizontal.');
    }
    
    // In a real app, you might search the whole family of a tech object.
    // Here, we assume we are navigating within the versions of the given ID.
    const targetVersion = this.findVersion(techObject.versions, command.targetVersion);

    if (!targetVersion) {
      throw new Error('Target version not found.');
    }
    
    // Create a new TechObject representation for the specific version
    const versionAsTechObject = new TechObject(
      targetVersion.id,
      techObject.name, // Name stays the same
      techObject.level,
      [targetVersion], // The main versions array contains only this version
      targetVersion.viewersData, // Use the specific viewer data for this version
      // targetVersion.metadata,
    );
    
    return this.mapToDto(versionAsTechObject);
  }

  private findVersion(versions: TechVersion[], targetVersionNumber: string): TechVersion | null {
    for (const version of versions) {
      if (version.version.toString() === targetVersionNumber) {
        return version;
      }
      const foundInChildren = this.findVersion(version.children, targetVersionNumber);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
    return null;
  }

  private mapToDto(techObject: TechObject): TechObjectDto {
    return {
      id: techObject.id.toString(),
      name: techObject.name,
      level: techObject.level.toNumber(),
      versions: techObject.versions.map((v) => this.mapVersionToDto(v)),
      viewersData: techObject.viewersData,
      // metadata: techObject.metadata,
    };
  }

   private mapVersionToDto(version: TechVersion): VersionDto {
    return {
        id: version.id,
        version: version.version,
        // metadata: version.metadata,
        children: version.children.map(child => this.mapVersionToDto(child))
    };
  }
}