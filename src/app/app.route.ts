import { HeaderComponent } from './shared/header/header.component';


export const routing = [
    { path: '', component: HeaderComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }

]