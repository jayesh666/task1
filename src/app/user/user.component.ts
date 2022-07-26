import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  posts: any;
  albums: any;
  id: any;
  newPostData!: FormGroup;
  constructor(private usersSer: UsersService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usersSer.getPosts().subscribe((data) => {
      this.posts = data;
      this.posts = this.posts.filter((post: any) => post.userId == this.id);
    });
    this.usersSer.getAlbums().subscribe((data) => {
      this.albums = data;
      this.albums = this.albums.filter((album: any) => album.userId == this.id);
    });
    this.newPostData = this.formBuilder.group({
      title: [null, Validators.required],
      body: [null, Validators.required],
    });
  }

  addPost(data: any) {
    this.usersSer.addPost(this.newPostData.value).subscribe(data => {
      this.posts.push(data);
    });
  }
}
