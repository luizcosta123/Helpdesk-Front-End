import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css'],
})
export class ChamadoUpdateComponent implements OnInit {
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

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

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.chamado.id = this.route.snapshot.paramMap.get('id'); // Acessa a URL e pega o parâmetro especificado (id)
    this.findById();
  }

  update(): void {
    this.chamadoService.update(this.chamado).subscribe({
      next: (resposta) => {
        this.toastrService.success(
          'Chamado atualizado com sucesso!',
          'Chamado atualizado!'
        );
        this.router.navigate(['chamados']);
      },
      error: (API_Error) => {
        this.toastrService.error(
          'Não foi possível atualizar o chamado',
          'Erro ao atualizar o chamado!'
        );
        this.toastrService.error(API_Error.error.error);
      },
    });
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

  findAllClientes(): void {
    this.clienteService.findAll().subscribe({
      next: (resposta) => {
        this.clientes = resposta;
      },
      error: () => {
        this.toastrService.error(
          'Não foi possível carregar as informações dos clientes!',
          'Erro ao carregar clientes'
        );
      },
    });
  }
  
  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe({
      next: (resposta) => {
        this.tecnicos = resposta;
      },
      error: () => {
        this.toastrService.error(
          'Não foi possível carregar as informações dos técnicos!',
          'Erro ao carregar técnicos'
        );
      },
    });
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

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacoes.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    );
  }
}
