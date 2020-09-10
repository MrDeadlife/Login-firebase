import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
//***  para utilizar los ngmodules en los input ****
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent, 
    RegistroComponent],
  exports: [
    HomeComponent,
    LoginComponent,
    RegistroComponent],
  imports: [
    CommonModule,
    FormsModule],
})
export class SharedModule {}
