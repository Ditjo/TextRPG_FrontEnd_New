import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Monster } from '../../models/monster';
import { GenericService } from '../../services/generic.service';
import { TableURL } from '../../tools/table-url';
import { Hero } from '../../models/hero';
import { DiceRollInterval } from '../../tools/diceroller';

@Component({
  selector: 'app-game-battle',
  templateUrl: './game-battle.component.html',
  styleUrl: './game-battle.component.css'
})
export class GameBattleComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monsterService: GenericService<Monster>
  ){
    this.heroInFight = this.router.getCurrentNavigation()?.extras?.state?.['input']
    this.GetAMonsterToFight();
    
  }

ngOnInit(){
  this.heroHealth = this.heroInFight.entityBaseSystem.health;
  this.heroEnergy = this.heroInFight.entityBaseSystem.energy;
}


  heroInFight!:Hero
  monsterInFight?:Monster

  heroHealth:number = 0
  heroEnergy:number = 0
  monsterHealth:number = 0
  monsterEnergy:number = 0


  GetAMonsterToFight():void{
    this.monsterService.getAll(TableURL.Monster).subscribe(
      (data) =>{
        let temp  = data.filter(x => x.levelDifficulty <= this.heroInFight.level)
        this.monsterInFight = temp.at(DiceRollInterval(1,temp.length)-1)
        // console.log(this.monsterInFight);
        if (this.monsterInFight != null){
    
          this.monsterHealth = this.monsterInFight?.entityBaseSystem.health
          this.monsterEnergy = this.monsterInFight.entityBaseSystem.energy
        }
      }
    )
  }
  Attack():void{
    this.monsterHealth -= 5;
    
  }
  Defend():void{
    
  }
  MoveCloser():void{
    
  }
  MoveAway():void{
    
  }
  Rest():void{
    
  }
  UseItem():void{
    
  }
  Flea():void{
    
  }
  Return(): void{
    this.router.navigate(["../adventure-menu"], {relativeTo: this.route, state: { input: this.heroInFight}})
  }
}
