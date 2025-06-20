import { ITechObjectRepository } from '../../ports/outbound';
import { FilterService } from '../../../domain/services';
import { TechObjectFilter, TechObjectId, SystemViewerData } from '../../../domain/value-objects';
import { TechObject } from '../../../domain/entities';

export interface GetSystemViewCommand {
  techObjectIds: string[];
  filter?: TechObjectFilter;
}

export class SystemViewerUseCase {
  private readonly filterService: FilterService;

  constructor(private readonly techObjectRepo: ITechObjectRepository) {
    this.filterService = new FilterService();
  }

  async execute(command: GetSystemViewCommand): Promise<SystemViewerData[]> {
    const techObjectIds = command.techObjectIds.map(id => new TechObjectId(id));
    let techObjects = await this.techObjectRepo.findByIds(techObjectIds);

    if (command.filter) {
      techObjects = this.filterService.applyFilter(techObjects, command.filter);
    }

    return techObjects.map(obj => obj.viewersData.system);
  }
}