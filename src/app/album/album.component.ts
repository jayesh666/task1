import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  photos: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private usersSer: UsersService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usersSer.getPhotos(this.id).subscribe(data => {
      this.photos = data;
    });
  }

}
