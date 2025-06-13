// src/core/infrastructure/networking/protocols/GraphQLProtocol.ts
export class GraphQLProtocol {
    private endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
  
    async query(query: string, variables?: any): Promise<any> {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });
  
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
  
      return result.data;
    }
  
    async getTechObjects(filters?: any): Promise<any[]> {
      const query = `
        query GetTechObjects($filters: TechObjectFilters) {
          techObjects(filters: $filters) {
            id
            name
            type
            level
            versions {
              major
              minor
              patch
            }
          }
        }
      `;
      
      const result = await this.query(query, { filters });
      return result.techObjects;
    }
  }