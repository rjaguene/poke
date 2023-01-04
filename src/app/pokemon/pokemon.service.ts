import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { POKEMONS } from './mock-pokemons';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {
  

  constructor(private http: HttpClient, private router: Router) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('http://172.31.37.96:8080/api').pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleErr(err, []))
    );
  }

  getPokemonById(id: string): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`http://13.37.202.161:8080/api/${id}`).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleErr(err, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {

    pokemon.update = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('http://13.37.202.161:8080/api/save', pokemon, httpOptions).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleErr(err, null))
    );
  }

  
  deletePokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.delete<Pokemon>(`http://13.37.202.161:8080/api/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleErr(err, undefined))
    );
  }


  addPokemon(pokemon: Pokemon): Observable<Pokemon> {

    const id = Math.floor(Math.random() * (900 - 100 + 1)) + 100;

    pokemon.update = 1
    pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;    //pokemon.id = Math.random()

    let min = 1; // Valeur minimale
    let max = 10000; // Valeur maximale
    pokemon.id = Math.floor(Math.random() * (max - min + 1)) + min;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  
    return this.http.post<Pokemon>('http://13.37.202.161:8080/api/save', pokemon, httpOptions).pipe(
    tap((pokemon: Pokemon) => this.log(`added pokemon w/ id=${pokemon.id}`)),
    catchError((err) => this.handleErr(err, undefined))
    );
  }

  private log(response: any) {
    console.table(response)
  }

  private handleErr(err: Error, errorValue: any) {
    console.error(err);
    return of(errorValue);

  }

  getPokeTypeList(): string[] {
    const tab = POKEMONS.find(poke => poke.types)
    return []
  }
}