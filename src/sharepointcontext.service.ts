import { Injectable } from '@angular/core';
import pnp, { Web } from 'sp-pnp-js';

@Injectable()
export class SharepointContextService {
    environment: {production: boolean};
    devServerUrl: string;
    devUserId: number;

    constructor() {}

    setup(environment: {production: boolean}, devServerUrl: string, devUserId: number){
        this.devServerUrl = devServerUrl;
        this.devUserId = devUserId;
        this.environment = environment;

         pnp.setup({
            sp: {
                headers: {
                    'Accept': 'application/json; odata=verbose'
                },
                baseUrl: this.getInfo().currentWebAbsoluteUrl
            }
        });
    }

    getInfo(): SpPageContext {
        if (this.environment.production) {
            const spPage = (<any>window);
            return {
                currentWebAbsoluteUrl: spPage._spPageContextInfo.webAbsoluteUrl,
                currentUserId: spPage._spPageContextInfo.userId
            };
        } else {
            return {
                currentWebAbsoluteUrl: this.devServerUrl,
                currentUserId: this.devUserId
            };
        }
    }

    getWeb(): Web {
        return new Web(this.getInfo().currentWebAbsoluteUrl);
    }
}

export class SpPageContext {
    currentWebAbsoluteUrl: string;
    currentUserId: number;
}