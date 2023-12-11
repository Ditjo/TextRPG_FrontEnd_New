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
import { first, firstValueFrom, timeout } from 'rxjs';

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
    
    careerlist:Career[] = [];
    racelist:Race[] = [];
    weaponlist:Weapon[] = [];
    
    selectedCareer?:Career;
    selectedRace?:Race;
    selectedWeapon?:Weapon;
    
    showList: string = "";
    IsSaveable:boolean = false;

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

  createNewWeapon = new FormGroup
  ({
    weaponName: new FormControl("")
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

  SelectRace(race:Race): void
  {
    this.selectedRace = race;
    console.log(this.selectedRace)
    this.createNewRace.patchValue({
      raceName: this.selectedRace.raceType
    })
    this.createNewRace.disable();
  }

  SelectWeapon(weapon:Weapon): void
  {
    this.selectedWeapon = weapon;
    console.log(this.selectedWeapon)
    this.createNewWeapon.patchValue({
      weaponName: this.selectedWeapon.weaponName
    })
    this.createNewWeapon.disable();
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
      let newCareer: Career = {
        id: 0, careerType: this.createNewCareer.value.careerName as unknown as string
      }
      console.log(newCareer)

      this.careerService.create(TableURL.Career, newCareer).subscribe(
        () => {
          this.GetAllCareer();
        }
      )
      this.createNewCareer.reset();
    }

    // Race
    if (this.showList == TableURL.Race)
    {
      let newRace: Race = {
        id: 0, raceType: this.createNewRace.value.raceName as unknown as string
      }
      console.log(newRace)

      this.raceService.create(TableURL.Race, newRace).subscribe(
        () => {
          this.GetAllRace();
        }
      )
      this.createNewRace.reset();
    }

    // Weapon
    // if (this.showList == TableURL.Weapon)
    // {
    //   let newWeapon: Weapon = {
    //     id: 0, weaponName: this.createNewWeapon.value.weaponName as unknown as string
    //   }
    //   console.log(newWeapon)

    //   this.weaponService.create(TableURL.Weapon, newWeapon).subscribe(
    //     () => {
    //       this.GetAllWeapon();
    //     }
    //   )
    //   this.createNewWeapon.reset();
    // }
  }

  Update(): void
  {
    if (this.showList == TableURL.Career)
      this.createNewCareer.enable();

    if (this.showList == TableURL.Race)
      this.createNewRace.enable();
    
    this.IsSaveable = true;
    console.log("Edit pressed")
  }

  async SaveEdit()
  {
    if (this.showList == TableURL.Career)
    {
      let updatedCareer:Career
      if (this.selectedCareer != null)
      {
        updatedCareer = this.selectedCareer;
  
        if (this.createNewCareer.value.careerName != null)
          updatedCareer.careerType = this.createNewCareer.value.careerName;
        
        let res = await firstValueFrom(this.careerService.update(TableURL.Career, updatedCareer). pipe(timeout(10000)));
        
        this.careerService.getAll(TableURL.Career).subscribe(
          (data) => {
            this.careerlist = data;
          }
        );
        this.createNewCareer.reset();
        this.IsSaveable = false;
      }
    }

    if (this.showList == TableURL.Race)
    {
      let updatedRace:Race
      if (this.selectedRace != null)
      {
        updatedRace = this.selectedRace;

        if (this.createNewRace.value.raceName != null)
          updatedRace.raceType = this.createNewRace.value.raceName;

        let res = await firstValueFrom(this.raceService.update(TableURL.Race, updatedRace).pipe(timeout(10000)));

        this.raceService.getAll(TableURL.Race).subscribe(
          (data) => {
            this.racelist = data;
          }
        );
        this.createNewRace.reset();
        this.IsSaveable = false;
      }
    }
  }


  Delete(): void
  {
    if (this.showList == TableURL.Career)
    {
      if (this.selectedCareer != null)
      {
        console.log(this.selectedCareer?.id);
        this.careerService.delete(TableURL.Career, this.selectedCareer.id).subscribe(
          () => {
            this.GetAllCareer();
            this.createNewCareer.reset();
            this.createNewCareer.enable();
          }
        )
        this.selectedCareer = undefined;
      }
    }

    if (this.showList == TableURL.Race)
    {
      if (this.selectedRace != null)
      {
        console.log(this.selectedRace?.id);
        this.raceService.delete(TableURL.Race, this.selectedRace.id).subscribe(
          () => {
            this.GetAllRace();
            this.createNewRace.reset();
            this.createNewRace.enable();
          }
        )
        this.selectedRace = undefined;
      }
    }

    if (this.showList == TableURL.Weapon)
    {
      if (this.selectedWeapon != null)
      {
        console.log(this.selectedWeapon?.id);
        this.weaponService.delete(TableURL.Weapon, this.selectedWeapon.id).subscribe(
          () => {
            this.GetAllWeapon();
            this.createNewWeapon.reset();
            this.createNewWeapon.enable();
          }
        )
        this.selectedWeapon = undefined;
      }
    }
  }
}
