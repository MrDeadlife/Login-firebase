import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; //usar alertas con estilos

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: UsuarioService, private router: Router) {}

  ngOnInit(): void {}
  salir() {
    Swal.fire({
      //alertas con estilos
      text: 'Hasta la proxima!',
    });
    setTimeout(() => {
      Swal.close();
      this.auth.logOut();
      this.router.navigateByUrl('/login');
    },400);
  }
}
