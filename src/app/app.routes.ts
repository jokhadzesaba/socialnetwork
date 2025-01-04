import { Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { FeedComponent } from './feed/feed.component';
import { LoginRegistrateComponent } from './login-registrate/login-registrate.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

export const routes: Routes = [
  
  { path: 'delete', component: DeleteComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'login_registrate', component: LoginRegistrateComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'room-form', component: RoomFormComponent },
  { path: 'topics-list', component: TopicsListComponent },
];
