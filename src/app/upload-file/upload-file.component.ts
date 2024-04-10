import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, of, Subscription } from 'rxjs';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FileUploadService } from '../services/file-upload.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';
import { KvartalService } from '../services/kvartal.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;

  kvartal?: number;
  isButtonDisabled = false; 

  dummyRequest = (item: any): Subscription => {
    return of(null)
      .pipe(delay(500))
      .subscribe(() => {
        item.onSuccess(null, item.file, null);
      });
  };

  constructor(
    private notification: NzNotificationService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private typeService: TypeOfObrazacService,
    private kvaratlService: KvartalService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.kvartal = this.kvaratlService.getKvartal();
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (file.originFileObj) {
      this.selectedFile = file.originFileObj;
      this.notification.create(
        'success',
        'Uspesno ste odabrali fajl. ',
        'Idite na dugme "Ucitaj obrazac"'
       // this.selectedFile.name
      );
    } else {
      this.notification.create('error',
       'Nije odabran file! ', 
       '',
       { nzDuration: 5000 });
    }
  }

  sendFile(): void {
    if (this.selectedFile && this.kvartal) {
      this.isButtonDisabled = true;

      this.fileUploadService
        .uploadExcelFile(
          this.selectedFile,
          this.kvartal,
          this.typeService.typeOfObrazac
        )
        .subscribe({
          next: (response) => {
            if (response === '') {
              this.notification.create(
                'success',
                'Obrazac je uspesno ucitan !',
                '',
                { nzDuration: 10000 }
              );
            this.isButtonDisabled = false; 
            } else {
              this.notification.create(
                'warning',
                'Obrazac je uspesno ucitan !',
                response,
                { nzDuration: 10000 }
              );
              this.isButtonDisabled = false; 
            }
          },
          error: (error) => {
            console.error('Full error info: ', error);
            this.notification.create(
              'error',
              'Neuspesno ucitavanje!',
              error.error,
              { nzDuration: 10000 }
            );
          },
        });
    } else {
      this.notification.create('error', 
      'Niste odabrali kvartal ili fajl!', '', 
       { nzDuration: 10000 } );
    }  

    this.router.navigate(['/blank']);
  }
  
  
}
