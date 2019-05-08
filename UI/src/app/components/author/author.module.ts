import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';

import { DraftComponent } from './draft/draft.component';
import { StoryComponent } from './story/story.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { StoryService } from 'src/app/services/story.service';

import { SearchTextPipe } from 'src/app/pipes/search-text.pipe';

const routes: Routes = [
  {
    path: '', component: SideNavComponent,
    children: [
      { path: '', component: StoryComponent },
      { path: 'drafts', component: DraftComponent },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [StoryService],
  declarations: [
    DraftComponent,
    StoryComponent,
    SideNavComponent,
    SearchTextPipe]
})
export class AuthorModule { }
