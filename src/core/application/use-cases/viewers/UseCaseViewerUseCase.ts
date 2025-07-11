import { ITechObjectRepository } from '../../ports/outbound';
import { FilterService } from '../../../domain/services';
import { TechObjectFilter, TechObjectId, UseCaseViewerData } from '../../../domain/value-objects';
import { TechObject } from '../../../domain/entities';

export interface GetUseCaseViewCommand {
  techObjectIds: string[];
  filter?: TechObjectFilter;
}

export class UseCaseViewerUseCase {
  private readonly filterService: FilterService;

  constructor(private readonly techObjectRepo: ITechObjectRepository) {
    this.filterService = new FilterService();
  }

  async execute(command: GetUseCaseViewCommand): Promise<UseCaseViewerData[]> {
    const techObjectIds = command.techObjectIds.map(id => new TechObjectId(id));
    let techObjects = await this.techObjectRepo.findByIds(techObjectIds);

    if (command.filter) {
      techObjects = this.filterService.applyFilter(techObjects, command.filter);
    }

    return techObjects.map(obj => obj.viewersData.usecase);
  }
}