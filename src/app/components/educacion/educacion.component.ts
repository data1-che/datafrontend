import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'; 
// import { MatButtonModule } from '@angular/material/button';
// import { EducacionService } from './../../services/educacion.service';
import { FirebaseService } from './../../services/firebase.service';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
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
	
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	esc24="https://drive.google.com/uc?export=download&id=1KlTxw0mNNOAG03NfRlrwiisaoDUcuuIQ";
	nombreColeccion = 'educacion';
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	educacionList!: any[];
	datos: Observable<Ieducacion[]>;
	numRegistros!: number;
	// escuela: any;
	// titulo: any;
	// imagen: any;
	// carrera: any;
	// puntaje: number = 100;
	// inicio: any;
	// fin: any;

	editMode = false;
	dialogForm: FormGroup;
	educacionCollection: AngularFirestoreCollection<Ieducacion>;
	// educacionItems: Observable<Ieducacion[]>;

	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

	educacionItems: Observable<Ieducacion[]>;
	/*  = [
		this.firestore.collection('educacion').valueChanges().subscribe(data => { this.Ieducacion = data; })
	]; */
	
	dialogData: Ieducacion = {
		escuela: '',
		titulo: '',
		imagen: '',
		carrera: '',
		puntaje: 100,
		inicio: '',
		fin: ''
  	};

	
	modoNuevoRegistro: boolean = false;
	//elementos: Ieducacion[] = []; // Cambio de "elemento" a "elementos"
	
	//elementoSeleccionado: Ieducacion | null = null;

	constructor( private firebaseService: FirebaseService, 
		public firestore: AngularFirestore, private dialog: MatDialog) {
		this.educacionCollection = this.firestore.collection<Ieducacion>('educacion');
		this.educacionItems = this.educacionCollection.valueChanges();
		this.dialogForm = new FormGroup({
			escuela: new FormControl('', Validators.required),
			titulo: new FormControl('', Validators.required),
			imagen: new FormControl('', Validators.required),
			carrera: new FormControl('', Validators.required),
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
// private storage: AngularFireStorage,

	 openAddDialog(): void {
		this.editMode = false;
		this.dialogData = {
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
		this.firebaseService.deleteRecord('educacion',item);/* .delete(); */
	 }

ngOnInit(): void {
		// this.firebaseService.cargarDatosEnFirebase('educacion',this.educacionList);
		this.verificarYCrearMiColeccion();
		// this.getDatosArray();
		console.log('DEBUG: Educacion', this.nombreColeccion);
		

		// this.experienciaList=this.firebase.getDatosArray('experiencia');
		// this.educacionService.getElementos().subscribe(elementos => {
		// 	this.elementos = elementos;
		// });
		// this.logopencil = this.obtenerURLArchivo('logoPencil.png');/* .__zone_symbol__value */
		// console.log('pen',this.logopencil);
		// this.logoadd = this.cheDownloadStorage('logoAdd.png');
		// this.logoedu = this.cheDownloadStorage('logoEdu.png');
		// this.logosave = this.cheDownloadStorage('logoSave.png');
		// this.logocancel = this.cheDownloadStorage('logoCancel.png');
		// this.logodelete = this.cheDownloadStorage('logoDelete.png');
	}
	// obtenerURLArchivo(nombreArchivo: string): Observable<string> {
	// 	const referencia = this.storage.ref(nombreArchivo);
	// 	return referencia.getDownloadURL();
	//   }
	// cheDownloadStorage(fileName: string) {
	// 	const ref = this.storage.ref(fileName);
	// 	ref.getDownloadURL().subscribe( url => {
	// 		console.log('file:',fileName,' ',url);
	// 		const fURL= url;
	// 		return fURL;
	// 	});
	// }

	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'educacion';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion,{
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
        // ).subscribe((array: any[] | { [s: string]: unknown; } | ArrayLike<unknown>) => {
			).subscribe((array) => {

            this.datosArray = array;
            // console.log('DEBUG: getDatosArray', this.datosArray);
			// this.escuela = this.datosArray[0].escuela;
			// this.titulo = this.datosArray[0].titulo;
			// this.imagen = this.datosArray[0].imagen;
			// this.carrera = this.datosArray[0].carrera;
			// this.puntaje = this.datosArray[0].puntaje;
			// this.inicio = this.datosArray[0].inicio;
			// this.fin = this.datosArray[0].fin;
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
		this.modoNuevoRegistro=estado;
	}
	// obtenerElementos(): void {
	// 	this.educacionService.getElementos().subscribe(elementos => {
	// 		this.elementos = elementos;
	// 	});
	// }

	/* agregarElemento(): void {
		this.educacionService.crearElemento(this.formulario).then(() => {
			this.formulario = {
				escuela: '',
				titulo: '',
				imagen: '',
				carrera: '',
				puntaje: 100,
				inicio: '',
				fin: ''
			};
		});
	} */

	/* editarElemento(elementos: Ieducacion): void {
		console.log('editar elem');
		
		this.elementoSeleccionado = elementos;
		this.formulario = { ...elementos };
	  } */

	/* guardarEdicion(): void {
		console.log('guardar edicion');
		
		if (this.elementoSeleccionado && this.elementoSeleccionado.id !== undefined) {
			const id: string = this.elementoSeleccionado.id;
			this.educacionService.actualizarElemento(id, this.formulario).then(() => {
				this.cancelarEdicion();
			});
		}
	} */
	/* guardarElemento(): void {
		if (this.elemento.id) {
		  // Actualizar elemento existente
		  this.educacionService.actualizarElemento(this.elemento.id, this.elemento);
		} else {
		  // Crear nuevo elemento
		  this.educacionService.crearElemento(this.elemento);
		}
		this.cerrarFormulario();
	  } */
	
	 /*  cerrarFormulario(): void {
		this.elemento = {
		  escuela: '',
		  titulo: '',
		  imagen: '',
		  carrera: '',
		  puntaje: 100,
		  inicio: '',
		  fin: ''
		};
	  } */


/* 	cancelarEdicion(): void {
		this.elementoSeleccionado = null;
		this.formulario = {
			escuela: '',
			titulo: '',
			imagen: '',
			carrera: '',
			puntaje: 100,
			inicio: '',
			fin: ''
		};
	} */

	/* eliminarElemento(id?: string): void {
		if (id) {
			this.educacionService.eliminarElemento(id);
		}
	} */


	/* cerrarEdicion(): void {
		this.elementoSeleccionado = null;
		this.formulario = { escuela: '', titulo: '', imagen: '', carrera: '', puntaje: 100, inicio: '', fin: '' };
	} */
}
