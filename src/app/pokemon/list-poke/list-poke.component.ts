import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemons';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'app-list-poke',
  templateUrl: './list-poke.component.html',
  
})
export class ListPokeComponent implements OnInit {
  pokeList: Pokemon[];
  pokeSelected: Pokemon | undefined;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ){}

    ngOnInit(){
      this.pokemonService.getPokemonList().subscribe(pokeList => this.pokeList = pokeList)
    }

    ngOnDestroy(){
     // this.pokemonService.getPokemonList().unSubscribe()
    }
}

