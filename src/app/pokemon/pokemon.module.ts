import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListPokeComponent } from './list-poke/list-poke.component';
import { DetailPokeComponent } from './detail-poke/detail-poke.component';
import { PokeTypeColorPipe } from './poke-type-color.pipe';
import { PokemonService } from './pokemon.service';
import { PokeFormComponent } from './poke-form/poke-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { FormsModule } from '@angular/forms';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';

const routes: Routes = [
  {path: 'edit/pokemons/:id', component: EditPokemonComponent},
  {path: 'pokemons/add', component: AddPokemonComponent},
  {path: 'pokemons', component: ListPokeComponent},
  {path: 'pokemons/:id', component: DetailPokeComponent},
]

@NgModule({
  declarations: [
    PokeTypeColorPipe,
    ListPokeComponent,
    DetailPokeComponent,
    PokeFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PokemonService
  ]
})

export class PokemonModule { }
