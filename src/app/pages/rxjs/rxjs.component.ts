import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    


    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   err => console.log('Err: ', err),
    //   () => console.log('Terminado')
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );


  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo(): Observable<number> {
    // console.log('Llamada');
    return interval(500)
                  .pipe(
                    take(10),
                    map( valor => valor + 1 ),
                    filter( valor => (valor % 2 === 0) ? true : false ),
                  );
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    return new Observable( observer => {
  

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);      //Enviar info

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();  //Terminar
        }

        if(i === 2){
          // i = 0;
          observer.error('Algo salio mal'); // error
        }
      }, 1000);

    });
  }


}
