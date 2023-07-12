import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Iexperiencia } from 'src/app/interfaces/iexperiencia';
@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;
	nombreColeccion = 'experiencia';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Iexperiencia[]>;
	numRegistros!: number;

	constructor( public portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {
			this.form = new FormGroup({
				ubicacion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
				puesto: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
				periodo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
				empresa: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
				actividades: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			})
		}

		verificarYCrearMiColeccion(): void {
			const nombreColeccion = 'experiencia';
			this.firebaseService.verificarYCrearColeccion(nombreColeccion,
			{
				ubicacion: '',
				puesto: '',
				periodo: '',
				empresa: '',
				actividades: ''
			});
		}
		  
		getNumRegistros(): void {
			this.datosCollection?.get().subscribe((snapshot) => {
				this.numRegistros = snapshot.size;
				console.log("REG:", this.numRegistros);
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
	ngOnInit(): void {
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
	}		
}