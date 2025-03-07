import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UploadComponent } from './components/upload/upload.component';
import { ViewImageComponent } from './components/view-image/view-image.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient() // Need to intercept the header to slot in the auth token
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
