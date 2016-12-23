import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CreateTodoService {
    constructor(private http: Http) { }

    addTodo(email, todo, category) { // Method : POST
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = { email: email, todo: todo, status: true, createdOn: "", category: category };
        return this.http.post("/todos", body, headers).map((res: Response) => res.json());
    }

    removeTodo(id) { // Method : DELETE
        return this.http.delete("/todos/" + id);
    }

    getTodos(email) { // Method : GET
        return this.http.get("/todos/" + email).map((res: Response) => res.json());
    }

    todoDone(id) { // Method : PUT
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = { id: id, status: true };
        return this.http.put("/todos", body, headers).map((res: Response) => res.json());
    }

    unDone(id) { // Method : PUT
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = { id: id, status: false };
        return this.http.put("/todos", body, headers).map((res: Response) => res.json());
    }

    editTodo(id, todo) { // Method : PUT
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = { id: id, todo: todo };
        return this.http.put("/editTodo", body, headers).map((res: Response) => res.json());
    }
}