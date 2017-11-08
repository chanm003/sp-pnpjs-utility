import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharepointContextService } from './sharepointcontext.service';
import { KeywordSearchService } from './keywordsearch.service';
import { HttpClientModule } from '@angular/common/http';

export * from './sharepointitem.model';
export * from './sharepointcontext.service';
export * from './keywordsearch.service';
export * from './httpBodyParser';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
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
      providers: [SharepointContextService, KeywordSearchService]
    };
  }
}
