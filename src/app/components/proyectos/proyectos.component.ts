import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Iproyecto } from 'src/app/interfaces/iproyecto';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent  implements OnInit  {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	 	myProyectos: any;
		 modoEdicion: boolean = false;
		 modoNuevoRegistro: boolean = false;
		 i!: number;
		 editID!: number;
		 form: FormGroup;
		 nombreColeccion = 'proyecto';
		 datosCollection!: AngularFirestoreCollection<any>;
		 datosArray!: any[];
		 datos!: Observable<Iproyecto[]>;
		 numRegistros!: number;


	constructor( public portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {
		this.form = new FormGroup({
			descripcion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		})
	}
	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'proyecto';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion,
		{
			titulo: '',
			imagen: '',
			descripcion: ''
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
			console.log('DEBUG: getDatosArray', this.datosArray);
		})
	}
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}
	ngOnInit(): void {
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
	
	}
	
		onCrear(event: Event) {
			let objetoFormulario = this.form.controls;
			let keysForms = Object.keys(objetoFormulario);
			console.log("keysForm: ", keysForms);
			let valueForms = Object.values(objetoFormulario);
			console.log("valuesForm: ", valueForms);
	
			valueForms[0].setValue('');
			valueForms[1].setValue('');
			valueForms[2].setValue('');
			
	
			console.log("valueFormDetalles: ", valueForms[0].value);
			console.log("valueFormEstado: ", valueForms[1].value);
			console.log("valueFormInstitucion: ", valueForms[2].value);
	
			this.modoNuevoRegistro = true;
	
		}
}
