import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { HotToastModule } from '@ngneat/hot-toast';

const materialModules = [
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSliderModule,
	MatToolbarModule,
	MatIconModule,
	MatFormFieldModule,
	MatMenuModule
];

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		NavbarComponent,
		FooterComponent,
		BannerComponent,
		PortfolioComponent,
		EducacionComponent,
		ProyectosComponent,
		SobremiComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		HttpClientModule,
		materialModules,
		BrowserAnimationsModule,
		HotToastModule.forRoot(),
		FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
