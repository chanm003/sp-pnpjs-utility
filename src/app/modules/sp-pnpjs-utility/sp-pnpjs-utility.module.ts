import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharepointContextService } from './sharepointcontext.service';
import { SPDataService } from './sp-data.service';
import { SPRouteResolver } from './sp-route-resolver';
import { BaseSPListComponent } from './base-sp-list.component';
import { BaseSPFormComponent } from './base-sp-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})
export class SpPnpjsUtilityModule {
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: SpPnpjsUtilityModule,
      providers: [
        SharepointContextService, SPDataService, SPRouteResolver
      ]
    };
  }
}
