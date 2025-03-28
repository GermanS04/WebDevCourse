import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  private apiUrl = environment.apiSignUp;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required, this.validateBirthdate]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  validateBirthdate(control: any) {
    const birthDate = new Date(control.value);
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );
    return birthDate <= minAgeDate ? null : { underage: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        birth: this.formatDate(this.signupForm.value.birthdate),
        password: this.signupForm.value.password,
      };

      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {},
        error: (err) => {},
      });
      console.log(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
