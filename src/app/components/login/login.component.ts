import { Component, OnInit } from '@angular/core';
// import { User, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import auth from 'firebase/compat/app';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	// email: string = '';
	// password: string = '';
	// emailFormControl = new FormControl(",[Validators.required,Validators.email,])");
	form: FormGroup;

	constructor(private authService: AuthService, private autenticacionService: AutenticacionService, private afAuth: AngularFireAuth, private router: Router, private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			//email: ['', [Validators.required, Validators.email]],
			email: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(8)]]

		})
	}
	ngOnInit() {
		console.log('DEBUG: Login');
	}
	get email(): any {
		return this.form.get('email');
	}
	get password(): any {
		return this.form.get('password');
	}
	loginWithGoogle() {
		this.authService.loginWithGoogle();
	}
	loginWithGitHub() {
		this.authService.loginWithGitHub();
	}
	async login(email: string, password: string) {
		await this.afAuth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				this.router.navigate(['/portfolio']);
				console.log('Inicio de sesión exitoso, puedes redirigir al usuario a otra página');
			})
			.catch((error) => {
				console.log('Error de inicio');
				console.error('Error de inicio de sesión:', error);
				// Error en el inicio de sesión, muestra el mensaje de error al usuario
			});
	}

	// forgotPassword() {
	// this.afAuth.sendPasswordResetEmail(this.email)
	// .then(() => {
	// Email de recuperación de contraseña enviado
	// })
	// .catch(error => {
	// Error al enviar el email de recuperación de contraseña, muestra el mensaje de error al usuario
	// });
	// }

	deleteAccount() {
		const user = this.afAuth.currentUser;
		if (user) {
			user.then(currentUser => {
				if (currentUser) {
					currentUser.delete()
						.then(() => {
							// Cuenta eliminada correctamente
						})
						.catch(error => {
							// Error al eliminar la cuenta, muestra el mensaje de error al usuario
						});
				}
			});
		}
	}

	onLogin(event: Event) {
		event.preventDefault;
		// let email1 = document.getElementById("email");
		this.autenticacionService.login(this.form.value).subscribe(data => {
			sessionStorage.setItem('token', data.token);
			this.autenticacionService.setToken(data.token);
			console.log("Archivo Login Component , seteo del token: ", data.token);
		});
		// var email11 = this.email1.trim().toLowerCase();
		// var password1 = document.getElementById("password");
		const { email, password } = this.form.value;
		console.log('DEBUG: Login - onLogin', this.form.value);
		console.log('Email:', this.email, ' Password:', this.password);
		this.login(this.email, this.password);
		// this.authService.login((this.email1) , this.password);
		// this.authService.login(this.email, this.password);
		// this.router.navigate(['/portfolio']);
	}
}
