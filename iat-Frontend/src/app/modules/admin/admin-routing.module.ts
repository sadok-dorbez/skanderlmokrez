import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostSujetComponent } from './components/post-sujet/post-sujet.component';
import { UpdateSujetComponent } from './components/update-sujet/update-sujet.component';
import {EdituserComponent} from "./components/edituser/edituser.component";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import {ListSujetsComponent} from "./components/list-sujets/list-sujets.component";
import {ListCandidaturesComponent} from "./components/list-candidatures/list-candidatures.component";
import {AddSujetComponent} from "./components/add-sujet/add-sujet.component";
import {ChecksRadiosComponent} from "./components/lists-tests/checks-radios.component";
import {QuestionComponent} from "./components/question/question.component";
import { CalendarsComponent } from './components/calendar/calendars.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import {AddUserComponent} from "./components/add-user/add-user.component";
import { ListFeedbackComponent } from './components/list-feedback/list-feedback.component';


const routes: Routes = [
  { path: "dashboard", component: AdminDashboardComponent},
  { path: "users", component: ListUsersComponent},
  { path: "adduser", component: AddUserComponent},
  { path: "edituser/:id", component: EdituserComponent},
  { path: "sujets", component: ListSujetsComponent},
  { path: "candidatures", component: ListCandidaturesComponent},
  { path: "addsujet", component: AddSujetComponent},
  { path: "sujet", component: PostSujetComponent},
  { path: "sujet/:id", component: UpdateSujetComponent},
  { path: "test", component: ChecksRadiosComponent},
  { path: 'question', component: QuestionComponent, data: {title: 'Question'}},
  { path: 'add-test/:sujetId', component: AddTestComponent, data: {title: 'AddTest'}},
  { path: 'calendars', component: CalendarsComponent, data: {title: 'Calendars'}}
  { path: 'feedbacks', component: ListFeedbackComponent, data: {title: 'Feedbacks'}}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
