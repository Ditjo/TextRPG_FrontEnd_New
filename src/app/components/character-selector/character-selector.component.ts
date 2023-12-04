import { Component } from '@angular/core';
import { Hero } from '../../models/hero';
import { GenericService } from '../../services/generic.service';
import { TableURL } from '../../tools/table-url';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrl: './character-selector.component.css'
})
export class CharacterSelectorComponent {

  constructor(private heroService:GenericService<Hero>){

  }

  herolist:Hero[] = []

  ngOnInit(){
    this.GetAllHeros()
    // console.log("I'm in ngOnInit");
    
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
}
