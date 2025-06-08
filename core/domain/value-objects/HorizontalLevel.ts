export type HorizontalLevelType = 'TechObject' | 'Major' | 'Minor' | 'Patch';

export class HorizontalLevel {
    private readonly level: HorizontalLevelType;
    
    constructor (level: HorizontalLevelType) {
        const allowedLevels = ['TechObject', 'Major', 'Minor', 'Patch']
        if (!allowedLevels.includes(level)) {
            throw new Error(`Invalid HorizontalLevel: ${level}`);
        }
        this.level = level;
    }

    public getLevel(): string {
        return this.level;
    }

    public equal(other: HorizontalLevel): boolean {
        return this.level === other.level;
    }

    static level(level: 'TechObject' | 'Major' | 'Minor' | 'Patch') : HorizontalLevel {
        return new HorizontalLevel(level);
    }
}