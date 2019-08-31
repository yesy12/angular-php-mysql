import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment.prod';

declare var $:any;

@Component({
    selector: 'cadastro-cmp',
    moduleId: module.id,
    templateUrl: 'cadastro.component.html'
})

export class CadastroComponent implements OnInit{
    public headers = new HttpHeaders();
    public paciente : any;
    public pacientes : any;

    public resumo : any = {
        meuGuiche       : 0,
        senhaAtual      : 0,
        totalCadastrado : 0
    }

    constructor(public http : HttpClient){
        this.headers = this.headers.set("Content-Type","application/json; charset=utf8")
        this.listaDePacientes();
    }
    
    ngOnInit(){
        this.paciente = {
            email : null,
            nome : null,
            snome : null,
            endereco : null,
            cidade : null,
            estado : null,
            cep : null,
            obs : null
        }
    }

    cadastrar(){
        let opt : any = {
            opt : 2,
            paciente : this.paciente
        }
        
        this.http.post("http://192.168.0.3/aluno/ws/alison/",
        JSON.stringify(opt),{headers : this.headers})
            .subscribe(data => {
                if(data != null){
                    alert("criado")
                }
            })       
    }


    proximo(){
        let post : any = {
            opt : 3,
            guiche : this.resumo.meuGuiche
        }
        this.http.post("http://192.168.0.3/aluno/ws/alison/",
        JSON.stringify(post),
            {headers : this.headers})
            .subscribe(data =>{
                if(data != null){

                    this.resumo.senhaAtual = data[0]["senha"];
                }
            });  
    }

    listaDePacientes(){
        this.http.post("http://192.168.0.3/aluno/ws/alison/",
        JSON.stringify({opt:1}),{headers : this.headers})
        .subscribe(data => {
            this.pacientes = data;
        });
    }

    carregarPaciente(paciente){
        this.paciente = paciente;
    }

}
