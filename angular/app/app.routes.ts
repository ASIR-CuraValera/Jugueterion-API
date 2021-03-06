import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { UserEditComponent } from './components/user.edit.component';
import { JugueteNewComponent } from './components/juguete.new.component';
import { JugueteEditComponent } from './components/juguete.edit.component';
import { JugueteDetailComponent } from './components/juguete.detail.component';
import { DefaultComponent } from './components/default.component';
import { SearchComponent } from './components/search.component';
import { ProfileComponent } from './components/profile.component';

export const routes: RouterConfig = [
	{
		path: '',
		redirectTo: '/index',
		terminal: true
	},
	{ path: 'index', component: DefaultComponent },
	{ path: 'index/:page', component: DefaultComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:id', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'user-edit', component: UserEditComponent },
	{ path: 'create-juguete', component: JugueteNewComponent},
	{ path: 'edit-juguete/:id', component: JugueteEditComponent},
	{ path: 'juguete/:id', component: JugueteDetailComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'search/:search', component: SearchComponent },
	{ path: 'search/:search/:page', component: SearchComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'profile/:user', component: ProfileComponent },
	{ path: 'profile/:user/:page', component: ProfileComponent }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
