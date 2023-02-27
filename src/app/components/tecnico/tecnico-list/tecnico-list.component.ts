import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent {

  ELEMENT_DATA: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tecnicoService: TecnicoService, private toastrService: ToastrService) { }

  ngOnInit(): void { // Toda vez que iniciar o componente
    this.findAll();
  }

  findAll() {
    this.tecnicoService.findAll().subscribe({
      next: (resposta) => {
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Tecnico>(resposta);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toastrService.error('Não foi possível carregar as informações dos técnicos!', 'Erro ao carregar técnicos');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
