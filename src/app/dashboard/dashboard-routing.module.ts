import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'transaction',
    loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
