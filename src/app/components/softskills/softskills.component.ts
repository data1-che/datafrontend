import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Isoftskills } from 'src/app/interfaces/isoftskills';
// import { CheMediaService } from 'src/app/services/che-media.service';


@Component( {
	selector: 'app-softskills',
	templateUrl: './softskills.component.html',
	styleUrls: ['./softskills.component.css']
} )


export class SoftskillsComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	mySoftskills: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;
	nombreColeccion = 'softskills';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Isoftskills[]>;
	numRegistros!: number;
	id!: string;
	cheMediaT: any;
	//   , private cheMedia: CheMediaService
	registroDoc: AngularFirestoreDocument<any>;
	registro: Observable<any>;
	//   campos = [
	// { nombre: 'Campo 1', clave: 'campo1' },
	// { nombre: 'Campo 2', clave: 'campo2' },
	camposSoftskills = [{ name: 'name' } , { urlImage: 'url' } , { level: '11' }];

// Agrega más campos según sea necesario
//   ];

constructor(public portfolioData: PortfolioService, public firestore: AngularFirestore,
	private firebaseService: FirebaseService, fb: FormBuilder) {
		this.form = new FormGroup ({
			name: new FormControl (['', [Validators.required, Validators.minLength(2)]]),
			urlImage: new FormControl ([''], [Validators.required, Validators.minLength(2)]),
			level: new FormControl (['', [Validators.required, Validators.minLength(2)]])
		});
	this.registroDoc = this.firestore.collection(this.nombreColeccion).doc(this.id);
	this.registro = this.registroDoc.valueChanges();
}

onSubmit() {
	console.log('DEBUG: onSubmit', this.form.value);
	// const fdes = this.form.value;
	this.agregarRegistros([
		{ 
			name: this.form.value.name,
			urlImage: this.form.value.urlImage,
			level: this.form.value.level
		}]);
	this.form.reset;
	this.modoNuevoRegistro = false;
}

modificarRegistro() {
	this.registroDoc.update(this.registro).then(() => {
		console.log('Registro modificado correctamente');
	}).catch(error => {
		console.error('Error al modificar el registro', error);
	});
}

onCrear(event: Event) {
	console.log("DEBUG: onCrear");
	// this.agregarRegistro();
	// let objetoFormulario = this.form.controls;
	// let keysForms = Object.keys(objetoFormulario);
	// let valueForms = Object.value(objetoFormulario);
	this.modoNuevoRegistro = true;
}
/* **************************************************************************************************** */

verificarYCrearMiColeccion(): void {
	const nombreColeccion = 'softskills';
	this.firebaseService.verificarYCrearColeccion(nombreColeccion,
		{
			descripcion: 'url'
		});
}

/* **************************************************************************************************** */
getNumRegistros(): void {
	this.datosCollection?.get().subscribe((snapshot) => {
		this.numRegistros = snapshot.size;
		console.log("REG:", this.numRegistros);
	});
}
/* **************************************************************************************************** */
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
		console.log('DEBUG: getDatosArray', this.datosArray);
	})
}
/* **************************************************************************************************** */
agregarRegistro(): void {
	console.log('DEBUG: agregarRegistro');
	// let objetoFormulario = this.form.controls;
	// let keysForms = Object.keys(objetoFormulario);
	// let valueForms = Object.values(objetoFormulario);
	// console.log('DEBUG: Objetos key y value',keysForms,valueForms);
	// valueForms[0].value;
	// console.log('DEBUG: Form value', valueForms[0]);
	// console.log('Valor', valueForms[0]);

	// this.agregarRegistros([{ descripcion: valueForms[0] }]);

	/* if (this.form.invalid) {
		alert('Formulario invalido');
		return;
	}

	const nuevoRegistro = this.form.value;
	this.firestore.collection(this.nombreColeccion).add(nuevoRegistro)
		.then(() => {
			console.log('Registro agregado correctamente');
			this.form.reset();
		})
		.catch((error) => {
			console.error('Error al agregar el registro:', error);
		}); */
	let des = this.form.value.descripcion;
	console.log('add', des);
	alert(des);
	// this.agregarRegistros([{ descripcion: des }]);
}


agregarRegistros(registros: any[]): void {
	console.log('DEBUG: agregarRegistros', registros);
	const batch = this.firestore.firestore.batch();
	registros.forEach((registro) => {
		const nuevoDocumentoRef = this.datosCollection.ref.doc();
		batch.set(nuevoDocumentoRef, registro);
	});
	batch.commit()
		.then(() => {
			console.log('Registros agregados correctamente');
		})
		.catch((error) => {
			console.error('Error al agregar los registros:', error);
		});
}
/* **************************************************************************************************** */
borrarRegistro(documentId: string) {
	console.log('DEBUG: borrarRegistro:', documentId);
	this.firestore.collection(this.nombreColeccion).doc(documentId).delete()
		.then(() => {
			console.log('Registro eliminado correctamente');
		})
		.catch((error) => {
			console.error('Error al eliminar el registro:', error);
		});
}


