import { BehaviorSubject, combineLatest, debounceTime, map, filter, Observable } from 'rxjs';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import Role from 'src/app/models/role'
import { FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit{
    step = 1;
    user!:User;
    isCityDirty!: boolean;
    citySearchSubject = new BehaviorSubject<string>('');
    cities: string[] = [];


    registerForm1: FormGroup = new FormGroup({
      identity_card: new FormControl("",[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(9),
      ]),
      email: new FormControl("",[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl("",[
        Validators.required,
        this.passwordMatch.bind(this),
      ]),
  });

  registerForm2: FormGroup = new FormGroup({
    city: new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      this.checkCity.bind(this),
    ]),
    street: new FormControl("",[
      Validators.required,
      Validators.minLength(2),
    ]),
    first_name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    last_name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    role: new FormControl(Role.User)
  });


  get isNextButtonDisabled() {
    return this.registerForm1.invalid;
  }

  get isRegisterButtonDisabled() {
    return this.registerForm2.invalid;
  }

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService
            ) {}

  ngOnInit(): void {
    combineLatest([
        this.citySearchSubject.pipe(debounceTime(300)),
        this.authService.getCities()
      ])
      .pipe(
        map(([searchCity,list]) =>
         list.filter((w:any, i:any) => w.includes(searchCity) && i !== 0)
        )
       )
      .subscribe((results:any) =>{this.cities = results})
  }

  passwordMatch(control: FormControl): ValidationErrors | null {
    if (!this.registerForm1) return { unMatch: null };
    const password = this.registerForm1.get('password')?.value;
    return password === control.value ? null : { unMatch: true };
  }


  onSubmit(step: number) {
    if (step === 1) {
      this.onSubmit1();
    } else {
      this.onSubmit2();
    }
  }

  onSubmit1() {
    if(this.registerForm1.valid){
      this.step = 2;
    }else{
      this.registerForm1.markAllAsTouched();
    }
  }

  async onSubmit2(){
    if(this.registerForm2.valid){
      const user:any = { ...this.registerForm1.value, ...this.registerForm2.value };
      delete user.confirmPassword;
      this.authService.register(user).subscribe({
        next: (res) =>{
          this.authService.setUserSubject(res.headers.get("Authorization"));
          this.toastr.success(`Your register have successfully`,'Success');
          this.router.navigate(['/login']);
        },
        error: (err) =>{
          this.toastr.error(err.error, 'Error');
          this.registerForm1.reset();
        }
      });

    }else{
      this.registerForm2.markAllAsTouched();
    }
  }

  prev() {
    this.step = 1;
  }

  onValueChange(city:string){
      this.citySearchSubject.next(city);
      this.isCityDirty = city.length > 0;
  }

  chooseCity(city: string) {
    this.registerForm2.patchValue({
      city,
    });
    this.isCityDirty = false;
  }

  checkCity(control: FormControl) {
    if (!this.cities) return { notExist: true };
    return this.cities.includes(control.value) ? null : { notExist: true };
  }
}

