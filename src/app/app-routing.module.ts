import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LearnComponent} from './components/learn/learn.component';
import {ShowDictionaryComponent} from './components/show-dictionary/show-dictionary.component';
import {SelectWordsComponent} from './components/select-words/select-words.component';
import {GroupsComponent} from './components/groups/groups.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  {path: '', component: LearnComponent},
  {path: 'dictionary', component: ShowDictionaryComponent},
  {path: 'select-words', component: SelectWordsComponent},
  {path: 'groups', component: GroupsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
