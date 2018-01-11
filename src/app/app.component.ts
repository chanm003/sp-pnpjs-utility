import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { SharepointContextService } from '../../public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sharepointContextService: SharepointContextService) {
    this.sharepointContextService.setup(environment);
  }
}
