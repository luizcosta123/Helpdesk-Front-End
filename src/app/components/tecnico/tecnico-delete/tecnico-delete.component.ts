import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent {
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe({
      next: (resposta) => {
        resposta.perfis = []
        this.tecnico = resposta
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
    this.service.delete(this.tecnico.id).subscribe({
      next: (resposta) => {
        this.toast.success('Técnico deletado com sucesso!', 'Delete')
        this.router.navigate(['tecnicos'])
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
