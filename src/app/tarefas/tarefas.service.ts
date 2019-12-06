import { environment } from './../../environments/environment';
import { ITarefa } from './tarefa';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private readonly API = `${environment.API}tarefas`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ITarefa[]>(this.API).pipe(take(1));
  }

  deletedList() {
    return this.http.get<ITarefa[]>(this.API+ '?deleted').pipe(take(1));
  }

  loadByID(id){
    return this.http.get(this.API + '/' + id ).pipe(take(1));
  }

  create(tarefa) {
    return this.http.post(this.API, tarefa).pipe(take(1));
  }

  update(tarefa) {
    return this.http.put(this.API + '/' + tarefa.codigo, tarefa).pipe(take(1));
  }

  delete(id) {
    console.log('Esta entrando no metodo com o codigo ' + id);
    console.log('Chamando api com url ' + this.API + '/' + id);
    return this.http.delete(this.API + '/' + id).pipe(take(1));
  }
}
