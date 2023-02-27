import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamentow: '',
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  };

  constructor(
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id'); // Acessa a URL e pega o parâmetro especificado (id)
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe({
      next: (resposta) => {
        this.chamado = resposta
      },
      error: (error_API) => {
        if(error_API.error.errors) {
          error_API.error.errors.forEach(element => {
            this.toastrService.error(element.message);
          });
        } else {
          this.toastrService.error(error_API.error.message);
        }
      }
    })
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'Aberto';
    } else if(status == '1') {
      return 'Em andamento';
    } else if(status == '2') {
      return 'Encerrado';
    }
    return 'Sem Status'
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'Baixa';
    } else if(prioridade == '1') {
      return 'Media';
    } else if(prioridade == '2') {
      return 'Alta';
    }
    return 'Sem Prioridade'
  }

}
