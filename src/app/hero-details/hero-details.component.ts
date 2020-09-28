import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero : Hero;
  heroes: Hero[] = [];
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero()
  }
 getHero(): void {
   const id = +this.route.snapshot.paramMap.get('id');
   this.heroService.getHero(id).subscribe(hero => this.hero = hero)
 }
 goBack(): void {
  this.location.back();
}
save(){
  this.heroService.updateHero(this.hero).
  subscribe((value)=> 
  {
    this.goBack()
  }
  )
}
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}
}
