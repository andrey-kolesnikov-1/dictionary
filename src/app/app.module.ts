import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {LearnComponent} from './components/learn/learn.component';
import {ShowDictionaryComponent} from './components/show-dictionary/show-dictionary.component';
import {SelectWordsComponent} from './components/select-words/select-words.component';
import {GroupsComponent} from './components/groups/groups.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {WordComponentComponent} from './components/word-component/word-component.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {LiteWordComponent} from './components/select-words/lite-word/lite-word.component';
import {MatSelectModule} from '@angular/material/select';
import {CardComponent} from './components/groups/card/card.component';
import {SuperLiteWordComponent} from './components/groups/super-lite-word/super-lite-word.component';
import {InfoComponent} from './components/info/info.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ToggleTurnComponent} from './components/toggle-turn/toggle-turn.component';
import {SoundDirective} from './directives/sound.directive';


@NgModule({
  declarations: [
    AppComponent,
    LearnComponent,
    ShowDictionaryComponent,
    SelectWordsComponent,
    GroupsComponent,
    NotFoundComponent,
    WordComponentComponent,
    DialogComponent,
    LiteWordComponent,
    CardComponent,
    SuperLiteWordComponent,
    InfoComponent,
    ToggleTurnComponent,
    SoundDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
