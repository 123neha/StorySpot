import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { AppConfig } from '../shared/config';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserService {
    apiLink = environment.apiUrl;

    constructor(private commonService: CommonService) {

    }

    login(email: string, password: string) {
        const model = {
            email: email,
            password: password
        };
        return this.commonService.requestHandler('post', this.apiLink, AppConfig.API_ENDPOINTS.LOGIN, model, {});
    }

    register(model: User) {
        return this.commonService.requestHandler('post', this.apiLink, AppConfig.API_ENDPOINTS.USER, model, {});
    }
}
