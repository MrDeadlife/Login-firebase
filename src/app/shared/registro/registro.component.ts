import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'; //usar alertas con estilos
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  constructor(private auth: UsuarioService,
              private router:Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }
  onSubmit(formulario: NgForm) {
    if (formulario.invalid) {//si no estan completos los valores
      return;
    } 

    Swal.fire({
      //alertas con estilos
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading(); //muestra un icono cargando

    this.auth.newUser(this.usuario).subscribe(
      (resp) => {
        Swal.close();
        console.log(resp);
        this.router.navigateByUrl('/home')
      },
      (err) => {
        Swal.fire({ //alertas con estilos
          icon: 'error',
          title:'Error!',
          text: err.error.error.message,
        });
        const error = err.error.error.message;
      }
    );
  }
}
