import { DropDownBtnComponent } from './shared/drop-down-btn/drop-down-btn.component';


export const routing = [
    { path: '', component: DropDownBtnComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }

]