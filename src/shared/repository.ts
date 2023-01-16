import provideUuid from './helpers/uuid';

class Repository<T extends { id?: string }> {
  entries: T[];

  constructor(entries: T[]) {
    this.entries = entries;
  }

  async getAll() {
    return this.entries;
  }

  async getById(id: string) {
    const entry = this.entries.find((item) => item.id === id);

    return entry;
  }

  async create(entry: T) {
    const uuid = provideUuid();

    const newEntry = {
      id: uuid,
      ...entry,
    };

    this.entries.push(newEntry);

    return newEntry;
  }

  async delete(id: string) {
    const updatedEntries = this.entries.filter((item) => item.id !== id);
    this.entries = updatedEntries;
  }

  async update(id: string, body: T) {
    const entry = this.entries.find((item) => item.id === id);
    const updatedEntry = {
      id: entry?.id,
      ...body,
    };

    const entryIndex = this.entries.indexOf(entry as T);

    this.entries.splice(entryIndex, 1, updatedEntry);

    return updatedEntry;
  }
}

export default Repository;
