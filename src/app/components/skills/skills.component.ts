import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,  FormGroup, Validators } from '@angular/forms';
// import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Iskills } from 'src/app/interfaces/iskills';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	logoSkill = "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";
	// GPT
	itemForm!: FormGroup;
	isEditing: boolean = false;
	// miColeccionService = new FirestoreService(COLLECTION_NAME,'skills');
	items!: any[];

	mySkills: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	// form: FormGroup;
	nombreColeccion = 'skills';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Iskills[]>;
	numRegistros!: number;

	constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService, public firestore: AngularFirestore,
		private firestoreService: FirestoreService) { }

	ngOnInit():void {
		console.log('SKILLS COMPONENTS');
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		// this.firestoreService.initCollectionIfNotExists()
		// 	.then(() => {
		// 		console.log('Colección inicializada');;
		// 		// Puedes realizar otras operaciones aquí
		// 	})
		// 	.catch(error => {
		// 		console.error('Error al inicilizar la colección:',error);
		// 	});

		// this.firebaseService.getItems().subscribe(data => {
		// 	this.items = data.map(item => {
		// 		return {
		// 			id: item.payload.doc.id,
		// 			...item.payload.doc.data()
		// 		};
		// 	});
		// });
		this.itemForm = this.formBuilder.group({
			descripcion: new FormControl('', Validators.required),
			urlImagen: new FormControl('', Validators.required)
		});

		
	}

	get formControls() {
		return this.itemForm.controls;
	}
	
	addItem() {
		if (this.itemForm.invalid) {
			return;
		}
	}

	// 	const newItem = {
	// 		descripcion: this.formControls['descripcion'].value,
	// 		urlImagen: this.formControls['urlImagen'].value
	// 	};

	// 	this.firestoreService.addItem(newItem)
	// 		.then(() => {
	// 			console.log('Elemento creado correctamente');
	// 			this.itemForm.reset();
	// 		})
	// 		.catch(error => {
	// 			console.error('Error al crear el elemento:',error);
	// 		});
	// }

	editItem() {
		if (this.itemForm.invalid) {
			return;
		}

		const updatedItem = {
			descripcion: this.formControls['descripcion'].value,
			urlImagen: this.formControls['urlImagen'].value
		};
		// Lógica para actualizar el elemento en Firestore utilizando el servicio
		this.isEditing = false;
		this.itemForm.reset();
	}

	cancelEdit() {
		this.isEditing = false;
		this.itemForm.reset();
	}

	startEdit() {
		this.isEditing = true;
		// Asignar los valores actuales del elemento al formulario
		// Asignar los valores actuales del elemento al formulario
		this.formControls['descripcion'].setValue('Valor actual de la descripción');
		this.formControls['urlImagen'].setValue('Valor actual de la URL de la imagen');
	}

	deleteItem(itemId: string) {
		this.firestoreService.deleteItem(itemId)
			.then(() => {
				console.log('Elemento eliminado correctamente');
			})
			.catch(error => {
				console.error('Error al eliminar el elemento:',error);
			});
	}

	// onSubmit() {
	// 	console.log('DEBUG: onSubmit', this.form.value.descripcion);
	// 	const fdes = this.form.value.descripcion;
	// 	this.agregarRegistros([{ descripcion: `'${fdes}'` }]);
	// 	this.form.reset;
	// 	this.modoNuevoRegistro = false;
	// }

	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'skills';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion,
		{
			descripcion: '',
			urlImagen: ''
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
			console.log('DEBUG Skills: getDatosArray', this.datosArray);
		})
	}
// firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>.id: string
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}

	
	
	// 	const nuevoRegistro = this.form.value;
	// 	this.firestore.collection(this.nombreColeccion).add(nuevoRegistro)
	// 		.then(() => {
	// 			console.log('Registro agregado correctamente');
	// 			this.form.reset();
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error al agregar el registro:', error);
	// 		});
		// let des = this.form.value.descripcion;
		// console.log('add', des);
		// alert(des);
		// console.log('des',[{ descripcion: des }]);
		
		// this.agregarRegistros([{ descripcion: des }]);
	// }


	// agregarRegistros(registros: any[]): void {
	// 	console.log('DEBUG: agregarRegistros', registros, 'Cantidad:', registros.length);
	// 	const batch = this.firestore.firestore.batch();
	// 	registros.forEach((registro) => {
	// 		const nuevoDocumentoRef = this.datosCollection.ref.doc();
	// 		batch.set(nuevoDocumentoRef, registro);
	// 	});
	// 	batch.commit()
	// 		.then(() => {
	// 			console.log('Registros agregados correctamente');
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error al agregar los registros:', error);
	// 		});
	// }
	/* **************************************************************************************************** */
	// borrarRegistro(documentId: string) {
	// 	console.log('DEBUG: borrarRegistro:', documentId);
	// 	this.firestore.collection(this.nombreColeccion).doc(documentId).delete()
	// 		.then(() => {
	// 			console.log('Registro eliminado correctamente');
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error al eliminar el registro:', error);
	// 		});
	// }

	onCrear() {
	
		this.modoNuevoRegistro = true;
	}

	// onEdit(id: number, i: number, event: Event) {
	// 	this.editID = id;
	// 	this.i = i;
	// 	console.log("i", i);
	// 	console.log("editID", this.editID);
	// 	console.log("this.form.value: ", this.form.value);
	// 	console.log("id: ", id);

	// 	this.form.setValue({
	// 		descripcion: this.mySkills[i].descripcion,
	// 		urlImagen: this.mySkills[i].urlImagen
	// 	})
	// 	console.log("this.form.value: ", this.form.value);
	// 	this.modoEdicion = true;
	// }

	// onSaveEdit(event: Event) {
	// 	event.preventDefault;
	// 	this.portfolioData.putSkill(this.form.value, this.editID).subscribe(data => {
	// 		console.log("this.form.value: ", this.form.value);
	// 		console.log("id: ", this.editID);
	// 		console.log("SKILL method PUT Data Editada", data);

	// 		this.portfolioData.obtenerOneDatosSkill(this.editID).subscribe(data => {
	// 			console.log("Dato: " + JSON.stringify(data));
	// 			this.mySkills[this.i] = data;
	// 			console.log("mySkills[i : ", this.mySkills[this.i]);
	// 		});

	// 	});
	// 	this.modoEdicion = false;
	// }

	// onSaveNewNuevoRegistro() {
		// event.preventDefault;
		// this.portfolioData.postSkill(this.form.value).subscribe(data => {
		// 	console.log("this.form.value: ", this.form.value);
		// 	console.log("SKILL method POST Data Enviada", data);

		// 	this.portfolioData.obtenerDatosSkills().subscribe(data => {
		// 		this.mySkills = data;
		// 	});
		// });
	// 	this.agregarRegistro();
	// 	this.modoNuevoRegistro = false;
	// }

	// onCancelNuevoRegistro() {
	// 	this.modoNuevoRegistro = false;
	// }

	// onCancel(event: Event) {
	// 	let objetoFormulario = this.form.controls;
	// 	let keysForms = Object.keys(objetoFormulario);
	// 	console.log("keysForm: ", keysForms);
	// 	let valueForms = Object.values(objetoFormulario);
	// 	console.log("valuesForm: ", valueForms);
	// 	valueForms[0].setValue('');
	// 	valueForms[1].setValue('');
	// 	console.log("valueFormDetalles: ", valueForms[0].value);
	// 	console.log("valueFormEstado: ", valueForms[1].value);
	// 	this.modoEdicion = false;
	// }

	// onDelete(i: any,id: string, event: Event) {
	// 	this.i = i;
	// 	this.modoEdicion = false;
	// 	event.preventDefault;
	// 	Swal.fire({
	// 		title: `¿ELIMINAR SKILL ${(this.mySkills[i].descripcion).toUpperCase()}?`,
	// 		text: "No podrá revertir los cambios.",
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#d33',
	// 		cancelButtonColor: '#00b5ff',
	// 		confirmButtonText: 'Si, Eliminar.',
	// 		cancelButtonText: 'Cancelar'
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			this.portfolioData.deleteSkill(this.mySkills[i].id).subscribe(data => {
	// 				console.log("Borrando registro", data);

	// 				this.portfolioData.obtenerDatosSkills().subscribe(data => {
	// 					this.mySkills = data;
	// 				});

	// 			});

	// 			Swal.fire({
	// 				title: 'ITEM ELIMINADO',
	// 				icon: 'success',
	// 				showConfirmButton: false,
	// 				timer: 1000
	// 			})
	// 		}
	// 	})
	// }
}
