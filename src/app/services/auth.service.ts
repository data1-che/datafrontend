import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import auth from 'firebase/compat/app';
import { GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth/firebase';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '@firebase/auth-types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
//   user$!: Observable<firebase.User> | null;
user: Observable<User | null>; // Variable para almacenar el usuario actual

  isLoggedIn$: Observable<string>;
  constructor(private firestore: AngularFirestore,private afAuth: AngularFireAuth, private router: Router) {
    this.user = this.afAuth.authState;
	this.isLoggedIn$ = this.getUserId();
  }
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(
		map(user => !!user)
	);
  }
 
    // Método para obtener el ID del usuario actual
	getUserId(): Observable<string> {
		return this.user.pipe(
			map(user => user ? user.uid : '')
		);
	  }
  // Método para iniciar sesión
  login(email: string, password: string): Promise<User> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          return user;
        } else {
          throw new Error('No se pudo obtener el usuario');
        }
      });
  }
  loginWithGitHub() {
	const provider = new GithubAuthProvider(); /* new auth.GithubAuthProvider() */
	this.afAuth.signInWithPopup(provider)
		.then(userCredential => {
			this.router.navigate(['/portfolio']);
			// Inicio de sesión exitoso con GitHub, puedes redirigir al usuario a otra página
		})
		.catch(error => {
			// Error en el inicio de sesión con GitHub, muestra el mensaje de error al usuario
		});
}

  logout() {
    return this.afAuth.signOut();
  }

  loginWithGoogle() {
	const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return firebase.auth().currentUser !== null;
  }
 /*  initializeAuthState() {
	this.afAuth.setPersistence(auth.Auth.Persistence.LOCAL)
	  .then(() => console.log('Persistencia local habilitada'))
	  .catch(error => console.log('Error al habilitar la persistencia local:', error));
  } */
/* 
	createUserInFirestore(user: firebase.user): Promise<void> {
		const userRef = this.firestore.collection('users').doc(user.uid);
		return userRef.set({
			uid: user.uid,
			email: user.email,
		});
	} */

	getUserFromFirestore(uid: string): Observable<any> {
		const userRef = this.firestore.collection('users').doc(uid);
		console.log(userRef);
		
		return userRef.valueChanges();
	}

	getCurrentUser() {
		return this.afAuth.user;
	}


}
