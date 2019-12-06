import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TarefasRoutingModule } from './tarefas-routing.module';
import { TarefasListaComponent } from './tarefas-lista/tarefas-lista.component';
import { TarefasFormComponent } from './tarefas-form/tarefas-form.component';

@NgModule({
  declarations: [TarefasListaComponent, TarefasFormComponent],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    ReactiveFormsModule
  ]
})
export class TarefasModule { }
