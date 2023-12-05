import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GenericService } from '../../services/generic.service';
import { Race } from '../../models/race';
import { TableURL } from '../../tools/table-url';
import { Career } from '../../models/career';
import { Hero } from '../../models/hero';
import { Weapon } from '../../models/weapon';
import { EntityBaseSystem } from '../../models/entityBaseSystem';
import { DiceRollInterval } from '../../tools/diceroller';
import { FormControl, FormGroup } from '@angular/forms';
import { GenericService } from '../../services/generic.service';
import { Race } from '../../models/race';
import { TableURL } from '../../tools/table-url';
import { Career } from '../../models/career';
import { Hero } from '../../models/hero';
import { Weapon } from '../../models/weapon';
import { EntityBaseSystem } from '../../models/entityBaseSystem';
import { DiceRollInterval } from '../../tools/diceroller';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.css'
})
export class CharacterCreatorComponent {
  constructor(
    private raceService:GenericService<Race>,
    private careerService:GenericService<Career>,
    private weaponService:GenericService<Weapon>,
    private heroService:GenericService<Hero>
    ){}

  racelist:Race[] = [];
  careerlist:Career[] = [];
  starterWeaponslist:Weapon[] = []
  newEntityBaseSystem:EntityBaseSystem = {
    id: 0,
    strength: 0,
    agility: 0,
    vigor: 0,
    spirit: 0,
    health: 0,
    energy: 0,
    healthModifier: 0,
    energyModifier: 0,
    damageModifier: 0,
    armourModifier: 0
  }

  ngOnInit(){
    this.GetAllRaces();
    this.GetAllCareer();
    this.GetAllStarterWeapons();
  }

  GetAllRaces(){
    this.raceService.getAll(TableURL.Race).subscribe(
      (data) => {
        this.racelist = data;
      }
    )
  }

  GetAllCareer(){
    this.careerService.getAll(TableURL.Career).subscribe(
      (data) => {
        this.careerlist = data;
      }
    )
  }

  GetAllStarterWeapons(){
    this.weaponService.getAll(TableURL.Weapon).subscribe(
      (data) => {
        this.starterWeaponslist = data.filter(x => x.availableToHero == true && x.starterWeapon == true)
      }
    )
  }

  createNewHero = new FormGroup({
    heroName: new FormControl(''),
    race: new FormControl(this.racelist[0]),
    career: new FormControl(this.careerlist[0]),
    note: new FormControl(''),
    weapon: new FormControl(this.starterWeaponslist[0])
  })

  rollmin:number = 4;
  rollmax:number = 10;

  RollStats(){
    let strengthtemp:number =  DiceRollInterval(this.rollmin,this.rollmax);
    let agilitytemp:number = DiceRollInterval(this.rollmin,this.rollmax);
    let vigortemp:number = DiceRollInterval(this.rollmin,this.rollmax);
    let spirittemp:number = DiceRollInterval(this.rollmin,this.rollmax);

    this.newEntityBaseSystem = {
      id: 0,
      strength: strengthtemp,
      agility: agilitytemp,
      vigor: vigortemp,
      spirit: spirittemp,
      health: vigortemp * 2,
      energy: agilitytemp + spirittemp,
      healthModifier: 0,
      energyModifier: 0,
      damageModifier: 0,
      armourModifier: 0
    }
    this.isDisabled = false
  }

  isDisabled:boolean = true

  Create(){
    let newHero:Hero = {
      id: 0,
      heroName: this.createNewHero.value.heroName!,
      note: this.createNewHero.value.note!,
      raceId: this.createNewHero.value.race?.id!,
      race: this.createNewHero.value.race!,
      careerId: this.createNewHero.value.career?.id!,
      career: this.createNewHero.value.career!,
      heroXp: 0,
      level: 1,
      entityBaseSystem: this.newEntityBaseSystem,
      inventory: {
        id: 0,
        gold: 0,
        armourId: 0,
        armour: null,
        potions: null,
        weapons: [this.createNewHero.value.weapon!]

      }
    }
    this.heroService.create(TableURL.Hero, newHero).subscribe();
    // console.log(newHero);
    
    
  }

  // LocalStorageWrite(){
  //   localStorage.setItem('LogOn', '1')
  // }

  // LocalStorageRead():string{
  //   let i = localStorage.getItem('LogOn')
  //   if (i == null)
  //     i = '0';
  //   return i;
  // }

}

