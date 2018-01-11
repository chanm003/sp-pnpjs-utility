import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'crudsample', },
  { path: 'crudsample', loadChildren: 'app/testapp/crudsamples/crudsamples.module#CrudsamplesModule' },
  // { path: 'spformsample', loadChildren: 'app/spformsamples/spformsamples.module#SpformsamplesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
