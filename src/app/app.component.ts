import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './pokemon/mock-pokemons';
import { Pokemon } from './pokemon/pokemon';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  pokeList: Pokemon[] = POKEMONS;
  pokeSelected: Pokemon | undefined;

  ngOnInit() {
    //this.selectPoke(this.pokeList[0]);
  }

  selectPoke(poke: string) {
    //    const i: number = +(e.target as HTMLInputElement).value
    const pokeFind: Pokemon | undefined = this.pokeList.find(pokeFind => pokeFind.id == +poke)
    if (pokeFind) {
      console.log(pokeFind.name)
      this.pokeSelected = pokeFind
    } else {
     this.pokeSelected = pokeFind
    }
  }
}