import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // <-- IMPORTANTE: Adicione este import

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  private apiUrl = 'https://bim-detector-default-rtdb.firebaseio.com/status.json';

  constructor(private http: HttpClient) { }

  getRoomLogs(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(dadosBrutos => {
        console.log('--- 1. DADOS BRUTOS CHEGANDO DA API DO FIREBASE ---');
        console.log(dadosBrutos);
      })
    );
  }
}