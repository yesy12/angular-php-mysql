import { Component, OnInit } from '@angular/core';


declare interface TableData {
  titulo: string[];
  conteudo: string[][];
}

@Component({
    selector: 'chamada-cmp',
    moduleId: module.id,
    templateUrl: 'chamada.component.html'
})

export class ChamadaComponent implements OnInit{
    public tabelaChamada: TableData;
    public hora : any = new Date();
    public chamada : any = {
      numero : 602,
      guiche : 1,
      hora   : '12:12:12 23/12/2019'
    }
    public listaChamada : any = [
     
    ]
    
    constructor() {
      setInterval(() => this.hora = new Date(), 1000);
    }

    ngOnInit(){
      this.tabelaChamada = {
        titulo: [ 'Guiche', 'Senha','Hora'],
        conteudo: this.listaChamada
    };
    }
    
}
