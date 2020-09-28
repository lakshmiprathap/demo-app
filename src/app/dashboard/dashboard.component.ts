import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

public heroes : Hero[];
// selectedHero : Hero;
  constructor( private heroService:HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  // onSelect(hero : Hero){
  //   this.selectedHero = hero;
  //   this.messageService.add(`DashboardComponent: Selected hero id=${hero.id}`);
  // }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes =>{
      this.heroes = heroes;
    });
  }
  delete(hero :Hero): void{
    this.heroes = this.heroes.filter(t => t !== hero);
    this.heroService.deleteHero(hero).subscribe();

  }

}
