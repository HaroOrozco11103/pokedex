import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiposComponent } from './pages/tipos/tipos.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';

const routes: Routes = [
  { path: '', component: TiposComponent },
  { path: 'tipos', redirectTo: '', pathMatch: 'full' },
  { path: 'pokemon', redirectTo: '', pathMatch: 'full' },
  { path: 'pokemon/:tipo', component: PokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
