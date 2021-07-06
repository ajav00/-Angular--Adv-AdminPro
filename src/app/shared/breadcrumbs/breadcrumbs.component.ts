import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public subs$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { 
    
    // console.log(route.snapshot.children[0].data);


    this.subs$ = this.getArgumentosRuta()
                        .subscribe( ({titulo})=>{
                          this.titulo = titulo;
                          document.title = `AdminPro - ${titulo}`
                        });

  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events.pipe(
      filter(events => events instanceof ActivationEnd),
      filter((events: ActivationEnd) => events.snapshot.firstChild === null),
      map((events: ActivationEnd) => events.snapshot.data)
    )
  }


}
