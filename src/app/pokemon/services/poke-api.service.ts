import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {PokeAPIList, PokeAPIResult, Pokemon} from './poke-api.model';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  private get url(): string {
    return 'https://pokeapi.co/api/v2';
  }

  constructor(
    private http: HttpClient
  ) { }

  public getList(limit: number = 10): Observable<PokeAPIResult[]> {
    return this.http.get<PokeAPIList>(`${this.url}/pokemon?limit=${limit.toString(10)}`)
      .pipe(
        map((list: PokeAPIList): PokeAPIResult[] => list.results),
      );
  }

  public getById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/pokemon/${id}`);
  }

}
