import {Injectable} from '@angular/core';
import {MemoryLocalStorage} from './memory-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage implements Storage {

  private readonly _storage: Storage;

  get window(): Window {
    try {
      return window;
    } catch (e) {
      return null;
    }
  }

  constructor() {
    if (this.window && this.window.hasOwnProperty('localStorage')) {
      this._storage = window.localStorage;
    } else {
      this._storage = new MemoryLocalStorage();
    }
  }

  get length(): number {
    return this._storage.length;
  }

  getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this._storage.setItem(key, value);
  }

  clear() {
    this._storage.clear();
  }

  removeItem(key: string) {
    this._storage.removeItem(key);
  }

  key(index: number): string | null {
    return this._storage.key(index);
  }
}
