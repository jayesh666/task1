import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: any;
  id: any;
  user: any;
  comments: any;
  searchText: any;
  editPostData = new FormGroup({
    title: new FormControl(null),
    body: new FormControl(null),
  });
  constructor(private userSer: UsersService, private route: ActivatedRoute, private formBuilder: FormBuilder, private _location: Location) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.editPostData = this.formBuilder.group({
      title: [null, Validators.required],
      body: [null, Validators.required],  
    })
    this.userSer.getPost(this.id).subscribe((data) => {
      console.log(data)
      this.post = data;
      this.userSer.getUser(this.post.userId).subscribe((data) => {
        console.log(data)
        this.user = data;
      });
      this.editPostData = new FormGroup({
        title: new FormControl(this.post.title, Validators.required),
        body: new FormControl(this.post.body, Validators.required),
      });
    });
    this.userSer.getCommentByPost(this.id).subscribe((data) => {
      this.comments = data;
    });
  }

  editPost(data: any) {
    this.userSer.editPost(this.id, this.editPostData.value).subscribe(data => {
      this.post = data;
    });
  }

  deletePost(id: number) {
    this.userSer.deletePost(id).subscribe(data => {
      this.post = data;
      this._location.back();
    });
  }
}
