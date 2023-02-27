import { Router } from '@angular/router';
import { Cliente } from './../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(9));

  constructor(private service: ClienteService, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.cliente).subscribe({
      next: () => {
        this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['clientes'])
      },
      error: (error_API) => {
        console.log(error_API);
        if(error_API.error.errors) {
          error_API.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(error_API.error.message);
        }
      },
    });
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil, 1));
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
