import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NasaData, NasaDataParams } from '../../../models/nasa.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private apiUrl = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) { }

  getImages(params?: NasaDataParams): Observable<NasaData[]> {
    return this.http.get<NasaData[]>(this.apiUrl, {
      params: {
        api_key: environment.nasaApiKey,
        ...params
      }
    });
  }
}
