import { LoginPageComponent } from './login-page/login-page.component';

export const routing = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },





    { path: '**', redirectTo: '', pathMatch: 'full' }

]