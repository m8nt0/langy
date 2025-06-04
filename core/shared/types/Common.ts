// Common type definitions like UUID, Metadata, etc

export type UUID = string;

export type Timestamp = number;

export interface Description {
  // Basically a description of the tech object
  narrative: string;
  // A viewer applied filter specific to the tech object
  viewerFilter: string;
  // An Api to my other application that visualizes code
  codeVisualization: string;
}

export interface Identifiable {
  id: UUID;
}

export interface Named {
  name: string;
}

export interface Versioned {
  version: string;
  previousVersion?: string;
}

export interface Taggable {
  tags: string[];
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Result<T, E = Error> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

export interface PaginationParams {
  page: number;
  pageSize: number;
  totalItems?: number;
  totalPages?: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export type QueryParams = {
  pagination?: PaginationParams;
  sort?: SortParams[];
  filters?: Record<string, any>;
}; 