import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonClient } from "pokenode-ts";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  tipo: string;
  tipos: any[] = [];
  pokemon: any[] = [];
  tarjetaActual: any = [];
  mostrarMovimientos = false;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.tipo = this.route.snapshot.params["tipo"];
  }

  ngOnInit(): void {
    this.cargarPokemon();
    this.cargarTipos();
  }

  cargarPokemon() {
    (async () => {
      const api = new PokemonClient();

      await api.getTypeByName(this.tipo).then((data) => {
          (async () => {
            const apiPoke = new PokemonClient();

            for(let pokes of data.pokemon) {
              await apiPoke.getPokemonByName(pokes.pokemon.name).then((poke) => {
                this.pokemon.push(poke);
              });
            }
            this.pokemon.sort((a, b) => a.name.localeCompare(b.name));
          })();
      });
    })();
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
        })();
      });
    })();
  }

  tarjetaPokemon(nombre: string, content: any) {
    this.mostrarMovimientos = false;
    (async () => {
      const api = new PokemonClient();

      await api.getPokemonByName(nombre).then((poke) => {
        let shiny = Math.random() * (6 - 1) + 1;
        this.tarjetaActual = [];
        if (Math.floor(shiny) == 1) this.tarjetaActual = { "nombre": poke.name, "peso": poke.weight, "tipo": poke.types, "imagen": poke.sprites.front_shiny, "movimientos": poke.moves, "shiny": true };
        else this.tarjetaActual = { "nombre": poke.name, "peso": poke.weight, "tipo": poke.types, "imagen": poke.sprites.front_default, "movimientos": poke.moves };

        this.modalService.open(content, { centered: true, size: 'lg' });
      });
    })();
  }

  tipoEspanol(tipo: string) {
    for(let t of this.tipos) {
      if(tipo == t.name) return t.nombre;
    }
  }
}
