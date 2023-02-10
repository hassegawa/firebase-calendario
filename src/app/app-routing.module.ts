import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'calendario', title: 'Plantão', component: CalendarioComponent },
  {path: 'usuario', title: 'Plantão', component: UserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
