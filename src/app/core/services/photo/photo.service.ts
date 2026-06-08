import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../../models/photo';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../tokens/api-base-url';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  loadPhotos(page: number, limit: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.base}/v2/list`, { params: { page, limit } });
  }

  getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.base}/id/${id}/info`);
  }
}
