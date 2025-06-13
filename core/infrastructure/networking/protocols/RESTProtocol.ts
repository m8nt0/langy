// src/core/infrastructure/networking/protocols/RESTProtocol.ts
import { HTTPAdapter } from '../adapters/HTTPAdapter';

export class RESTProtocol {
  private http: HTTPAdapter;

  constructor(baseUrl: string) {
    this.http = new HTTPAdapter({
      baseUrl,
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async getTechObjects(filters?: any): Promise<any[]> {
    return await this.http.get('/api/tech-objects', filters);
  }

  async getTechObject(id: string): Promise<any> {
    return await this.http.get(`/api/tech-objects/${id}`);
  }

  async createTechObject(data: any): Promise<any> {
    return await this.http.post('/api/tech-objects', data);
  }

  async updateTechObject(id: string, data: any): Promise<any> {
    return await this.http.put(`/api/tech-objects/${id}`, data);
  }

  async deleteTechObject(id: string): Promise<void> {
    await this.http.delete(`/api/tech-objects/${id}`);
  }

  async getRelationships(objectId: string): Promise<any[]> {
    return await this.http.get(`/api/tech-objects/${objectId}/relationships`);
  }
}
