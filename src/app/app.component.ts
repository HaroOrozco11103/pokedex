import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';

  constructor(
    private router: Router
  ) { }

  busqueda(f: NgForm) {
    console.log("XDDDD", f.value.tipo);
    this.router.navigate(["pokemon/" + f.value.tipo]).then(() => {
      document.location.reload();
    });
  }
}
