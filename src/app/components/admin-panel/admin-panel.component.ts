import { Component } from '@angular/core';
import { Armour } from '../../models/armour';
import { Hero } from '../../models/hero';
import { GenericService } from '../../services/generic.service';
import { HttpClient } from '@angular/common/http';
import { TableURL } from '../../tools/table-url'
import { Race } from '../../models/race';
import { Career } from '../../models/career';
import { Weapon } from '../../models/weapon';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent
{

  constructor(
    private raceService:GenericService<Race>,
    private careerService:GenericService<Career>,
    private weaponService:GenericService<Weapon>
  ){}

  racelist:Race[] = [];
  careerlist:Career[] = [];
  weaponlist:Weapon[] = [];

  selectedCareer?:Career;
  showList: string = "";

  ngOnInit()
  {
    this.GetAllRace();
    this.GetAllCareer();
    this.GetAllWeapon();
  }

  GetAllCareer(){
    this.careerService.getAll(TableURL.Career).subscribe(
      (data) => {
        this.careerlist = data;
      }
    )
  }

  GetAllRace(){
    this.raceService.getAll(TableURL.Race).subscribe(
      (data) => {
        this.racelist = data;
      }
    )
  }

  GetAllWeapon(){
    this.weaponService.getAll(TableURL.Weapon).subscribe(
      (data) => {
        this.weaponlist = data;
      }
    )
  }
  
  createNewCareer = new FormGroup
  ({
    careerName: new FormControl("")
  })

  createNewRace = new FormGroup
  ({
    raceName: new FormControl("")
  })

  SelectCareer(career:Career): void
  {
    this.selectedCareer = career;
    console.log(this.selectedCareer)
    this.createNewCareer.patchValue({
      careerName: this.selectedCareer.careerType
    })
    this.createNewCareer.disable();
  }

  Career(): void
  {
    this.showList = TableURL.Career;
    console.log(this.showList)
  }

  Race(): void
  {
    this.showList = TableURL.Race;
    console.log(this.showList)
  }

  Weapon(): void
  {
    this.showList = TableURL.Weapon;
    console.log(this.showList)
  }

  Create(): void
  {
    // Career
    if (this.showList == TableURL.Career)
    {
      let newCareer: Career={
        id: 0, careerType: this.createNewCareer.value.careerName as unknown as string
      }
      console.log(newCareer)

      this.careerService.create(TableURL.Career, newCareer).subscribe(
        () =>
        {
          this.GetAllCareer();
        }
      )
      this.createNewCareer.reset();
    }

    // Race


    // Weapon
    
  }

  Update(): void
  {
    console.log("Edit pressed")
  }

  Delete(): void
  {
    console.log("Delete pressed")
  }
}
