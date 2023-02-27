import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  creds: Credenciais = {
    email: '',
    senha: '',
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(9));

  constructor(private toast: ToastrService, private service: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: (resposta) => {
        this.service.successfulLogin(resposta.headers.get('Authorization').substring(7)) // => Retirar o "Bearer "
        this.router.navigate(['']);
      },
      error: () => {
      this.toast.error('Usuário e/ou senha inválidos!')
      }
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
