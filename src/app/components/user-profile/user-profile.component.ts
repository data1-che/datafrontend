import { Component, OnInit } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { UsersService } from './../../services/users.service';
// import firebase from '@firebase/app-compat';
import { Users } from '../../interfaces/user';
import { Observable, map } from 'rxjs';
// import { User, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
// import auth from 'firebase/compat/app';
// import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	// collectionRef: AngularFirestoreCollection<Users>;
	// cr: any = [];/* private us: UsersService, */
	// datosCollection!: AngularFirestoreCollection<Users>;
	// datosArray!: any[];
	user: any;
	// user = firebase.auth().currentUser;
	// ,private firestorec: AngularFirestoreCollection
	// constructor(private authService: AuthService, private firestore: AngularFirestore,private afAuth: AngularFireAuth, private router: Router) {
	constructor(private authService: AuthService) {
		// this.collectionRef = this.firestore.collection("users");
		// this.cr=this.collectionRef;
		// const fakeStock = new AngularFirestoreCollection(this.collectionRef, query);
		// this.afAuth.authState.subscribe(user => {
		// 	this.user = user;
		// });
	}
	ngOnInit() {
		this.authService.getCurrentUser().subscribe(user => {
			if (user) {
				this.authService.getUserFromFirestore(user.uid).subscribe(userData => {
					this.user = userData;
				});
			}
		});
	}

	/* listAllUser() {
		const listAllUsers = (nextPageToken) => {
			// List batch of users, 1000 at a time.
			getAuth()
			  .listUsers(1000, nextPageToken)
			  .then((listUsersResult) => {
				listUsersResult.users.forEach((userRecord) => {
				  console.log('user', userRecord.toJSON());
				});
				if (listUsersResult.pageToken) {
				  // List next batch of users.
				  listAllUsers(listUsersResult.pageToken);
				}
			  })
			  .catch((error) => {
				console.log('Error listing users:', error);
			  });
		  };
		  // Start listing users from the beginning, 1000 at a time.
		  listAllUsers();
	} */
	// getDatosArray(): void {
	// 	this.datosCollection.snapshotChanges().pipe(
	// 		map((snapshots) => {
	// 			return snapshots.map((snapshot) => {
	// 				const data = snapshot.payload.doc.data();
	// 				const id = snapshot.payload.doc.id;
	// 				return { id, ...data };
	// 			});
	// 		})
	// 	).subscribe((array) => {
	// 		this.datosArray = array;
	// 		console.log('DEBUG: getDatosArray', this.datosArray);
	// 	})
	// }

	// NOTE!: the updates are performed on the reference not the query await fakeStock.add({ name: 'FAKE', price: 0.01 });

	// Subscribe to changes as snapshots. This provides you data updates as well as delta updates. fakeStock.valueChanges().subscribe(value => console.log(value));    
	// get(): Observable<Ipersona[]> { 
	// return this.personaCollection.valueChanges(); 
	// return this.personaCollection;


	/* 
		getPersona(nombres: string) {
			this.firestore.docData(`persona/${id}`)
		} */
}
/* export Interface UserProfile {
	username: string;
} */

/* Reading data
In Cloud Firestore data is stored in documents and documents are stored in collections. The path to data follows <collection_name>/<document_id> and continues if there are subcollections. For example, "users/ABC1245/posts/XYZ6789" represents:

users collection
document id ABC12345
posts collection
document id XYZ6789
Let's explore reading data in Angular using the collection and collectionData functions. */