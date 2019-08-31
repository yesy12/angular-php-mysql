import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

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
    public headers = new HttpHeaders();
    public tabelaChamada: TableData;
    public hora : any = new Date();
    public chamada : any = {
      numero : 0,
      guiche : 0,
      hora   : '0'
    }
    public listaChamada : any = [
     
    ]
    
    constructor(public http : HttpClient) {
      this.headers = this.headers.set("Content-Type","application/json; charset=utf8")
      setInterval(() => this.hora = new Date(), 1000);
      setInterval(()=> this.getChamada(), 5000);
    }

    ngOnInit(){
      this.tabelaChamada = {
        titulo: [ 'Guiche', 'Senha','Hora'],
        conteudo: this.listaChamada
      };
    }
    
    getChamada(){
      this.http.post("http://192.168.0.3/aluno/ws/alison/",
      JSON.stringify({opt:4}),{headers : this.headers})
        .subscribe((data : any) =>{
          if(data != null){
            if(data[0] != undefined){
              if(data[0].idChamada != this.chamada.numero){
                this.chamada.numero = data[0].idChamada;
                this.chamada.guiche = data[0].guiche;
                this.chamada.hora = data[0].dataRegistro;
                this.listaChamada.length = 0;
                for(let item of data){
                  this.listaChamada.push([
                    item.guiche,
                    item.idChamada,
                    item.dataRegistro
                  ])
                }
              }
            }
          }
        });
    }
}
