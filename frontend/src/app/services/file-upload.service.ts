import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UploadResult } from '../models/UploadResult';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  upload(form: any, image: Blob) {
    const formData = new FormData();
    formData.set('comments', form['comments'])
    formData.append('file', image)

    return lastValueFrom(this.http.post<UploadResult>('/api/upload', formData));
  }

  getImage(id: string) {
    return lastValueFrom(this.http.get<UploadResult>(`/api/image/${id}`));
  }
}
