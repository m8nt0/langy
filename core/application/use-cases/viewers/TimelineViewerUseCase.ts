// src/core/application/use-cases/viewers/TimelineViewerUseCase.ts
import { ViewerService } from '../../../domain/services/ViewerService';
import { FilterDto } from '../../dto/FilterDto';
import { ViewerDto } from '../../dto/ViewerDto';

export class TimelineViewerUseCase {
  constructor(private viewerService: ViewerService) {}

  async execute(techObjectIds: string[], filters: FilterDto[] = []): Promise<ViewerDto> {
    const timelineData = await this.viewerService.generateTimelineView(techObjectIds);
    const filteredData = this.applyFilters(timelineData, filters);

    return {
      id: 'timeline-' + Date.now(),
      name: 'Timeline Viewer',
      type: 'timeline',
      data: filteredData,
      filters,
      configuration: {
        showFilters: true,
        sortBy: 'date',
        visualization: 'timeline'
      }
    };
  }

  private applyFilters(data: any[], filters: FilterDto[]): any[] {
    return data.filter(item => 
      filters.every(filter => this.matchesFilter(item, filter))
    );
  }

  private matchesFilter(item: any, filter: FilterDto): boolean {
    if (!filter.active) return true;
    
    const value = item[filter.criteria.field];
    switch (filter.criteria.operator) {
      case 'equals': return value === filter.criteria.value;
      case 'contains': return value?.toString().includes(filter.criteria.value);
      case 'greater_than': return value > filter.criteria.value;
      case 'less_than': return value < filter.criteria.value;
      case 'in': return filter.criteria.value.includes(value);
      case 'not_in': return !filter.criteria.value.includes(value);
      default: return true;
    }
  }
}
