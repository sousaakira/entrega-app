import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  dados: any
  constructor(private alerta: AlertController, private api: ApiService, private toast: ToastController) {}

  ngOnInit() {
    this.loadTarefas();
  }

  loadTarefas() {
    this.api.read('tarefa')
    .then((dados: any) => {
      this.dados = dados
    })
    .catch(err => console.log(err))
  }

  async edit(value,e,st){
    const window = await this.alerta.create({
      message: "Adicionar tarefa",
      mode: 'ios',
      inputs: [
        {
          type: 'text',
          name: 'nome',
          id: 'name',
          value: value
        }
      ],
      buttons: [
        {
          text: 'Fecha',
          handler: () => {
            console.log('fecho')
          }
        },
        {
          text: 'Ok',
          handler: (dados) => {
            dados.status = st
            console.log(dados)
            this.api.update(`tarefa/${e}`,dados)
            .then((lista: any) => {
              console.log(lista)
              this.loadTarefas();
            })
            .catch(err => console.log(err))
          }
        }
      ]
    })

    await window.present()
  }

  async dell(e){

    const window = await this.alerta.create({
      mode: 'ios',
      message: 'Apagar tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Fecho')
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.api.delete(`tarefa/${e}`)
            .then((dados: any) => {
              this.loadTarefas()
            })
            .catch(err => console.log(err))
          }
        }
      ]
    })
    await window.present()
  }

  async marcar(e,st){
    console.log(e,st)
    const dados = {status: st == 0? 1 : 0}
    this.api.update(`tarefa/${e}`, dados)
    .then((dados: any) => {
      this.loadTarefas();
    })
    .catch(err => console.log(err))

    const tos = await this.toast.create({
      message: st == 0? 'Tarefa marcada como concluida' : 'Tarefa desmarcada',
      duration: 2000
    })
    await tos.present()
  }

  async addTarefa(){
    const window = await this.alerta.create({
      message: "Adicionar tarefa",
      mode: 'ios',
      inputs: [
        {
          type: 'text',
          name: 'nome',
          id: 'name'
        }
      ],
      buttons: [
        {
          text: 'Fecha',
          handler: () => {
            console.log('fecho')
          }
        },
        {
          text: 'Ok',
          handler: (dados) => {
            dados.status = 0
            console.log(dados)
            this.api.post('tarefa',dados)
            .then((lista: any) => {
              console.log(lista)
              this.loadTarefas();
            })
            .catch(err => console.log(err))
          }
        }
      ]
    })

    await window.present()
  }
}
