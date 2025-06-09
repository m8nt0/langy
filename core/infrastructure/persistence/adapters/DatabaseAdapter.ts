// src/core/infrastructure/persistence/adapters/DatabaseAdapter.ts

export interface DatabaseAdapter {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query<T>(sql: string, params?: any[]): Promise<T[]>;
    insert<T>(table: string, data: T): Promise<string>;
    update<T>(table: string, id: string, data: Partial<T>): Promise<void>;
    delete(table: string, id: string): Promise<void>;
    transaction<T>(operations: () => Promise<T>): Promise<T>;
}

export class PostgreSQLAdapter implements DatabaseAdapter {
    private client: any;
    private config: any;

    constructor(config: any) {
        this.config = config;
    }

    async connect(): Promise<void> {
        const { Pool } = await import('pg');
        this.client = new Pool(this.config);
    }

    async disconnect(): Promise<void> {
        await this.client?.end();
    }

    async query<T>(sql: string, params?: any[]): Promise<T[]> {
        const result = await this.client.query(sql, params);
        return result.rows;
    }

    async insert<T>(table: string, data: T): Promise<string> {
        const keys = Object.keys(data as any);
        const values = Object.values(data as any);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING id`;
        const result = await this.client.query(sql, values);
        return result.rows[0].id;
    }

    async update<T>(table: string, id: string, data: Partial<T>): Promise<void> {
        const keys = Object.keys(data as any);
        const values = Object.values(data as any);
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

        const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1}`;
        await this.client.query(sql, [...values, id]);
    }

    async delete(table: string, id: string): Promise<void> {
        await this.client.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    }

    async transaction<T>(operations: () => Promise<T>): Promise<T> {
        const client = await this.client.connect();
        try {
            await client.query('BEGIN');
            const result = await operations();
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}