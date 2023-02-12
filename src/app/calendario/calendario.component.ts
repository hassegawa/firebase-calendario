import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { FullCalendarComponent } from '@fullcalendar/angular';

export interface usuario {
  nome: string;
  telefone: string;
  cor: string;
}

export interface grupo {
  id: number;
  primario: usuario;
  secudario: usuario;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements AfterViewInit {
  
  dataInicial!: Date;
  dataFinal!: Date;
  eventos: Array<any> = [];

  grupos: Array<grupo> = [
    { id: 1, primario: { nome : 'Marcio', telefone: '(11)1234-56789', cor: '#3788d8'}, secudario: { nome : 'Marcos C', telefone: '(11)1234-56789', cor: '#3EE7B9' }},
    { id: 2, primario: { nome : 'Grella', telefone: '(11)1234-56789', cor: '#D16E0A'}, secudario: { nome : 'Bona', telefone: '(11)1234-56789', cor: '#C0CD52'}},
    { id: 3, primario: { nome : 'Marcos R', telefone: '(11)1234-56789', cor: '#3788d8'}, secudario: { nome : 'Sperotto', telefone: '(11)1234-56789', cor: '#3EE7B9'}},
    { id: 4, primario: { nome : 'Marcos C', telefone: '(11)1234-56789', cor: '#D16E0A'}, secudario: { nome : 'Marcio', telefone: '(11)1234-56789', cor: '#C0CD52' }},
    { id: 5, primario: { nome : 'Bona', telefone: '(11)1234-56789', cor: '#3788d8'}, secudario: { nome : 'Grella', telefone: '(11)1234-56789', cor: '#3EE7B9'}},
    { id: 6, primario: { nome : 'Sperotto', telefone: '(11)1234-56789', cor: '#D16E0A'}, secudario: { nome : 'Marcos R', telefone: '(11)1234-56789', cor: '#C0CD52' }}
  ] ;

  constructor(){
    
    // this.grupos.set(1, { primario: { nome : 'Marcio' , telefone: '(11)1234-56789'}, secundario: { nome : 'Marcos C' , telefone: '(11)1234-56789'}} );
    // this.grupos.set(2, { primario: { nome : 'Grella' , telefone: '(11)1234-56789'}, secundario: { nome : 'Bona' , telefone: '(11)1234-56789'} } );
    // this.grupos.set(3, { primario: { nome : 'Marcos R' , telefone: '(11)1234-56789'}, secundario: { nome : 'Sperotto' , telefone: '(11)1234-56789'} } );
    // this.grupos.set(4, { primario: { nome : 'Marcos C' , telefone: '(11)1234-56789'}, secundario: { nome : 'Marcio' , telefone: '(11)1234-56789'} } );
    // this.grupos.set(5, { primario: { nome : 'Bona' , telefone: '(11)1234-56789'}, secundario: { nome : 'Grella' , telefone: '(11)1234-56789'} } );
    // this.grupos.set(6, { primario: { nome : 'Sperotto' , telefone: '(11)1234-56789'}, secundario: { nome : 'Marcos R' , telefone: '(11)1234-56789'} } );

    var data1 = new Date(2023,0,2,9,0);
    var data2 = new Date(2023,0,8,23,59);

    let idGrupo = 3;

    for(let i = 1; i <= 52; i++ ){
      if (idGrupo > 5) {
        idGrupo = 0;
      }

      let grupo = this.grupos[idGrupo];
  
      //let data2.setDate(data1.getDate() + 7);
      this.eventos.push(
        {
          title  : 'Primário - ' + grupo.primario.nome + ' ' + grupo.primario.telefone,
          start  : data1.toISOString(),
          end  : data2.toISOString(),
          backgroundColor : grupo.primario.cor,
          allDay : false 
        }
      );
      this.eventos.push(
        {
          title  : 'Secundário - ' + grupo.secudario.nome + ' ' + grupo.secudario.telefone,
          start  : data1.toISOString(),
          end  : data2.toISOString(),
          backgroundColor : grupo.secudario.cor,
          allDay : false 
        }
      );

      data1.setDate(data1.getDate() + 7);
      data2.setDate(data2.getDate() + 7);
      idGrupo++;
    }

    this.eventos.push(
      {
        title  : 'Carnaval',
        start  : new Date(2023,1,20,0,0),
        end  : new Date(2023,1,22,23,59),
        backgroundColor : 'red',
        allDay : false 
      }
    );
  }


  @ViewChild('calendarioComp', { static: true }) myCalendar: FullCalendarComponent | undefined;

  getWeekNumber(date: Date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
  };

  ngAfterViewInit() {
    if (this.myCalendar) {
      console.log(this.getWeekNumber(this.myCalendar.getApi().view.activeStart));
      console.log(this.getWeekNumber(this.myCalendar.getApi().view.activeEnd));
    }
  }

  getDate() {
    console.log(this.getWeekNumber(this.dataInicial));
    console.log(this.getWeekNumber(this.dataFinal));
  }
  
  fullcal_datesSet(arg: DatesSetArg){
    this.dataInicial = arg.view.activeStart;
    this.dataFinal = arg.view.activeEnd;
  }

  handleDateClick(event: any){
    console.log(event.event._def.title);
    console.log(event.event._def.start);
    console.log(event.event._def.end)
  }
  
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    firstDay: 0, //0 - domingo, 1 -segunda ...
    locale: ptBrLocale,
    displayEventTime: true,
    weekNumbers: true,
    eventClick: this.handleDateClick.bind(this), 
    datesSet: this.fullcal_datesSet,
    events: this.eventos
  };

}
