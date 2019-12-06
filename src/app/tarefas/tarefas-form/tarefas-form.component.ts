import { AlertModalService } from './../../shared/alert-modal.service';
import { DropdownService } from './../../status/dropdown.service';
import { TarefasService } from './../tarefas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStatus } from 'src/app/status/status';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarefas-form',
  templateUrl: './tarefas-form.component.html',
  styleUrls: ['./tarefas-form.component.scss']
})
export class TarefasFormComponent implements OnInit {

form: FormGroup;
submitted = false;
statusList: IStatus[];


  constructor(
    private fb: FormBuilder,
    private service: TarefasService,
    private dropdownService: DropdownService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['codigo'];
        if( id != null ){
          const tarefa$ = this.service.loadByID(id);
          tarefa$.subscribe(tarefa => {
            this.updateForm(tarefa);
          });
        }
      }
    );

    this.dropdownService.getStatus().subscribe(dados => this.statusList = dados);

    this.form = this.fb.group({
      codigo: [null],
      titulo: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      status: ['ABERTO'],
      descricao: [null, [Validators.maxLength(250)]],
      dataCriacao: [null],
      dataEdicao: [null],
      dataRemocao: [null],
      dataConclusao: [null]
    });

  }

  updateForm ( tarefa ) {
    this.form.patchValue({
      codigo: tarefa.codigo,
      titulo: tarefa.titulo,
      status: tarefa.status,
      descricao: tarefa.descricao,
      dataCriacao: tarefa.dataCriacao,
      dataEdicao: tarefa.dataEdicao,
      dataRemocao: tarefa.dataRemocao,
      dataConclusao: tarefa.dataConclusao
    });  
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      if( this.form.value.codigo != null){
        this.updateTarefa();
      } else {
        this.createTarefa();
      }
    }
  }

  createTarefa(){
    this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Tarefa cadastrada com sucesso!');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao tentar cadastrar nova tarefa, contate o desenvolvedor'),
        () => console.log('Request completo')
      );
  }

  updateTarefa(){
    console.log('Fazendo update')
    this.service.update(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Tarefa atualizada com sucesso!');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao tentar atualizar nova tarefa, contate o desenvolvedor'),
        () => console.log('Request completo')
      );
  }

  onCancel() {
    this.location.back();
  }

}
