import {Injectable} from '@angular/core';

@Injectable()
export class MemoryLocalStorage implements Storage {

  items: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.items).length;
  }

  getItem(key: string): string | null {
    return this.items[key] || null;
  }

  setItem(key: string, value: string) {
    this.items[key] = value;
  }

  clear() {
    this.items = {};
  }

  removeItem(key: string) {
    delete this.items[key];
  }

  key(index: number): string | null {
    if (index > this.length) {
      return null;
    }
    const key = Object.keys(this.items)[index];
    return this.items[key] || null;
  }
}
