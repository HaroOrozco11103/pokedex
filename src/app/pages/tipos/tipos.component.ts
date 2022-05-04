import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonClient } from "pokenode-ts";

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent implements OnInit {
  tipos: any[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos() {
    (async () => {
      const api = new PokemonClient();

      await api.listTypes().then((types) => {
        (async () => {
          const apiEs = new PokemonClient();

          for(let tipo of types.results) {
            await apiEs.getTypeByName(tipo.name).then((tipos) => {
              this.tipos.push({ "name": tipo.name, "nombre": tipos.names[5].name });
            });
          }
          this.tipos.sort((a, b) => a.nombre.localeCompare(b.nombre)); //.sort((a, b) => (a.nombre < b.nombre ? -1 : 1))
        })();
      });
    })();
  }

  pokemonPorTipo(tipo: string) {
    this.router.navigate(["pokemon/" + tipo]);
  }
}
