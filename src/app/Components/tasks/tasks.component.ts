import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  todos: Todo[] = [];
  newTodoName: string;
  newTodoDesc: string;
  session:any;

  constructor() {}

  ngOnInit(): void {
    this.loadTodosOnLocalStorage();
  }

  saveTodo(){
    //Count length of the todo list so it cant get bigger than just 8 elements
    if(this.todos.length >= 8){
      alert('There are to many tasks stored... sorry but this is just a demo app');
      return;
    }

    //Check if there are no empty fields
    if(this.newTodoName && this.newTodoDesc){
      let todo = new Todo();

      todo.name = this.newTodoName;
      todo.description = this.newTodoDesc;
      todo.isCompleted = true;

      this.todos.push(todo);
      
      //Update localstorage
      localStorage.setItem('session', JSON.stringify(this.todos));

      this.newTodoName = '';
      this.newTodoDesc = '';
    }else{
      alert('Plese enter all the values');
    }
  }

  completeTodo(id:number){
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    //Update localstorage
    localStorage.setItem('session', JSON.stringify(this.todos));
  }

  remove(id:number){
    this.todos = this.todos.filter((v,i) => i !== id);
    //Update localstorage
    localStorage.setItem('session', JSON.stringify(this.todos));
  }

  //Load the todos that are already stored into localStorage
  loadTodosOnLocalStorage(){
    let dataOnSession:any = localStorage.getItem('session');

    this.session = JSON.parse(dataOnSession);
    
    //Loop to add each element to the todo list
    for (var i = 0; i < this.session.length; i++){
     this.todos.push(this.session[i]);
    }
  }
}
