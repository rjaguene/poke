import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h2>
      add-pokemon
</h2>
<app-poke-form [pokemon]="pokemon"></app-poke-form>
  `
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;
  ngOnInit() {
    this.pokemon = new Pokemon();
  }
}
