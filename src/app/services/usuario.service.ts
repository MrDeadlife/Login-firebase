import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyAEtbOOT0C73QPyINd5wf5GHqzS_xCCvs8';
  userToken: string;
  /*sing up - Crear nuevo usuario
  https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
*/
  /* sign in - login
  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
*/
  constructor(private http: HttpClient) {}

  logOut() {
    localStorage.removeItem('token');
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          let token = resp['idToken'];
          console.log('Entro en el pipe');
          this.saveToken(resp['idToken']); //extraer el token y guardarlo con saveToken()
          console.log(token);
          return resp; //retornar el token
        })
      );
  }

  newUser(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      /*manera larga
      email: usuario.email,
      password:usuario.password,*/
      returnSecureToken: true,
    };
    console.log(authData);
    //enviando una peticion post (url,apikey,peiload (data del post) )
    return this.http
      .post(`${this.url}signUp?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          console.log('Entro en el pipe');
          console.log(resp['idToken']);
          this.saveToken(resp['idToken']); //extraer el token y guardarlo con saveToken()
          return resp; //retornar el token
        })
      );
  }

  saveToken(idtoken: string) {
    this.userToken = idtoken;
    localStorage.setItem('token', idtoken); //guardando el token en el storage

    //validar el token
    let tokenExpire = new Date(); //hora del log
    tokenExpire.setSeconds(3600); //hora de la fecha de la exp del token

    localStorage.setItem('expira', tokenExpire.getTime().toString());
  }
  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token'); //obteniendo el token llamado token
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  
  authenticated(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
