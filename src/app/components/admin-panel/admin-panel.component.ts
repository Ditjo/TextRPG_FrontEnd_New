import { Component } from '@angular/core';
import { ArmourService } from '../../services/armour.service';
import { Armour } from '../../models/armour';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

constructor(private armourService:ArmourService){

}

armourlist:Armour[] = [];


GetAllArmour(){
  this.armourService.GetAll().subscribe(
    (data) =>{
      this.armourlist = data;
      console.log(this.armourlist);
    }
  )
}

}
