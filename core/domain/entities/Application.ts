import { TechObject, TechObjectType, TechObjectMetadata, AbstractionLevel } from './TechObject';
import { Version } from './Version';
import { Relationship } from './Relationship';

export interface ApplicationMetadata extends TechObjectMetadata {
  category: ApplicationCategory;
  stack: TechStack;
  deployment: DeploymentInfo;
  security: SecurityFeatures;
  performance: ApplicationPerformanceMetrics;
  scalability: ScalabilityInfo;
  monitoring: MonitoringTools;
  businessMetrics: BusinessMetrics;
}

export enum ApplicationCategory {
  ENTERPRISE = 'ENTERPRISE',
  CONSUMER = 'CONSUMER',
  MOBILE = 'MOBILE',
  WEB = 'WEB',
  DESKTOP = 'DESKTOP',
  IOT = 'IOT',
  AI = 'AI',
  BLOCKCHAIN = 'BLOCKCHAIN',
  SAAS = 'SAAS',
  GAMING = 'GAMING'
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  devops: string[];
  thirdPartyServices: string[];
}

export interface DeploymentInfo {
  platforms: string[];
  environments: string[];
  containerization: string[];
  orchestration: string[];
  cicd: string[];
  costs: Record<string, number>;
}

export interface SecurityFeatures {
  authentication: string[];
  authorization: string[];
  encryption: string[];
  compliance: string[];
  securityTools: string[];
  lastAudit?: Date;
}

export interface ApplicationPerformanceMetrics {
  averageResponseTime: number;
  peakResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  uptime: number;
  resourceUtilization: ResourceMetrics;
}

export interface ResourceMetrics {
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  costs: number;
}

export interface ScalabilityInfo {
  currentUsers: number;
  maxUsers: number;
  scalingStrategy: string[];
  loadBalancing: string[];
  dataSharding: boolean;
  caching: string[];
}

export interface MonitoringTools {
  apm: string[];
  logging: string[];
  alerting: string[];
  dashboards: string[];
  errorTracking: string[];
}

export interface BusinessMetrics {
  monthlyActiveUsers: number;
  customerSatisfaction: number;
  revenue: number;
  churnRate: number;
  costPerUser: number;
  lifetimeValue: number;
}

export class Application extends TechObject {
  private applicationMetadata: ApplicationMetadata;

  constructor(
    id: string,
    name: string,
    description: string,
    version: Version,
    metadata: ApplicationMetadata,
    relationships: Relationship[]
  ) {
    super(
      id,
      name,
      description,
      TechObjectType.APPLICATION,
      version,
      metadata,
      relationships,
      AbstractionLevel.LEVEL_4
    );
    this.applicationMetadata = metadata;
  }

  // Application-specific getters
  getCategory(): ApplicationCategory {
    return this.applicationMetadata.category;
  }

  getTechStack(): TechStack {
    return { ...this.applicationMetadata.stack };
  }

  getDeploymentInfo(): DeploymentInfo {
    return { ...this.applicationMetadata.deployment };
  }

  getSecurityFeatures(): SecurityFeatures {
    return { ...this.applicationMetadata.security };
  }

  getPerformanceMetrics(): ApplicationPerformanceMetrics {
    return { ...this.applicationMetadata.performance };
  }

  getScalabilityInfo(): ScalabilityInfo {
    return { ...this.applicationMetadata.scalability };
  }

  getMonitoringTools(): MonitoringTools {
    return { ...this.applicationMetadata.monitoring };
  }

  getBusinessMetrics(): BusinessMetrics {
    return { ...this.applicationMetadata.businessMetrics };
  }

  // Application-specific setters
  setCategory(category: ApplicationCategory): void {
    this.applicationMetadata.category = category;
  }

  updateTechStack(stack: Partial<TechStack>): void {
    this.applicationMetadata.stack = {
      ...this.applicationMetadata.stack,
      ...stack
    };
  }

  updateDeploymentInfo(info: Partial<DeploymentInfo>): void {
    this.applicationMetadata.deployment = {
      ...this.applicationMetadata.deployment,
      ...info
    };
  }

  updateSecurityFeatures(features: Partial<SecurityFeatures>): void {
    this.applicationMetadata.security = {
      ...this.applicationMetadata.security,
      ...features
    };
  }

  updatePerformanceMetrics(metrics: Partial<ApplicationPerformanceMetrics>): void {
    this.applicationMetadata.performance = {
      ...this.applicationMetadata.performance,
      ...metrics
    };
  }

  updateScalabilityInfo(info: Partial<ScalabilityInfo>): void {
    this.applicationMetadata.scalability = {
      ...this.applicationMetadata.scalability,
      ...info
    };
  }

  updateMonitoringTools(tools: Partial<MonitoringTools>): void {
    this.applicationMetadata.monitoring = {
      ...this.applicationMetadata.monitoring,
      ...tools
    };
  }

  updateBusinessMetrics(metrics: Partial<BusinessMetrics>): void {
    this.applicationMetadata.businessMetrics = {
      ...this.applicationMetadata.businessMetrics,
      ...metrics
    };
  }

  // Override toJSON to include application-specific metadata
  toJSON(): object {
    return {
      ...super.toJSON(),
      applicationMetadata: {
        category: this.applicationMetadata.category,
        stack: this.applicationMetadata.stack,
        deployment: this.applicationMetadata.deployment,
        security: this.applicationMetadata.security,
        performance: this.applicationMetadata.performance,
        scalability: this.applicationMetadata.scalability,
        monitoring: this.applicationMetadata.monitoring,
        businessMetrics: this.applicationMetadata.businessMetrics
      }
    };
  }
} 