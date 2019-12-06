import { TarefasFormComponent } from './tarefas-form/tarefas-form.component';
import { TarefasListaComponent } from './tarefas-lista/tarefas-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TarefasListaComponent},
  { path: 'novo', component: TarefasFormComponent},
  { path: 'editar/:codigo', component: TarefasFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
