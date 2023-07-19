import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <h2>Forgot Password</h2>
    <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Email:</label>
        <input type="email" formControlName="email">
      </div>
      <button type="submit" [disabled]="forgotPasswordForm.invalid">Reset Password</button>
    </form>
  `
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const { email } = this.forgotPasswordForm.value;

    this.authService.resetPassword(email)
      .then(() => {
        console.log('Se ha enviado un correo de restablecimiento de contraseña');
        // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
      })
      .catch((error: any) => {
        console.log('Error en el restablecimiento de contraseña:', error);
      });
  }
}
