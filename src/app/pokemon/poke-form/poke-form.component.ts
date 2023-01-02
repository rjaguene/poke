import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-poke-form',
  templateUrl: './poke-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})

export class PokeFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  pokemons: Observable<Pokemon[]>;

  types: string[];
  isAddForm: boolean;
  // pokemonTypeList

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getPokeTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type)
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked
    if (isChecked) {
      this.pokemon.types.push(type)
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.slice(index, 1)
    }
  }

  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemons', pokemon.id]));
      this.router.navigate(['/pokemons',this.pokemon.id])
     // window.location.reload();
    } else {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]));
    }
  }





  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false
    }
    if (this.pokemon.types.length > 2 && this.hasType(type)) {
      return false
    }

    return true
  }
}