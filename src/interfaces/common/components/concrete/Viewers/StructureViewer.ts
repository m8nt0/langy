import { BaseViewer } from '../../base';
import { useViewerBehavior } from '../../behaviors';
import { StructureViewerData } from '../../../../../core/domain/value-objects';

/**
 * A concrete viewer component responsible for displaying structural data,
 * such as dependency graphs, extensions, and implementations.
 * (Formerly AbstractionViewer.ts)
 */
export class StructureViewer extends BaseViewer<StructureViewerData[]> {
  constructor() {
    const behavior = useViewerBehavior('structure');
    super(behavior);
  }

  /**
   * The platform-specific implementation will use `this.props.data`
   * to render a graph or tree diagram.
   */
  render(): any {}
}