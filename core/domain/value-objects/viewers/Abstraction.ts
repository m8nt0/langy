import { ViewerConfiguration } from "../ViewerData";

export enum TreeDirection {
    TOP_DOWN = 'TOP_DOWN',
    BOTTOM_UP = 'BOTTOM_UP',
    LEFT_RIGHT = 'LEFT_RIGHT',
    RIGHT_LEFT = 'RIGHT_LEFT',
    RADIAL = 'RADIAL'
}


export interface AbstractionViewerConfig extends ViewerConfiguration {
    direction: TreeDirection;
    maxDepth: number;
    showInherited: boolean;
    showImplemented: boolean;
    collapseNodes: boolean;
}