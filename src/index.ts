import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharepointContextService } from './sharepointcontext.service';

export * from './sharepointitem.model';
export * from './sharepointcontext.service';
export * from './httpBodyParser';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    /*components,directives, pipes */
  ],
  exports: [
    /*components,directives, pipes */
  ]
})
export class SpPnpjsUtilityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SpPnpjsUtilityModule,
      providers: [SharepointContextService]
    };
  }
}
