import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes?: Cliente[];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.clienteService.delete(cliente.id as number).subscribe(
            (response) => {
            this.clientes = this.clientes?.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              'Cliente eliminado con éxito!',
              'success'
            );
          });
        }
        {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
}
