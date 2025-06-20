import { ITechObjectRepository } from '../../ports/outbound';
import { FilterService } from '../../../domain/services';
import { TechObjectFilter, TechObjectId, TemporalViewerData } from '../../../domain/value-objects';
import { TechObject } from '../../../domain/entities';

export interface GetTemporalViewCommand {
  techObjectIds: string[];
  filter?: TechObjectFilter; // Optional filter to apply before getting data
}

export class TemporalViewerUseCase {
  private readonly filterService: FilterService;

  constructor(private readonly techObjectRepo: ITechObjectRepository) {
    this.filterService = new FilterService();
  }

  async execute(command: GetTemporalViewCommand): Promise<TemporalViewerData[]> {
    const techObjectIds = command.techObjectIds.map(id => new TechObjectId(id));
    let techObjects = await this.techObjectRepo.findByIds(techObjectIds);

    if (command.filter) {
      techObjects = this.filterService.applyFilter(techObjects, command.filter);
    }

    return techObjects.map(obj => obj.viewersData.temporal);
  }
}