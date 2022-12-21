import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemons';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-poke',
  templateUrl: './detail-poke.component.html',
  styles: [
  ]
})
export class DetailPokeComponent implements OnInit {

  pokelist: Pokemon[];
  poke: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
     ) { }

  ngOnInit(): void {

    const pokeId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokeId) {
      this.pokemonService.getPokemonById(+pokeId).subscribe(poke => this.poke = poke)
    }else {
      this.poke = undefined;
    }
  }
  goBack() {
    this.router.navigate(['/'])
  }

  goTo(pokemon: Pokemon){
    this.router.navigate(['edit/pokemons', pokemon.id])
  }

  deletePokemon(pokemon: Pokemon){
    this.pokemonService.deletePokemonById(+pokemon.id)
      .subscribe(() => this.goBack())
  }

  addPokemon(pokemon: Pokemon){
    this.pokemonService.addPokemon(pokemon)
    .subscribe(() =>this.router.navigate(['pokemons', pokemon.id]))
  }
}
