import {
    TechObjectId,
    VersionNumber,
    CompleteViewerData,
  } from '../../domain/value-objects';
  
  export interface TechObjectMetadataDto {
    name: string;
    description: string;
    official_doc: string;
  }
  
  export interface VersionDto {
    id: TechObjectId;
    version: VersionNumber;
    // metadata: TechObjectMetadataDto;
    children: VersionDto[];
    viewersData: CompleteViewerData
  }
  
  export interface TechObjectDto {
    id: string;
    name:string;
    level: number;
    versions: VersionDto[];
    // This is the critical change to align with your architecture
    viewersData: CompleteViewerData;
    // metadata: TechObjectMetadataDto;
  }