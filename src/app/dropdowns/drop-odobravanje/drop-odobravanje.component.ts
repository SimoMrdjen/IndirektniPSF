import { Component } from '@angular/core';
import { TypeOfObrazacService } from 'src/app/services/type-of-obrazac.service';

@Component({
  selector: 'app-drop-odobravanje',
  templateUrl: './drop-odobravanje.component.html',
})
export class DropOdobravanjeComponent {
  constructor(private service: TypeOfObrazacService) {}

  setTypeOfObrazac(type: string) {
    this.service.typeOfObrazac = type;
  }
}
