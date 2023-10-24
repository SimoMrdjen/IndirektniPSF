import { Component } from '@angular/core';
import { TypeOfObrazacService } from 'src/app/services/type-of-obrazac.service';

@Component({
  selector: 'app-drop-overavanje',
  templateUrl: './drop-overavanje.component.html',
})
export class DropOveravanjeComponent {
  constructor(private service: TypeOfObrazacService) {}

  setTypeOfObrazac(type: string) {
    this.service.typeOfObrazac = type;
  }
}
