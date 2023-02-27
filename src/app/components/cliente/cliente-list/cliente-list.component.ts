import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent {

  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clienteService: ClienteService, private toastrService: ToastrService) { }

  ngOnInit(): void { // Toda vez que iniciar o componente
    this.findAll();
  }

  findAll() {
    this.clienteService.findAll().subscribe({
      next: (resposta) => {
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Cliente>(resposta);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toastrService.error('Não foi possível carregar as informações dos clientes!', 'Erro ao carregar clientes');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
