import { BaseViewer } from '../../base';
import { useViewerBehavior } from '../../behaviors';
import { ParadigmViewerData } from '../../../../../core/domain/value-objects';

/**
 * A concrete viewer component responsible for displaying paradigm data,
 * such as design philosophies, mental models, and composability.
 */
export class ParadigmViewer extends BaseViewer<ParadigmViewerData[]> {
  constructor() {
    const behavior = useViewerBehavior('paradigm');
    super(behavior);
  }

  /**
   * The platform-specific implementation will use `this.props.data`
   * to render lists of traits, comparison tables, or charts.
   */
  render(): any {}
}