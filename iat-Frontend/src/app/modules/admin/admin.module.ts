import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostSujetComponent } from './components/post-sujet/post-sujet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateSujetComponent } from './components/update-sujet/update-sujet.component';
import {EdituserComponent} from "./components/edituser/edituser.component";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import { ListSujetsComponent } from './components/list-sujets/list-sujets.component';
import { ListCandidaturesComponent } from './components/list-candidatures/list-candidatures.component';
import { AddSujetComponent } from './components/add-sujet/add-sujet.component';
import { ChecksRadiosComponent } from './components/lists-tests/checks-radios.component';
import { QuestionComponent } from './components/question/question.component';
import { CalendarsComponent } from './components/calendar/calendars.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListFeedbackComponent } from './components/list-feedback/list-feedback.component';


@NgModule({
    declarations: [
        AdminDashboardComponent,
        ListUsersComponent,
        EdituserComponent,
        PostSujetComponent,
        UpdateSujetComponent,
        ListSujetsComponent,
        ListCandidaturesComponent,
        AddSujetComponent,
        ChecksRadiosComponent,
        QuestionComponent,
        CalendarsComponent,
        AddTestComponent,
        AddUserComponent,
        ListFeedbackComponent
        

    ],
    exports: [
        AdminDashboardComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AdminModule { }
