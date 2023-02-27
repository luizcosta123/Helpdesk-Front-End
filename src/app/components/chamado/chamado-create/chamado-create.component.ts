import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from './../../../services/chamado.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Tecnico } from 'src/app/models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css'],
})
export class ChamadoCreateComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe({
      next: (resposta) => {
        this.toastrService.success(
          'Chamado criado com sucesso!',
          'Chamado criado!'
        );
        this.router.navigate(['chamados']);
      },
      error: (API_Error) => {
        this.toastrService.error(
          'Não foi possível criar o chamado',
          'Erro ao criar o chamado!'
        );
        this.toastrService.error(API_Error.error.error);
      },
    });
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
