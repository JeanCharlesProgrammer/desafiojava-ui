import { AlertModalService } from './../../shared/alert-modal.service';
import { TarefasService } from './../tarefas.service';
import { Component, OnInit } from '@angular/core';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ITarefa } from '../tarefa';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tarefas-lista',
  templateUrl: './tarefas-lista.component.html',
  styleUrls: ['./tarefas-lista.component.scss'
]
})
export class TarefasListaComponent implements OnInit {

  tarefas: ITarefa[];

  tarefas$: Observable<ITarefa[]>;

  constructor(
    private service: TarefasService,
    private modal: AlertModalService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   // this.service.list().subscribe(data => this.tarefas = data );

   this.tarefas$ = this.service.list();
  }

  delete(tarefa: ITarefa) {
    this.service.delete(tarefa).subscribe(
        success => {
          this.modal.showAlertSuccess('Tarefa excluida com sucesso!');
          this.tarefas$ = this.service.list();
        },
        error => this.modal.showAlertDanger('Erro ao tentar excluir tarefa, contate o desenvolvedor'),
        () => console.log('Request completo')
        );
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  getTarefasExcluidas(){
    this.tarefas$ = this.service.list();
    console.log('Tarefas deletadas')
  }

  getTarefasAtivas(){
    this.tarefas$ = this.service.deletedList();
    console.log('Tarefas ativas')
  }

}
