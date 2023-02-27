import { ChamadoService } from './../../../services/chamado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from './../../../models/chamado';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css'],
})
export class ChamadoListComponent {
  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = [
    'id',
    'dataAbertura',
    'dataFechamento',
    'prioridade',
    'status',
    'titulo',
    'nomeTecnico',
    'nomeCliente',
    'acoes'
  ];

  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private chamadoService: ChamadoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    // Toda vez que iniciar o componente
    this.findAll();
  }

  findAll() {
    this.chamadoService.findAll().subscribe({
      next: (resposta) => {
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Chamado>(resposta);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toastrService.error(
          'Não foi possível carregar as informações dos chamados!',
          'Erro ao carregar chamados'
        );
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status: any): void {
    let list: Chamado[] = [];

    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status) {
        list.push(element);
      }
    });

    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }
  
}
