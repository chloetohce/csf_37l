import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  private fileuploadService = inject(FileUploadService);

  form!: FormGroup;
  dataUri!: string;
  blob!: Blob;

  ngOnInit(): void {
    this.form = this.createForm();
  }
  
  async upload() {
    console.log(this.dataUri)
    if (!this.dataUri) {
      return;
    }
    this.blob = this.dataURItoBlob(this.dataUri);
    const formValue = this.form.value;
    // this.fileuploadService.upload(formValue, this.blob)
    //   .then((result) => {
    //     console.log(result)
    //     console.log(result.id);
    //     this.router.navigate(['/image', result.id])
    //   })

    let result  = await this.fileuploadService.upload(formValue, this.blob);
    this.router.navigate(['/image', result.id]);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log("file received: ", file)

      //Need to read the file
      const reader = new FileReader();
      reader.onload = () => {
        this.dataUri = reader.result as string; // async
      };
      reader.readAsDataURL(file);
    }
  }

  dataURItoBlob(dataURI: string): Blob{
    const [meta, base64Data] = dataURI.split(',');
    const mimeMatch = meta.match(/:(.*?);/);

    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < byteString.length; i++){
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeType});
  }

  private createForm(): FormGroup {
    return this.fb.group({
      comments: this.fb.control<string>('')
    })
  }
}
