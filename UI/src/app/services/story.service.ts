import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { AppConfig } from '../shared/config';
import { environment } from 'src/environments/environment';
import { Story } from '../models/story';

@Injectable()
export class StoryService {
    apiLink = environment.apiUrl;

    constructor(private commonService: CommonService) {

    }
    create(model: Story) {
        return this.commonService.requestHandler('post', this.apiLink, AppConfig.API_ENDPOINTS.STORY, model, {});
    }

    findAll(pagenumber: number, status: string, sort: string) {
        let apiurl = `${AppConfig.API_ENDPOINTS.STORY}?pageNumber=${pagenumber}&status=${status}`;
        if (sort && sort !== '') {
            apiurl += `&sort${sort}`;
        }
        return this.commonService.requestHandler('get', this.apiLink, apiurl, {}, {});
    }
}
