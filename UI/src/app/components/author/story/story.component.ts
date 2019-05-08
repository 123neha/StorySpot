import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { getPager } from '../../../shared/pager.helper';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit {

  constructor(private storyService: StoryService) { }

  stories: Array<Story>;
  allItems: number;
  pager: any = {};
  storySearch: string;

  ngOnInit() {
    this.getStories(1);
  }

  getStories(pageNo: number): void {
    if (pageNo < 1 || pageNo > this.pager.totalPages) {
      return;
    }
    this.storyService.findAll(pageNo, 'published', '').subscribe(res => {
      if (res && res.success && res.data.length) {
        this.allItems = res.totalItems;
        this.stories = res.data;
        this.setPage(pageNo);
      } else {
        this.stories = [];
      }
    },
      err => {

      });
  }

  setPage(page: number): void {
    this.pager = getPager(this.allItems, page);
  }

}
