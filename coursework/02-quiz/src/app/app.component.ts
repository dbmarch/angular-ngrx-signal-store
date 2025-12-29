import { Component } from '@angular/core';
import { QuestionPresenterComponent } from "./components/question-presenter/question-presenter.component";
import { SharedModule } from './shared.module';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { DoneComponent } from "./components/done/done.component";
import { BusyComponent } from './components/busy/busy.component';

@Component({
    selector: 'app-root',
    imports: [SharedModule, QuestionPresenterComponent, ToolbarComponent, ProgressComponent, DoneComponent, BusyComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-quiz';
}
