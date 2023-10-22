import { Component } from '@angular/core';
import { TypeOfObrazacService } from 'src/app/services/type-of-obrazac.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  constructor(private service: TypeOfObrazacService) {}

  setTypeOfObrazac(type: string) {
    this.service.typeOfObrazac = type;
  }
}
