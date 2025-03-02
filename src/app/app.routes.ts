import { Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { FeedComponent } from './feed/feed.component';
import { LoginRegistrateComponent } from './login-registrate/login-registrate.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { SearchTopicsComponent } from './search-topics/search-topics.component';
import { DeletePageComponent } from './delete-page/delete-page.component';

export const routes: Routes = [
  {path:'', redirectTo:'feed',pathMatch:'full'},
  { path: 'delete', component: DeleteComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'login_registrate', component: LoginRegistrateComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'room-form', component: RoomFormComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'searchTopic', component: SearchTopicsComponent },
  { path: 'deletePage', component: DeletePageComponent },
];
