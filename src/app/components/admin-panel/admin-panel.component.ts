import { Component } from '@angular/core';
import { Armour } from '../../models/armour';
import { Hero } from '../../models/hero';
import { GenericService } from '../../services/generic.service';
import { HttpClient } from '@angular/common/http';
import { TableURL } from '../../tools/table-url'

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
    ){}
  
  armourlist:Armour[] = [];
  herolist:Hero[] = []
  
  GetAllArmour(){
    this.armourService.getAll(TableURL.Armour).subscribe(
      (data) =>{
        this.armourlist = data;
        console.log(this.armourlist);
      }
    )
  }
  
  GetAllHeros(){
    this.heroService.getAll(TableURL.Hero).subscribe(
      (data) =>{
        this.herolist = data;
        console.log(this.herolist);
      }
    )
  }
}