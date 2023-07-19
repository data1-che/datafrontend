import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
	usuarioLogueado!: boolean;
	userAlias!: any;
	imagenPerfil: Observable<string | null> | undefined;
	loginActive: Boolean = true;
	registerActive: Boolean = false;
	portfolioActive: Boolean = false;
	pageNotFoundActive: Boolean = false;

	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";

	constructor(private router: Router, private afAuth: AngularFireAuth,
		private firestore: AngularFirestore) { }

	ngOnInit(): void {
		console.log("DEBUG: NATBAR, ruta activa -ln32-:", this.router.url);
		this.afAuth.onAuthStateChanged((user) => {

			if (user) {
				this.imagenPerfil = this.firestore
					.doc<any>(`users/${user.uid}`)
					.valueChanges()
					// .pipe( map( (userData) => userData?.profileImage));
					.pipe(map((userData) => userData?.photoURL));
				this.userAlias = this.firestore
					.doc<any>(`users/${user.uid}`)
					.valueChanges()
					// .pipe( map( (userData) => userData?.profileImage));
					.pipe(map((userData) => userData?.displayName));
				this.usuarioLogueado = true;
				this.router.navigate(['/portfolio']);
				// alert('USUARIO LOGUEADO:' + this.usuarioLogueado + ' Alias: ' + this.userAlias);
			} else {
				this.usuarioLogueado=false;
				// this.imagenPerfil = undefined;
			}
		});
		switch(this.router.url) {
			case '/login': {
				this.loginActive = true;
				this.registerActive = false;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				break;
			}
			case '/register': {
				this.loginActive = false;
				this.registerActive = true;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				break;
			}
			case '/portfolio': {
				this.loginActive = false;
				this.registerActive = false;
				this.portfolioActive = true;
				this.pageNotFoundActive = false;
				break;
			}
			default: {
				this.loginActive = true;
				this.registerActive = false;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				break;
			}
		}
	}

	login() {
		this.router.navigate(['/login']);
		console.log('DEBUG: NATBAR -ln88-');
		
	}
	registrarse() {
		this.router.navigate(['/register']);
		console.log('DEBUG: NATBAR -ln93-');
	}
	logout() {
		this.afAuth.signOut()
			.then(() => {
				console.log('Cierre de sesión exitoso -ln95-');
				this.loginActive = true;
				this.registerActive = false;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				this.router.navigate(['/login']);
				console.log('Ruta activa -ln100-:',this.router.url);
				
				this.usuarioLogueado = false;
				// this.userAlias = '';
			})
			.catch(error => console.error('Error al cerrar sesión', error));
	}
}