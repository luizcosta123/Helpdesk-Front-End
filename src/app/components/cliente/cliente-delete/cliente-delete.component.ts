import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(private service: ClienteService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
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

  delete(): void {
    this.service.delete(this.cliente.id).subscribe({
      next: (resposta) => {
        this.toast.success('Cliente deletado com sucesso!', 'Delete')
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

}
