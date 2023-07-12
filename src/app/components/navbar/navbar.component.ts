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
	imagenPerfil: Observable<string | null> | undefined;
  	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";

	constructor( private router: Router,private afAuth: AngularFireAuth,
		private firestore: AngularFirestore) {}

	ngOnInit(): void {
		console.log("DEBUG: NATBAR, ruta activa:", this.router.url);
		this.afAuth.authState.subscribe((user) => {
			this.usuarioLogueado = !user;
			alert('USUARIO LOGUEADO:'+this.usuarioLogueado);
			if (user) {
			  this.imagenPerfil = this.firestore
				.doc<any>(`users/${user.uid}`)
				.valueChanges()
				// .pipe( map( (userData) => userData?.profileImage));
				.pipe( map( (userData) => userData?.photoURL));
			} else {
			  this.imagenPerfil = undefined;
			}
		  });
		}

		login() {
			this.router.navigate(['/login']);
		}
		registrarse() {
			this.router.navigate(['/register']);
		}
		logout() {
			this.afAuth.signOut()
				.then(() => {
					console.log('Cierre de sesión exitoso');
				})
				.catch(error => console.error('Error al cerrar sesión',error));
		}
}
