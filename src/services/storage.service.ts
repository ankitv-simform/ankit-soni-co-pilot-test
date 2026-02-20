import * as fs from 'fs';
import * as path from 'path';

export class StorageService<T> {
  private filePath: string;
  private data: Map<string, T>;

  constructor(fileName: string) {
    const dataDir = path.join(__dirname, '../../data');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    this.filePath = path.join(dataDir, fileName);
    this.data = new Map();
    this.loadFromFile();
  }

  private loadFromFile(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        const parsedData = JSON.parse(fileContent);
        this.data = new Map(Object.entries(parsedData));
      }
    } catch (error) {
      console.error('Error loading data from file:', error);
      this.data = new Map();
    }
  }

  private saveToFile(): void {
    try {
      const dataObject = Object.fromEntries(this.data);
      fs.writeFileSync(this.filePath, JSON.stringify(dataObject, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving data to file:', error);
      throw new Error('Failed to save data');
    }
  }

  public create(id: string, item: T): T {
    this.data.set(id, item);
    this.saveToFile();
    return item;
  }

  public findAll(): T[] {
    return Array.from(this.data.values());
  }

  public findById(id: string): T | undefined {
    return this.data.get(id);
  }

  public update(id: string, item: T): T | undefined {
    if (!this.data.has(id)) {
      return undefined;
    }
    this.data.set(id, item);
    this.saveToFile();
    return item;
  }

  public delete(id: string): boolean {
    const result = this.data.delete(id);
    if (result) {
      this.saveToFile();
    }
    return result;
  }

  public exists(id: string): boolean {
    return this.data.has(id);
  }
}
