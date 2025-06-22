import { ViewerLayout } from './ViewerLayout';

/**
 * Defines the main content area, split into a left sidebar and the right content area.
 */
export class LevelLayout {
  private leftSidebar: LeftSidebar;
  private viewerLayout: ViewerLayout;

  constructor() {
    this.leftSidebar = new LeftSidebar();
    this.viewerLayout = new ViewerLayout();
  }

  render(): any {
    // Renders a container with two columns:
    // the left sidebar (placeholder) and the viewer layout on the right.
  }
}

/**
 * A placeholder for the future AI sidebar.
 */
class LeftSidebar {
    render(): any {
        // Renders an empty or placeholder sidebar. 
        // TODO: The AI chat, personal? Engaged? Informational? Guider? Teaches you about the ecosystem.
    }
}