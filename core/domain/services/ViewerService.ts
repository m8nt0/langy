// ================================
// ViewerService.ts
// ================================

import { TechObject } from '../entities/TechObject';
import { 
    ViewerType, 
    ViewerConfig, 
    ViewerData, 
    TimelineData, 
    AbstractionData, 
    ParadigmData, 
    SystemData, 
    UseCaseData, 
    ExperienceData 
  } from '../value-objects/Viewer';


  export interface IViewerService {
    generateViewerData(objects: TechObject[], type: ViewerType, config?: ViewerConfig): ViewerData;
    getTimelineData(objects: TechObject[]): TimelineData[];
    getAbstractionData(objects: TechObject[]): AbstractionData[];
    getParadigmData(objects: TechObject[]): ParadigmData[];
    getSystemData(objects: TechObject[]): SystemData[];
    getUseCaseData(objects: TechObject[]): UseCaseData[];
    getExperienceData(objects: TechObject[]): ExperienceData[];
  }
  
  export class ViewerService implements IViewerService {
    generateViewerData(objects: TechObject[], type: ViewerType, config?: ViewerConfig): ViewerData {
      let data: any[];
      
      switch (type) {
        case ViewerType.TIMELINE:
          data = this.getTimelineData(objects);
          break;
        case ViewerType.ABSTRACTION:
          data = this.getAbstractionData(objects);
          break;
        case ViewerType.PARADIGM:
          data = this.getParadigmData(objects);
          break;
        case ViewerType.SYSTEM:
          data = this.getSystemData(objects);
          break;
        case ViewerType.USECASE:
          data = this.getUseCaseData(objects);
          break;
        case ViewerType.EXPERIENCE:
          data = this.getExperienceData(objects);
          break;
        default:
          throw new Error(`Unsupported viewer type: ${type}`);
      }
  
      // Apply config if provided
      if (config) {
        data = this.applyConfig(data, config);
      }
  
      return { type, data };
    }
  
    getTimelineData(objects: TechObject[]): TimelineData[] {
      return objects.map(obj => ({
        id: obj.id.value,
        name: obj.name,
        createdAt: obj.metadata.createdAt,
        updatedAt: obj.metadata.updatedAt,
        versions: obj.versions.map(v => ({
          version: v.version || 'unknown',
          createdAt: v.createdAt,
          features: v.features || []
        })),
        milestones: obj.content.viewerData.timeline || []
      })).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
  
    getAbstractionData(objects: TechObject[]): AbstractionData[] {
      return objects.map(obj => ({
        id: obj.id.value,
        name: obj.name,
        level: obj.level,
        type: obj.type,
        dependencies: obj.relationships
          .filter(r => r.type === 'DEPENDS_ON')
          .map(r => ({ id: r.targetId.value, type: r.type })),
        dependents: obj.relationships
          .filter(r => r.type === 'USED_BY')
          .map(r => ({ id: r.targetId.value, type: r.type })),
        abstractionScore: this.calculateAbstractionScore(obj)
      }));
    }
  
    getParadigmData(objects: TechObject[]): ParadigmData[] {
      return objects.map(obj => ({
        id: obj.id.value,
        name: obj.name,
        designPhilosophy: obj.content.narrative.designPhilosophy,
        tags: obj.metadata.tags,
        influences: obj.relationships
          .filter(r => r.type === 'INFLUENCED_BY')
          .map(r => ({ id: r.targetId.value, type: r.type }))
      }));
    }
  
    getSystemData(objects: TechObject[]): SystemData[] {
      return objects.map(obj => ({
        id: obj.id.value,
        name: obj.name,
        creator: obj.metadata.creator,
        website: obj.metadata.website,
        repository: obj.metadata.repository,
        documentation: obj.metadata.documentation,
        currentStatus: obj.content.narrative.currentStatus
      }));
    }
  
    getUseCaseData(objects: TechObject[]): UseCaseData[] {
      return objects.map(obj => ({
        id: obj.id.value,
        name: obj.name,
        description: obj.metadata.description,
        tags: obj.metadata.tags,
        codeExamples: obj.content.codeExamples.examples
      }));
    }
  
    getExperienceData(objects: TechObject[]): ExperienceData[] {
      return objects.map(obj => ({
        id: obj.id.value,
        name: obj.name,
        documentation: obj.metadata.documentation,
        community: obj.metadata.community,
        codeExamples: obj.content.codeExamples
      }));
    }
  
    private calculateAbstractionScore(object: TechObject): number {
      const dependencyCount = object.relationships.filter(r => r.type === 'DEPENDS_ON').length;
      const dependentCount = object.relationships.filter(r => r.type === 'USED_BY').length;
      
      // Higher score means more abstract (more things depend on it, fewer dependencies)
      return (dependentCount * 2) - dependencyCount + (object.level * 10);
    }
  
    private applyConfig(data: any[], config: ViewerConfig): any[] {
      let result = [...data];
  
      // Apply sorting
      if (config.sortBy) {
        result.sort((a, b) => {
          const aVal = this.getNestedValue(a, config.sortBy!);
          const bVal = this.getNestedValue(b, config.sortBy!);
          
          if (config.sortOrder === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }
  
      // Apply limit
      if (config.limit) {
        result = result.slice(0, config.limit);
      }
  
      return result;
    }
  
    private getNestedValue(obj: any, path: string): any {
      return path.split('.').reduce((current, key) => current?.[key], obj);
    }
  }
  