import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Nuevo cliente',
        `Cliente ${cliente.nombre} creado con éxito`,
        'success'
      );
    });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Cliente Actualizado',
        `Cliente ${cliente.nombre} actualizado con éxito`,
        'success'
      );
    });
  }
}
