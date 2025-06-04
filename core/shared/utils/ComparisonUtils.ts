// Object comparison utilities

import { TechObject } from '../../domain/entities/TechObject';
import { Version } from '../../domain/entities/Version';

export class ComparisonUtils {
  static compareVersions(v1: Version, v2: Version): number {
    const v1Parts = [v1.getMajor(), v1.getMinor(), v1.getPatch()];
    const v2Parts = [v2.getMajor(), v2.getMinor(), v2.getPatch()];

    for (let i = 0; i < 3; i++) {
      if (v1Parts[i] !== v2Parts[i]) {
        return v1Parts[i] - v2Parts[i];
      }
    }

    return 0;
  }

  static compareObjects(obj1: TechObject, obj2: TechObject): ObjectDifference[] {
    const differences: ObjectDifference[] = [];

    // Compare basic properties
    if (obj1.getName() !== obj2.getName()) {
      differences.push({
        field: 'name',
        oldValue: obj1.getName(),
        newValue: obj2.getName(),
        type: 'PROPERTY'
      });
    }

    if (obj1.getType() !== obj2.getType()) {
      differences.push({
        field: 'type',
        oldValue: obj1.getType(),
        newValue: obj2.getType(),
        type: 'PROPERTY'
      });
    }

    // Compare metadata
    const metadata1 = obj1.getDescription();
    const metadata2 = obj2.getDescription();
    const allMetadataKeys = new Set([
      ...Object.keys(metadata1),
      ...Object.keys(metadata2)
    ]);

    for (const key of allMetadataKeys) {
      if (!this.deepEqual(metadata1[key], metadata2[key])) {
        differences.push({
          field: `metadata.${key}`,
          oldValue: metadata1[key],
          newValue: metadata2[key],
          type: 'METADATA'
        });
      }
    }

    return differences;
  }

  static deepEqual(a: any, b: any): boolean {
    if (a === b) return true;

    if (
      typeof a !== 'object' ||
      typeof b !== 'object' ||
      a === null ||
      b === null
    ) {
      return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!this.deepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  static calculateSimilarity(obj1: TechObject, obj2: TechObject): number {
    let score = 0;
    let totalWeight = 0;

    // Name similarity (weight: 0.3)
    const nameWeight = 0.3;
    score += this.calculateStringSimilarity(obj1.getName(), obj2.getName()) * nameWeight;
    totalWeight += nameWeight;

    // Type match (weight: 0.2)
    const typeWeight = 0.2;
    score += (obj1.getType() === obj2.getType() ? 1 : 0) * typeWeight;
    totalWeight += typeWeight;

    // Level match (weight: 0.2)
    const levelWeight = 0.2;
    score += (obj1.getAbstractionLevel() === obj2.getAbstractionLevel() ? 1 : 0) * levelWeight;
    totalWeight += levelWeight;

    // Metadata similarity (weight: 0.3)
    const metadataWeight = 0.3;
    const metadata1 = obj1.getDescription();
    const metadata2 = obj2.getDescription();
    const metadataSimilarity = this.calculateMetadataSimilarity(metadata1, metadata2);
    score += metadataSimilarity * metadataWeight;
    totalWeight += metadataWeight;

    return score / totalWeight;
  }

  private static calculateStringSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    if (!str1 || !str2) return 0;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const longerLength = longer.length;

    if (longerLength === 0) return 1;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longerLength - editDistance) / longerLength;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[str1.length][str2.length];
  }

  private static calculateMetadataSimilarity(
    metadata1: Record<string, any>,
    metadata2: Record<string, any>
  ): number {
    const keys1 = Object.keys(metadata1);
    const keys2 = Object.keys(metadata2);
    const allKeys = new Set([...keys1, ...keys2]);

    if (allKeys.size === 0) return 1;

    let matchingKeys = 0;
    for (const key of allKeys) {
      if (this.deepEqual(metadata1[key], metadata2[key])) {
        matchingKeys++;
      }
    }

    return matchingKeys / allKeys.size;
  }
}

interface ObjectDifference {
  field: string;
  oldValue: any;
  newValue: any;
  type: 'PROPERTY' | 'METADATA';
} 