import { TechObject } from '../../domain/entities/TechObject';
import { ViewerData } from '../../domain/value-objects';

export interface VisualizationConfig {
  language?: string;
  theme?: string;
  highlightRanges?: Array<{ start: number; end: number }>;
  showLineNumbers?: boolean;
  interactive?: boolean;
}

export interface VisualizationResult {
  html: string;
  css?: string;
  javascript?: string;
  metadata: {
    lines: number;
    characters: number;
    language: string;
    dependencies?: string[];
  };
}

export interface VisualizerApiPort {
  // Code visualization
  visualizeCode(
    code: string,
    config: VisualizationConfig
  ): Promise<VisualizationResult>;

  // Interactive visualization
  createInteractiveView(
    object: TechObject,
    viewer: ViewerData
  ): Promise<VisualizationResult>;

  // Relationship visualization
  visualizeRelationships(
    objects: TechObject[],
    relationships: Array<{ source: string; target: string; type: string }>
  ): Promise<VisualizationResult>;

  // Diff visualization
  visualizeDiff(
    original: string,
    modified: string,
    config?: VisualizationConfig
  ): Promise<VisualizationResult>;

  // Syntax highlighting
  highlightSyntax(
    code: string,
    language: string
  ): Promise<string>;

  // Code analysis visualization
  visualizeMetrics(
    metrics: Record<string, number>,
    type: 'chart' | 'graph' | 'heatmap'
  ): Promise<VisualizationResult>;

  // Custom visualization
  createCustomVisualization(
    data: any,
    template: string,
    config: Record<string, any>
  ): Promise<VisualizationResult>;
} 