import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environmentapp } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {

    private url = `${environmentapp.api}/api/v1/rest`;

    constructor(private http : HttpClient){}

    saveEmploye(utilisateur: Utilisateur): Observable<any> {
        return this.http.post<any>(`${this.url}/employes`,utilisateur);
    }

    getEmploye(): Observable<any> {
        return this.http.get<any>(`${this.url}/employes`);
    }

    deleteEmploye(utilisateurId: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/employes/${utilisateurId}`);
    }

}