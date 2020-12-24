import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagramComponent } from './pages/diagram/diagram.component';

const routes: Routes = [
  {
    path: 'diagram',
    component: DiagramComponent
  }, {
    path: '',
    redirectTo: 'diagram',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
