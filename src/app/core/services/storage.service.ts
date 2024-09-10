import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem$(key: string): Observable<string | null> {
    return fromEvent(window, 'storage').pipe(
      startWith(null),
      map(() => localStorage.getItem(key)),
    );
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
