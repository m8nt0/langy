// src/core/application/use-cases/tech-objects/GetTechObjectUseCase.ts
import { ITechObjectRepository } from '../../../domain/repositories/ITechObjectRepository';
import { TechObjectDto } from '../../dto/TechObjectDto';

export class GetTechObjectUseCase {
    constructor(private techObjectRepo: ITechObjectRepository) { }

    async execute(id: string): Promise<TechObjectDto> {
        const techObject = await this.techObjectRepo.findById(id);
        if (!techObject) throw new Error('TechObject not found');

        return {
            id: techObject.id.value,
            name: techObject.name,
            type: techObject.type,
            level: techObject.level.value,
            versions: techObject.versions.map(v => ({
                major: v.major,
                minor: v.minor,
                patch: v.patch,
                releaseDate: v.releaseDate.toISOString(),
                status: v.status
            })),
            metadata: {
                creator: techObject.metadata.creator,
                website: techObject.metadata.website,
                repository: techObject.metadata.repository,
                license: techObject.metadata.license,
                tags: techObject.metadata.tags,
                description: techObject.metadata.description
            },
            relationships: techObject.relationships.map(r => ({
                targetId: r.targetId,
                type: r.type,
                strength: r.strength
            })),
            content: {
                narrative: techObject.content.narrative,
                viewerData: techObject.content.viewerData,
                codeExamples: techObject.content.codeExamples
            }
        };
    }
}