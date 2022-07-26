import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  getUsers() {
    return this.http.get(`${this.baseUrl}users`);
  }

  getPosts() {
    return this.http.get(`${this.baseUrl}posts`);
  }

  getAlbums() {
    return this.http.get(`${this.baseUrl}albums`);
  }

  addPost(data: any) {
    return this.http.post(`${this.baseUrl}posts`, data);
  }

  getUser(id: number) {
    return this.http.get(`${this.baseUrl}users/${id}`);
  }

  getPost(id: number) {
    return this.http.get(`${this.baseUrl}posts/${id}`);
  }

  getCommentByPost(id: number) {
    return this.http.get(`${this.baseUrl}comments?postId=${id}`);
  }

  editPost(id: number, data: any) {
    return this.http.put(`${this.baseUrl}posts/${id}`, data);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}posts/${id}`);
  }

  getPhotos(id: number) {
    return this.http.get(`${this.baseUrl}photos?albumId=${id}`);
  }
}
