import { Injectable } from '@angular/core';
import pnp, { Web } from 'sp-pnp-js';

@Injectable()
export class SharepointContextService {
    environment: {production: boolean, webAbsoluteUrl?: string, userId?: number};

    constructor() {
    }

    setup(environment: {production: boolean, webAbsoluteUrl?: string, userId?: number}) {
        this.environment = environment;
        pnp.setup({
            sp: {
                headers: {
                    'Accept': 'application/json; odata=verbose'
                },
                baseUrl: this.getInfo().webAbsoluteUrl
            }
        });
    }

    getInfo(): SpPageContextInfo {
        if (this.environment.production) {
            const spPage = (<any>window);
            return {
                webAbsoluteUrl: spPage._spPageContextInfo.webAbsoluteUrl,
                userId: spPage._spPageContextInfo.userId
            };
        } else {
            return {
                webAbsoluteUrl: this.environment.webAbsoluteUrl,
                userId: this.environment.userId
            };
        }
    }

    getWeb(): Web {
        return new Web(this.getInfo().webAbsoluteUrl);
    }
}

export class SpPageContextInfo {
    webAbsoluteUrl: string;
    userId: number;
}
