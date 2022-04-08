import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postQuestion(data : any){
    return this.http.post<any>("http://localhost:3000/QuestionList/",data);
  }
  getQuestion(){
    return this.http.get<any>("http://localhost:3000/QuestionList/");
  }
  putQuestion(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/QuestionList/"+id, data);
  }
  deleteQuestion(id:number){
    return this.http.delete<any>("http://localhost:3000/QuestionList/"+id);
  }
}
