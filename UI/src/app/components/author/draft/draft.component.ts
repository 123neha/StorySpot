import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { getPager } from 'src/app/shared/pager.helper';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html'
})
export class DraftComponent implements OnInit {

  constructor(private storyService: StoryService) { }

  drafts: Array<Story>;
  allItems: number;
  pager: any = {};
  draftSearch: string;

  ngOnInit() {
    this.getDrafts(1);
  }

  getDrafts(pageNo: number): void {
    if (pageNo < 1 || pageNo > this.pager.totalPages) {
      return;
    }
    this.storyService.findAll(pageNo, 'draft', '').subscribe(res => {
      if (res && res.success && res.data.length) {
        this.allItems = res.totalItems;
        this.drafts = res.data;
        this.setPage(pageNo);
      } else {
        this.drafts = [];
      }
    },
      err => {

      });
  }

  setPage(page: number): void {
    this.pager = getPager(this.allItems, page);
  }

}
