import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:'shopping', canActivate:[AuthGuard] ,loadChildren: ()=> import('./shopping/shopping.module').then(m => m.ShoppingModule)},
  {path:"", pathMatch:"full", redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

