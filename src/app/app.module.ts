// npm
// import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
// import {makeStateKey, StateKey, TransferState} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../environments/environments';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HotToastModule } from '@ngneat/hot-toast';
// import { CloudinaryModule } from "@cloudinary/ng";

// che
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
// import { PortfolioService } from './services/portfolio.service';
import { Che404Component } from './components/che404/che404.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SoftskillsComponent } from './components/softskills/softskills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { EducacionService } from './services/educacion.service';
import { FirebaseService } from './services/firebase.service';
import { InterceptorService } from './services/interceptor.service';
// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RegisterComponent } from './components/register/register.component';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { IngresarComponent } from './components/ingresar/ingresar.component';
// import { CloudinaryConfig } from '@cloudinary/url-gen';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MiDialogComponent } from './components/mi-dialog-component/mi-dialog-component.component';
import { ErrorHandlingModule } from './modules/error-handling/error-handling.module';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

const materialModules = [
	MatButtonModule,
	MatCardModule,
	MatSnackBarModule,
	// MatDatepickerModule,
	// MatNativeDateModule,
	MatSliderModule,
	MatToolbarModule,
	MatIconModule,
	MatInputModule,
	MatDialogModule,
	MatFormFieldModule,
	MatDividerModule,
	MatListModule,
	MatMenuModule
];

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		BannerComponent,
		FooterComponent,
		Che404Component,
		EducacionComponent,
		ExperienciaComponent,
		SkillsComponent,
		SoftskillsComponent,
		ProyectosComponent,
		PortfolioComponent,
		LoginComponent,
	  	AboutMeComponent,
		ContactFormComponent,
    	RegisterComponent,
    	MiDialogComponent,
     ImageGalleryComponent
	],

	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		// CloudinaryModule,
		materialModules,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
		// provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()), 
		// HotToastModule.forRoot(),
		FontAwesomeModule,
		ErrorHandlingModule
	],
	providers: [],
	bootstrap: [AppComponent],

})
export class AppModule { }
