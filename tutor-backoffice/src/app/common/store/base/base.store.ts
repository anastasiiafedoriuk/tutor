import {Injectable, NgZone} from '@angular/core';
import {distinctUntilChanged, filter, map, take, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {get} from 'lodash-es';

@Injectable()
export abstract class BaseStore<B> {

  abstract actions: unknown;

  constructor (protected readonly store: Store<Record<string, B>>,
                      protected readonly zone: NgZone) {}

  abstract get storeName(): string;

  selectRoot$(): Observable<B> {
    return this.store.select((state) => state[this.storeName]);
  }

  select$<T extends keyof B>(arg1: T): Observable<B[T]>;
  select$<T extends keyof B, K extends keyof B[T]>(arg1: T, arg2: K): Observable<B[T][K]>;
  select$<T extends keyof B, K extends keyof B[T], Z extends keyof B[T][K]>(arg1: T, arg2: K, arg3: Z): Observable<B[T][K][Z]>;
  select$(...args: string[]) {
    return this.selectRoot$()
      .pipe(filter(Boolean))
      .pipe(map(value => get(value, args)))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.zone.run(() => {})));
  }

  selectRoot(): B {
    let state: B;

    this.selectRoot$()
      .pipe(take(1))
      .subscribe(res => state = res);

    return state;
  }

  select<T extends keyof B>(arg1: T): B[T];
  select<T extends keyof B, K extends keyof B[T]>(arg1: T, arg2: K): B[T][K];
  select<T extends keyof B, K extends keyof B[T], Z extends keyof B[T][K]>(arg1: T, arg2: K, arg3: Z): B[T][K][Z];
  select(...args: string[]) {
    let state;

    this.selectRoot$()
      .pipe(map(value => get(value, args)))
      .pipe(take(1))
      .subscribe(res => state = res);

    return state;
  }

  dispatch(action: Action): void {
    this.zone.run(() => {
      this.store.dispatch(action);
    });
  }
}
