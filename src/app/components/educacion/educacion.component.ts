// ------------------------------------ EDUCACION.COMPONENT.TS ------------------------------------
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FirebaseService } from './../../services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ieducacion } from './../../interfaces/ieducacion';

@Component({
	selector: 'app-educacion',
	templateUrl: './educacion.component.html',
	styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	esc24 = "https://drive.google.com/uc?export=download&id=1KlTxw0mNNOAG03NfRlrwiisaoDUcuuIQ";
	nombreColeccion = 'educacion';
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Ieducacion[]>;
	numRegistros!: number;

	editMode = false;
	dialogForm: FormGroup;
	educacionCollection: AngularFirestoreCollection<Ieducacion>;

	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	// @ViewChild('dialogDeleteTemplate', { static: true }) dialogDeleteTemplate!: TemplateRef<any>;
	educacionItems: Observable<Ieducacion[]>;

	dialogData: Ieducacion = {
		// id: '',
		escuela: '',
		titulo: '',
		imagen: '',
		carrera: '',
		puntaje: 100,
		inicio: '',
		fin: ''
	};

	modoNuevoRegistro: boolean = false;
	isEditing: boolean = false;
	// miColeccionService = new FirestoreService(COLLECTION_NAME,'skills');
	items!: any[];
	modoEdicion: boolean = false;
	editID!: number;
	selectedEducacion: any = {};
	educacion!: Observable<any[]>;
	id: any;
	constructor(private firebaseService: FirebaseService,
		public firestore: AngularFirestore,
		private dialog: MatDialog) {
		this.educacionCollection = this.firestore.collection<Ieducacion>('educacion');
		this.educacionItems = this.educacionCollection.valueChanges();
		this.dialogForm = new FormGroup({
			// id: new FormControl('', Validators.required),
			escuela: new FormControl('', Validators.required),
			titulo: new FormControl('', Validators.required),
			imagen: new FormControl('', Validators.required),
			carrera: new FormControl('', Validators.required),
			puntaje: new FormControl('', Validators.required),
			inicio: new FormControl('', Validators.required),
			fin: new FormControl('', Validators.required)
		});
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion();
		console.log('DEBUG: Educacion');
	}

	readDocument(documentId: string) {
		this.firestore.collection('educacion').doc(documentId).snapshotChanges().subscribe(snapshot => {
		  const data = snapshot.payload.data();
		  const id = snapshot.payload.id;
	  
		  // Utiliza el ID y los datos del documento como desees
		  console.log('ID:', id);
		  console.log('Datos:', data);
		});
	  }
	// private storage: AngularFireStorage,

	openAddDialog(): void {
		this.editMode = false;
		// const id1 = this.firestore.createId();

		this.dialogData = {
			// id: id1,
			escuela: '',
			titulo: '',
			imagen: '',
			carrera: '',
			puntaje: 100,
			inicio: '',
			fin: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Ieducacion): void {
		this.editMode = true;
		this.dialogData = { ...item };
		this.openDialog();
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(this.dialogTemplate);
		dialogRef.afterClosed().subscribe(() => {

		});
	}

	
	saveItem(): void {
		if (this.editMode) {
			// Guardar cambios
			this.educacionCollection.doc().update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			this.educacionCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	deleteItem(item: any): void {
		// Eliminar el elemento de la colección en Firebase
		const dialogRef = this.dialog.open(ConfirmationDialogComponent);
		dialogRef.afterClosed().subscribe((result) => {
			if(result === 'confirm') {
				this.firebaseService.deleteRecord(this.nombreColeccion,item); 
			}
		});
	}

	ngOnInit(): void {
		console.log('DEBUG: Educacion', this.nombreColeccion);
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.educacionCollection = this.firestore.collection<any>(this.nombreColeccion);
		this.educacion = this.educacionCollection.snapshotChanges().pipe(map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
	}

	verificarYCrearMiColeccion(): void {
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion, {
			escuela: 'Escuela',
			titulo: 'Titulo',
			imagen: '',
			carrera: '',
			puntaje: 100,
			inicio: '',
			fin: ''
		});
	}

	getDatosArray(): void {
		this.datosCollection.snapshotChanges().pipe(
			map((snapshots) => {
				return snapshots.map((snapshot) => {
					const data = snapshot.payload.doc.data();
					const id = snapshot.payload.doc.id;
					return { id, ...data };
				});
			})
		).subscribe((array) => {
			this.datosArray = array;
			console.log('DEBUG EDUCACIÓN datosArray tipo:', typeof (this.datosArray), Object.entries(array));
			console.log('DEBUG EDUCACIÓN: getDatosArray', this.datosArray, ' length: ', this.datosArray.length);
		})
	}
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
		});
	}
	modoReg(estado: boolean) {
		this.modoNuevoRegistro = estado;
	}

}

@Component({
	selector: 'app-confirmation-dialog',
	template: `
	<h2>¿Está seguro de que desea eliminar?</h2>
	<button (click)="dialogRef.close('cancel')">Cancelar</button>
	<button (click)="dialogRef.close('confirm')">Eliminar</button>
	`,
})
export class ConfirmationDialogComponent {
	constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
}