/* **************************************************************************************************** */

/* **************************************************************************************************** */

saveForm(): void {
	// event.preventDefault;
	this.agregarRegistro();
	console.log("Guardando cambios");
	this.modoNuevoRegistro = false;
}

onCancelNuevoRegistro() {
	this.modoNuevoRegistro = false;
}
onEdit(id: any, i: number, event: Event) {
	console.log('Entra a onEdit');

	this.editID = id;
	this.i = i;
	console.log("i", i);
	console.log("editID", this.editID);
	console.log("this.form.value: ", this.form.value);
	console.log("id: ", id);

	this.form.setValue({
		descripcion: this.datosArray[i].descripcion
	});
	console.log("this.form.value: ", this.form.value);
	this.modoEdicion = true;
}

onSaveEdit(event: Event) {
	event.preventDefault;
	// this.portfolioData.putEducacion(this.form.value, this.editID).subscribe(data => {
	console.log("this.form.value: ", this.form.value);
	console.log("id: ", this.editID);
	// console.log("EDUCACIÓN method PUT Data Editada", data);

	// this.portfolioData.obtenerOneDatosEducacion(this.editID).subscribe(data => {
	// console.log("Dato: " + JSON.stringify(data));
	// this.datosArray[this.i] = data;
	console.log("myPortfolio[i : ", this.datosArray[this.i]);
	// });

	// });
	this.modoEdicion = false;
}

onSaveNewNuevoRegistro(event: Event) {
	console.log('Entra a onSaveNewNuevoRegistro');

	event.preventDefault;
	// this.datosCollection = this.firestore.collection(this.nombreColeccion);
	// this.datos = this.datosCollection.valueChanges();
	// this.getDatosArray();
	// this.getNumRegistros();
	let ff = this.form.value;
	console.log("onSaveNewNuevoRegistro this.form.value: ", ff, this.form.value);
	this.firestore.collection(this.nombreColeccion).add(this.form.value);
	this.modoNuevoRegistro = false;
	this.modoEdicion = false;
	console.log('Sale de onSaveNewNuevoRegistro');

}
onCancel(event: Event){
	let objetoFormulario = this.form.controls;
	let keysForms = Object.keys(objetoFormulario);
	console.log("keysForm: ", keysForms);
	let valueForms = Object.values(objetoFormulario);
	console.log("valuesForm: ", valueForms);

	valueForms[0].setValue('');
	this.modoEdicion = false;
}

onDelete(i: number, id: string, event: Event) {
	console.log('DEBUG: onDelete:', i, id);
	this.i = i;
	this.id = id;
	this.modoEdicion = false;
	// event.preventDefault;
	Swal.fire({
		title: "¿ELIMINAR SKILL ?",
		text: "No podrá revertir los cambios.",
		icon: 'warning',
		confirmButtonColor: '#d33',
		confirmButtonText: 'Si, Eliminar.',
		showCancelButton: true,
		cancelButtonText: 'Cancelar',
		cancelButtonColor: '#00b5ff'
	}).then((result) => {
		if (result.isConfirmed) {
			console.log('DEBUG: onDelete result is:', result.isConfirmed);

			this.borrarRegistro(id);
			// borrarRegistro(id: string): void {
			// this.firestore.collection(this.nombreColeccion).doc(registroId).delete()
			// this.firestore.collection(this.nombreColeccion).doc(id).delete()
			// 	.then(() => {
			// 		console.log('Registro eliminado correctamente');
			// 	})
			// 	.catch((error) => {
			// 		console.error('Error al eliminar el registro:', error);
			// 	});
			//   }

		}
	});
	Swal.fire({
		title: 'ITEM ELIMINADO',
		icon: 'success',
		showConfirmButton: false,
		timer: 1000
	});
	console.log("ondelete end borrando registro");
}

ngOnInit(): void {

	this.verificarYCrearMiColeccion();
	this.datosCollection = this.firestore.collection(this.nombreColeccion);
	this.datos = this.datosCollection.valueChanges();
	this.getDatosArray();
	this.getNumRegistros();
	/* this.cheMedia.getMedia().subscribe(data => {
		this.cheMediaT = data;
		console.log('DEBUG: getmedia', this.cheMediaT);
		
	}); */
	// this.agregarRegistros([{ descripcion: 'Descripcion add new 1' }]);
	// this.agregarRegistros([{ descripcion: 'Descripcion add new 2' }]);

}
}

