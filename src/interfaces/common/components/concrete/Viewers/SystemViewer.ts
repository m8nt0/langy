import { BaseViewer } from '../../base';
import { useViewerBehavior } from '../../behaviors';
import { SystemViewerData } from '../../../../../core/domain/value-objects';

/**
 * A concrete viewer component responsible for displaying system-level data,
 * such as runtime, performance, and memory characteristics.
 */
export class SystemViewer extends BaseViewer<SystemViewerData[]> {
  constructor() {
    const behavior = useViewerBehavior('system');
    super(behavior);
  }

  /**
   * The platform-specific implementation will use `this.props.data`
   * to render technical specification tables or performance charts.
   */
  render(): any {}
}