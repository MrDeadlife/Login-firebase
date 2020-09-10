import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgModel, NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'; //usar alertas con estilos
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordar: boolean = false;
  constructor(private auth: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  public login = (flogin: NgForm) => {
    if (flogin.invalid) {
      return;
    }
    Swal.fire({
      //alertas con estilos
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading(); //muestra un icono cargando
    setTimeout(() => {
      this.auth.logIn(this.usuario).subscribe(
        (resp) => {
          console.log(resp);
          Swal.close();
          if (this.recordar) {
            localStorage.setItem('email', this.usuario.email);
          }
          this.router.navigateByUrl('/home');
        },
        (err) => {
          Swal.fire({
            //alertas con estilos
            icon: 'error',
            title: 'Error al autenticar',
            text: err.error.error.message,
          });
          const error = err.error.error.message;
        }
      );
    }, 600);
  };
}
