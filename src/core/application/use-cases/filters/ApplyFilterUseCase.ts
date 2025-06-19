export class ApplyFilterUseCase {
    constructor(private filterService: FilterService) {}
  
    async execute(data: any[], filters: FilterDto[]): Promise<any[]> {
      return this.filterService.applyFilters(data, filters);
    }
  }
  