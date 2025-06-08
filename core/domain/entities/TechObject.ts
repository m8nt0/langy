import { VerticalLevel } from '../../../VerticalLevel';
import { HorizontalLevel } from '../value-objects/HorizontalLevel';
import { VisualizerApiPort } from '../../application/ports';
import { ViewerData } from '../value-objects';
// import { v4 as uuidv4 } from 'uuid';

/**
 * TechObject represents one technology object version,
 * with vertical and horizontal levels defining its type and version level.
 * Supports parent-child relationship to form version hierarchy.
 */

export class TechObject {
  private readonly id: string;
  private tags: { For: string[]; By: string[] };
  private name: string;
  // Not seen
  private verticalLevel: VerticalLevel;
  private horizontalLevel: HorizontalLevel;

  private viewerData: ViewerData;
  private visualizerAPI: VisualizerApiPort;
  // Version hierarchy references
  private parentId?: string;
  private childrenIds: string[] = [];

  constructor(
    id: string,
    name: string,
    verticalLevel: VerticalLevel,
    horizontalLevel: HorizontalLevel,
    tags: { For: string[]; By: string[] } = { For: [], By: [] },
    parentId?: string,

  ) {
    this.id = id;
    this.name = name;
    this.verticalLevel = verticalLevel;
    this.horizontalLevel = horizontalLevel;
    this.tags = tags;
    this.parentId = parentId;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getTags(): { For: string[]; By: string[] } {
    return this.tags;
  }

  public getVerticalLevel(): VerticalLevel {
    return this.verticalLevel;
  }

  public getHorizontalLevel(): HorizontalLevel {
    return this.horizontalLevel;
  }

  public getParentId(): string | undefined {
    return this.parentId;
  }

  public getChildrenIds(): string[] {
    return [...this.childrenIds];
  }

  // Add child version
  public addChild(childId: string): void {
    if (!this.childrenIds.includes(childId)) {
      this.childrenIds.push(childId);
    }
  }

  // Update fields selectively
  public update(
    name?: string,
    verticalLevel?: VerticalLevel,
    horizontalLevel?: HorizontalLevel,
    tags?: { For: string[]; By: string[] }
  ): void {
    if (name) this.name = name;
    if (verticalLevel) this.verticalLevel = verticalLevel;
    if (horizontalLevel) this.horizontalLevel = horizontalLevel;
    if (tags) this.tags = tags;
  }
}
