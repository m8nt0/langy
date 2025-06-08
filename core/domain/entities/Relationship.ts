export class Relationship {
  private readonly id: string;
  private readonly sourceId: string;
  private readonly targetId: string;
  private readonly type: string; // e.g. 'dependency', 'similarity', 'versionLink'

  constructor(id: string, sourceId: string, targetId: string, type: string) {
    this.id = id;
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.type = type;
  }

  public getId(): string {
    return this.id;
  }

  public getSourceId(): string {
    return this.sourceId;
  }

  public getTargetId(): string {
    return this.targetId;
  }

  public getType(): string {
    return this.type;
  }
}
