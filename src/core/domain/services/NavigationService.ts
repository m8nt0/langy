import { NavigationPath } from '../value-objects/NavigationPath';
import { TechObject } from '../entities/TechObject';
import { ITechObjectRepository } from '../../application/ports/outbound';
import { TechObjectId } from '../value-objects';

export class NavigationService {
  private currentPath: NavigationPath;

  constructor(private readonly techObjectRepo: ITechObjectRepository) {
    this.currentPath = NavigationPath.empty();
  }

  public async navigateTo(techObjectId: TechObjectId): Promise<void> {
    const techObject = await this.techObjectRepo.findById(techObjectId);
    if (!techObject) {
      throw new Error('Cannot navigate to a non-existent TechObject.');
    }
    this.currentPath = this.currentPath.add(techObject);
  }

  public navigateBackTo(nodeIndex: number): void {
    this.currentPath = this.currentPath.slice(nodeIndex);
  }
  
  public getCurrentPath(): NavigationPath {
    return this.currentPath;
  }

  public clear(): void {
    this.currentPath = NavigationPath.empty();
  }
}