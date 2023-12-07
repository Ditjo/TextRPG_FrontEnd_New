import { Component } from '@angular/core';
import { Hero } from '../../models/hero';
import { GenericService } from '../../services/generic.service';
import { TableURL } from '../../tools/table-url';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Career } from '../../models/career';
import { Race } from '../../models/race';
import { defaultIfEmpty, firstValueFrom, timeout } from 'rxjs';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrl: './character-selector.component.css'
})
export class CharacterSelectorComponent {

  constructor(
    private heroService:GenericService<Hero>,
    private raceService:GenericService<Race>,
    private careerService:GenericService<Career>,
    ){

  }

  herolist:Hero[] = [];
  racelist:Race[] = [];
  careerlist:Career[] = [];
  selectedhero?:Hero
  isEditable: boolean = false;

  async ngOnInit(){
    this.GetAllHeros()
    this.GetAllRaces();
    this.GetAllCareer();
    let i = localStorage.getItem('shero')
    console.log(i);
    
    if (i != null ){
      this.SelectHero(await firstValueFrom(
        this.heroService.getById(TableURL.Hero, i as unknown as number).pipe(timeout(10000))
        )
      )
      // Might look like it works, but might not work, because of async on ngOnInit.
      localStorage.removeItem('shero')
    }
  }

  GetAllHeros(){
    // console.log("I'm in GettAllHeros");
    this.heroService.getAll(TableURL.Hero).subscribe(
      (data) =>{
        this.herolist = data;
        console.log(this.herolist);
      }
    )
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

  updateSelectedHero = new FormGroup({
    heroName: new FormControl('', Validators.required),
    race: new FormControl(this.racelist[0]),
    career: new FormControl(this.careerlist[0]),
    note: new FormControl('')
  })

  SelectHero(hero:Hero){
    this.isEditable = false;
    this.selectedhero = hero;
    console.log(this.selectedhero);
    
  }
  
  UpdateHero(){
    // console.log(this.selectedhero?.heroName);
    
    // this.updateSelectedHero.reset()
    this.updateSelectedHero.patchValue(
      {
        heroName: this.selectedhero?.heroName,
        race: this.racelist.find(x => x.id == this.selectedhero?.raceId),
        career: this.careerlist.find(x => x.id == this.selectedhero?.careerId),
        note: this.selectedhero?.note
      }
    )
    this.isEditable = !this.isEditable
    console.log(this.isEditable);
    
  }

  SaveChanges(){

    let updatedHero:Hero
    if(this.selectedhero != null){
      updatedHero = this.selectedhero

      if (this.updateSelectedHero.value.heroName != null)
      updatedHero.heroName = this.updateSelectedHero.value.heroName
      if(this.updateSelectedHero.value.race != null){
        updatedHero.raceId = this.updateSelectedHero.value.race.id
      }
      if ( this.updateSelectedHero.value.career != null)
        updatedHero.careerId = this.updateSelectedHero.value.career.id
      if (this.updateSelectedHero.value.note != null)
        updatedHero.note = this.updateSelectedHero.value.note
    
      this.heroService.update(TableURL.Hero, updatedHero).subscribe();
      this.SelectHero(updatedHero)
    }


  }
}
