import { NavigationService } from '../../../domain/services';
import { NavigationNode } from '../../../domain/value-objects';

export class GetNavigationPathUseCase {
  constructor(private readonly navigationService: NavigationService) {}

  async execute(): Promise<ReadonlyArray<NavigationNode>> {
    const currentPath = this.navigationService.getCurrentPath();
    return currentPath.nodes;
  }
}