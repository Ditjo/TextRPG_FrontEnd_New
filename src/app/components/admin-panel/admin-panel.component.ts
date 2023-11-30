import { Component } from '@angular/core';
import { ArmourService } from '../../services/armour.service';
import { Armour } from '../../models/armour';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

constructor(
  private armourService:ArmourService,
  private heroService:HeroService
  ){

}

armourlist:Armour[] = [];
herolist:Hero[] = []

GetAllArmour(){
  this.armourService.GetAll().subscribe(
    (data) =>{
      this.armourlist = data;
      console.log(this.armourlist);
    }
  )
}

GetAllHeros(){
  this.heroService.GetAll().subscribe(
    (data) =>{
      this.herolist = data;
      console.log(this.herolist);
    }
  )
}

}
