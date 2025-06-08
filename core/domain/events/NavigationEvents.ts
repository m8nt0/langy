export interface NavigationLevelChangedEvent {
    type: 'NAVIGATION_LEVEL_CHANGED';
    payload: {
      fromLevel: number;
      toLevel: number;
      direction: 'up' | 'down';
      timestamp: Date;
      context: {
        selectedObjects: string[];
        filterCriteria: string[];
      };
    };
  }
  
  export interface NavigationHorizontalMoveEvent {
    type: 'NAVIGATION_HORIZONTAL_MOVE';
    payload: {
      objectId: string;
      fromVersion: string;
      toVersion: string;
      timestamp: Date;
    };
  }
  
  export interface NavigationAbstractionEvent {
    type: 'NAVIGATION_ABSTRACTION';
    payload: {
      operation: 'abstract_up' | 'abstract_down';
      sourceObjects: string[];
      targetObjects: string[];
      logic: 'FOR' | 'BY';
      combination: 'AND' | 'OR';
      timestamp: Date;
    };
  }
  
  export interface NavigationFilterAppliedEvent {
    type: 'NAVIGATION_FILTER_APPLIED';
    payload: {
      filterId: string;
      criteria: Array<{
        field: string;
        operator: string;
        value: any;
      }>;
      resultCount: number;
      timestamp: Date;
    };
  }
  
  export interface NavigationViewerChangedEvent {
    type: 'NAVIGATION_VIEWER_CHANGED';
    payload: {
      fromViewer: string;
      toViewer: string;
      level: number;
      objectCount: number;
      timestamp: Date;
    };
  }
  
  export interface NavigationBreadcrumbEvent {
    type: 'NAVIGATION_BREADCRUMB';
    payload: {
      path: Array<{
        level: number;
        name: string;
        id?: string;
      }>;
      action: 'navigate_to' | 'back' | 'forward';
      timestamp: Date;
    };
  }
  
  export type NavigationEvent = 
    | NavigationLevelChangedEvent
    | NavigationHorizontalMoveEvent
    | NavigationAbstractionEvent
    | NavigationFilterAppliedEvent
    | NavigationViewerChangedEvent
    | NavigationBreadcrumbEvent;