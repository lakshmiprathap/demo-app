import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private messageService:MessageService,
    private http : HttpClient ) { }
  getHeroes(): Observable<Hero[]>{
   return this.http.get<Hero[]>(this.heroUrl)
   .pipe( 
    tap(_ => this.log('fetched heroes')), 
    catchError(this.handleError<Hero[]>('getHeroes',[]))
   );
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  private log(message : string){
    this.messageService.add(`HeroService :${message}`);
  }
  private heroUrl = 'api/heroes';
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
updateHero(hero :Hero): Observable<any> {
  console.log(hero)
return this.http.put(this.heroUrl, hero ,this.httpOptions).pipe(
  tap(_ => this.log(`updated hero id =${hero.id}`)),
  catchError(this.handleError<any>('updateHero'))
);
}
httpOptions = {
  headers : new HttpHeaders ({ 'content-Type':'application/json'})
};
addHero(hero : Hero) : Observable<any>{
  console.log(hero)
  return this.http.post(this.heroUrl, hero, this.httpOptions).pipe(
    tap((newHero : Hero)=>this.log(`added hero id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  )
}
deleteHero(hero : Hero | number): Observable<Hero> {
const id = typeof hero === 'number'? hero:hero.id;
const url = `${this.heroUrl}/${id}`;

return this.http.delete<Hero>(url,this.httpOptions).pipe(
  tap(_=> this.log(`deleted hero id=${id}`)),
  catchError(this.handleError<Hero>('deleteHero'))
);
}
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
  
}
