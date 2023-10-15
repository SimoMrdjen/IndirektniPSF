import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DownloadService } from '../services/download.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent {
  size: NzButtonSize = 'large';
  typeOfObrazac: string = '';

  constructor(
    private service: DownloadService,
    private notification: NzNotificationService
  ) {}

  downloadObrazac(typeOfObrazac: string) {
    this.service.downloadObrazac(typeOfObrazac).subscribe({
      next: (response: any) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Use file-saver to save the file
        saveAs(blob, `${typeOfObrazac}.xlsx`);
        this.notification.create(
          'success',
          'Uspesno preuzimanje',
          `Preuzet je zeljeni obrazac!`
        );
      },
      error: (err) => {
        this.notification.create(
          'error',
          'Neuspesno!',
          `Preuzimanje obrasca nije uspelo!`
        );
      },
    });
  }
}
