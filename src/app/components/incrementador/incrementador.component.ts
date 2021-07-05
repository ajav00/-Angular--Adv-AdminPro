import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  
  // @Input('valor') progress: number = 50;
  @Input('valorEntrada') progress: number = 50;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  @Input() btnClass: string = 'btn btn-primary';
  
  constructor() { }
  
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  
  cambiarValor(valor: number){
    this.progress = this.progress + valor;

    if(this.progress > 100 ){
      this.valorSalida.emit(100);
      return this.progress = 100;
    }

    if(this.progress < 0){
      this.valorSalida.emit(0);
      return this.progress = 0;
    }

    this.valorSalida.emit(this.progress);
    // return this.progress;
  }//cambiarValor


  onChange(nuevoValor: number){
    if(nuevoValor >= 100){
      this.progress = 100;
    }
    else if(nuevoValor <= 0){
      this.progress = 0;
    }
    else{
      this.progress = nuevoValor;
    }
    this.valorSalida.emit(this.progress);
  }//onChange
  

}
