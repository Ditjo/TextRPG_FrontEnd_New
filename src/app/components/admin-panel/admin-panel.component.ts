import { Component } from '@angular/core';
import { ArmourService } from '../../services/armour.service';
import { Armour } from '../../models/armour';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';
import { GenericService } from '../../services/generic.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent
{

  constructor(
    private armourService:GenericService<Armour>,
    private heroService:GenericService<Hero>
    ){
    
  }
  
  armourlist:Armour[] = [];
  herolist:Hero[] = []
  
  GetAllArmour(){
    this.armourService.getAll('Armour').subscribe(
      (data) =>{
        this.armourlist = data;
        console.log(this.armourlist);
      }
    )
  }
  
  GetAllHeros(){
    this.heroService.getAll('Hero').subscribe(
      (data) =>{
        this.herolist = data;
        console.log(this.herolist);
      }
    )
  }
}