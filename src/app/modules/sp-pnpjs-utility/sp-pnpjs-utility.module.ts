import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharepointContextService } from './sharepointcontext.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SpPnpjsUtilityModule {
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: SpPnpjsUtilityModule,
      providers: [
        SharepointContextService
      ]
    };
  }
}
