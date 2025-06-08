// src/core/domain/services/NavigationService.ts
import { NavigationPath, PathSegment } from '../value-objects/NavigationPath';
import { AbstractionLevel } from '../value-objects/AbstractionLevel';
import { TechObjectId } from '../value-objects/TechObjectId';
import { VersionNumber } from '../value-objects/VersionNumber';

export class NavigationService {
  private currentPath: NavigationPath = NavigationPath.create();
  private history: NavigationPath[] = [];
  private forwardStack: NavigationPath[] = [];

  getCurrentPath(): NavigationPath {
    return this.currentPath;
  }

  navigateToLevel(level: AbstractionLevel): NavigationPath {
    this.addToHistory();
    this.clearForwardStack();
    this.currentPath = this.currentPath.navigateToLevel(level);
    return this.currentPath;
  }

  navigateToTechObject(level: AbstractionLevel, techObjectId: TechObjectId): NavigationPath {
    this.addToHistory();
    this.clearForwardStack();
    this.currentPath = this.currentPath.navigateToTechObject(level, techObjectId);
    return this.currentPath;
  }

  navigateToVersion(level: AbstractionLevel, techObjectId: TechObjectId, version: VersionNumber): NavigationPath {
    this.addToHistory();
    this.clearForwardStack();
    this.currentPath = this.currentPath.navigateToVersion(level, techObjectId, version);
    return this.currentPath;
  }

  goBack(): NavigationPath {
    if (this.history.length > 0) {
      this.forwardStack.push(this.currentPath);
      this.currentPath = this.history.pop()!;
    }
    return this.currentPath;
  }

  goForward(): NavigationPath {
    if (this.forwardStack.length > 0) {
      this.addToHistory();
      this.currentPath = this.forwardStack.pop()!;
    }
    return this.currentPath;
  }

  canGoBack(): boolean {
    return this.history.length > 0;
  }

  canGoForward(): boolean {
    return this.forwardStack.length > 0;
  }

  reset(): NavigationPath {
    this.currentPath = NavigationPath.create();
    this.history = [];
    this.forwardStack = [];
    return this.currentPath;
  }

  getBreadcrumb(): string {
    return this.currentPath.getBreadcrumb();
  }

  private addToHistory(): void {
    this.history.push(this.currentPath);
    // Limit history size
    if (this.history.length > 50) {
      this.history.shift();
    }
  }

  private clearForwardStack(): void {
    this.forwardStack = [];
  }
}
