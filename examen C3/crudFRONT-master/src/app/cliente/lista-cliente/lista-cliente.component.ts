import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/service/cliente.service';
//import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.lista().subscribe(
      data => {
        this.clientes = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.clienteService.delete(id).subscribe(
      data => {
        this.toastr.success('Cliente Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarClientes();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
}
