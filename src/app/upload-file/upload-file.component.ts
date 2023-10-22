import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, of, Subscription } from 'rxjs';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FileUploadService } from '../services/file-upload.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;

  kvartal?: number;
  //typeOfObrazac: string = 'ZakljucniList';

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
    private typeService: TypeOfObrazacService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.kvartal = this.fileUploadService.kvartal;
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (file.originFileObj) {
      this.selectedFile = file.originFileObj;
      this.notification.create(
        'success',
        'Odabran je file ',
        this.selectedFile.name
      );
    } else {
      this.notification.create('error', 'Nije odabran file! ', '');
    }
  }

  sendFile(): void {
    if (this.selectedFile && this.kvartal) {
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
                ''
              );
            } else {
              this.notification.create(
                'warning',
                'Obrazac je uspesno ucitan !',
                response
              );
            }
          },
          error: (error) => {
            console.error('Full error info: ', error);
            this.notification.create(
              'error',
              'Neuspesno ucitavanje!',
              error.message
            );
          },
        });
    } else {
      this.notification.create('error', 'Fajl nije odabran!', '');
    }
    this.router.navigate(['/']);
  }
}
