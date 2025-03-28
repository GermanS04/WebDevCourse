import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-pass',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent {
  private apiURL = environment.apiForgotPass;
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const formData = {
        email: this.forgotPasswordForm.value.email,
      };

      this.http.post(this.apiURL, formData).subscribe({
        next: (response) => {},
        error: (err) => {},
      });
    }
  }
}
