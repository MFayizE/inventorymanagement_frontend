import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
// import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { GlobalErrorHandler1 } from './core/interceptors/global-error-handler';
import { GlobalErrorHandler } from './core/interceptors/global-error-handler-component';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      // toastClass: 'toast no-shadow'
    }),
    MatToolbarModule,
    MatDialogModule

    // TypeaheadModule.forRoot(),
    // MatSlideToggleModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, { provide: ErrorHandler, useClass: GlobalErrorHandler },


    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler1,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
