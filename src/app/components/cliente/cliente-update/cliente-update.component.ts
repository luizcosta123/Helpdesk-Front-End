import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

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

  constructor(private service: ClienteService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id'); // Acessa a URL e pega o parâmetro especificado (id)
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe({
      next: (resposta) => {
        resposta.perfis = []
        this.cliente = resposta
      },
      error: (error_API) => {
        if(error_API.error.errors) {
          error_API.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(error_API.error.message);
        }
      }
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe({
      next: () => {
        this.toast.success('Cliente atualizado com sucesso!', 'Atualização');
        this.router.navigate(['clientes'])
      },
      error: (error_API) => {
        if(error_API.error.errors) {
          error_API.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(error_API.error.message);
        }
      }
    })
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
