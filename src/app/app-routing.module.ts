import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tarefas'},
  {path: 'tarefas', loadChildren: './tarefas/tarefas.module#TarefasModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
