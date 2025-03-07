import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-image',
  standalone: false,
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.css'
})
export class ViewImageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private fileUploadService = inject(FileUploadService);

  id= "";
  param$!:Subscription;
  imageData:any;

  constructor(){
    console.log("view image")
  }

  ngOnInit(): void {
    console.log("here")
    // Will change view as long as id changes
    this.param$ = this.route.params.subscribe(async (params) => {
      console.log('Route params changed:', params);
      this.id = params['id'];
      let r = await this.fileUploadService.getImage(this.id)
      this.imageData = r.image;
      console.log(this.imageData)
    })
  }

  ngOnDestroy(): void {
    if(this.param$ != null)
      this.param$.unsubscribe();
  }
}
