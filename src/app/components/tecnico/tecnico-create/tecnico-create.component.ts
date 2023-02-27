import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
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

  constructor(private service: TecnicoService, private toast: ToastrService) {}

  ngOnInit(): void {}

  create(): void {

    console.log('Cheguei aqui!');

    this.tecnico.cpf

    this.service.create(this.tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil, 1));
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
