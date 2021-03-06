import { Component, OnInit, Inject } from '@angular/core';
import { PhotoServiceService } from '../../services/photo-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {IPhoto} from '../../interfaces/photo';
import { baseURL } from '../../shared/baseURL';

@Component({
  selector: 'app-photo-prev',
  templateUrl: './photo-prev.component.html',
  styleUrls: ['./photo-prev.component.css']
})
export class PhotoPrevComponent implements OnInit {
  id: string;
  photo:IPhoto;
  constructor(private photoService: PhotoServiceService, private activatedRoute: ActivatedRoute, private router: Router,
    @Inject('baseURL') public baseUrl) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id).subscribe(res => {
        this.photo = res
      },
      err => console.log(err));
    })    
  }

  deletePhoto(id: string): Boolean {
    this.photoService.deletePhoto(id).subscribe(res => {
      console.log(res);
      this.router.navigate(['photos']);
    }, err => console.log(err));
    return false;
  }

  updatePhoto(title: HTMLInputElement, description: HTMLInputElement): Boolean {
    this.photoService.updatePhoto(this.id, title.value, description.value)
    .subscribe(res => { 
      console.log(res)
      this.router.navigate(['photos'])
    }, err => console.log(err));
    return false;
  }

  back(){
    this.router.navigate(['photos'])
  }

}
