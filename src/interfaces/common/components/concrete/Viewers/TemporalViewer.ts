import { BaseViewer } from '../../base';
import { useViewerBehavior } from '../../behaviors';
import { TemporalViewerData } from '../../../../../core/domain/value-objects';

/**
 * A concrete viewer component responsible for displaying temporal data,
 * such as a timeline of creation dates, major updates, and historical context.
 */
export class TemporalViewer extends BaseViewer<TemporalViewerData[]> {
  constructor() {
    // The behavior hook provides the props (data, isLoading, error)
    // by selecting the temporal data from the application's state.
    const behavior = useViewerBehavior('temporal');
    super(behavior);
  }

  /**
   * The platform-specific implementation will use `this.props.data`
   * to render a timeline, chart, or list.
   */
  render(): any {}
}