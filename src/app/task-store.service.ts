import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskModel } from './task-model';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})

export class TaskStoreService extends Subject<DataStateChangeEventArgs> {
  private apiUrl = 'https://angularapi.onrender.com';
  constructor(private http: HttpClient) {
    super();
  }

  public execute(state: any): any {
    if (state.requestType === 'expand') {
      state.childDataBind();
    } else {
      // let data;
      this.getAllTasks(state).subscribe(
        (x) => {
          // console.log({ x });
          // data = x;
          //@ts-ignore
          return super.next(x as DataStateChangeEventArgs)
        }
      );
      // return data;
    }
  }

  getAllTasks(state?: any): Observable<TaskModel[]> {
    return this.http
      .get<TaskModel[]>(`${this.apiUrl}/getAllTasks`, { headers: httpOption.headers })
      .pipe(
        map((response: any) => {
          console.log({ response });
          return <any> response
            // result:
            //   state.take > 0
            //     ? response.slice(state.skip, state.take)
            //     : response,
            // count: response.length,
          // };
        })
      );
  }

  setAllTasks(fd: any, state?: any): Observable<TaskModel[]> {
    return this.http
      .post<TaskModel[]>(`${this.apiUrl}/setAllTasks`, {data: fd}, { headers: httpOption.headers })
      .pipe(
        map((response: any) => {
          console.log({ response });
          return <any> response
            // result:
            //   state.take > 0
            //     ? response.slice(state.skip, state.take)
            //     : response,
            // count: response.length,
          // };
        })
      );
  }
}
