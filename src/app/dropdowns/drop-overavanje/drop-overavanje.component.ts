import { Component } from '@angular/core';
import { TypeOfObrazacService } from 'src/app/services/type-of-obrazac.service';
import {ObrazacService} from "../../services/obrazac.service";

@Component({
  selector: 'app-drop-overavanje',
  templateUrl: './drop-overavanje.component.html',
})
export class DropOveravanjeComponent {
  constructor(private service: ObrazacService) {}

  setTypeOfObrazac(type: string) {
    this.service.typeOfObrazac = type;
    //this.service.status = status
  }
}
