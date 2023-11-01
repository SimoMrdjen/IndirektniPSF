import { Component } from '@angular/core';
import { TypeOfObrazacService } from 'src/app/services/type-of-obrazac.service';

@Component({
  selector: 'app-drop-storno',
  templateUrl: './drop-storno.component.html',
})
export class DropStornoComponent {
  constructor(private service: TypeOfObrazacService) {}

  setTypeOfObrazac(type: string) {
    this.service.typeOfObrazac = type;
  }
}
