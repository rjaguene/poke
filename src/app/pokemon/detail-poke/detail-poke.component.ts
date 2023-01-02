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
    console.log(pokeId)
    if (pokeId) {
      this.pokemonService.getPokemonById(pokeId).subscribe(poke => this.poke = poke)
      console.log(this.poke)
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

  deletePokemon(pokemon: Pokemon): void {
    if (pokemon.id) {
      this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => {
        // Redirigez l'utilisateur vers la liste des pokemons après avoir supprimé le pokemon
        this.router.navigate(['/pokemons']);
      });
    }
  }
  
  addPokemon(pokemon: Pokemon){
    this.pokemonService.addPokemon(pokemon)
    .subscribe(() =>this.router.navigate(['/pokemons', pokemon.id]))
  }
}
