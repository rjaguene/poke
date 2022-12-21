import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { POKEMONS } from './mock-pokemons';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){}

  getPokemonList(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
        tap((res) => this.log(res)),
        catchError((err) => this.handleErr(err, []))
    );
  }

  getPokemonById(pokemonId : number):  Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleErr(err, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable< null > {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleErr(err, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((res) =>this.log(res)),
      catchError((err) => this.handleErr(err, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((res) =>this.log(res)),
      catchError((err) => this.handleErr(err, null))
    );
  }

  private log(response: any){
    console.table(response)
  }

  private handleErr(err: Error, errorValue: any){
    console.error(err);
    return of(errorValue);

  }

  getPokeTypeList(): string[] {
    const tab = POKEMONS.find(poke => poke.types)
    return []
  }
}