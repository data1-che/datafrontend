import { Component, OnInit } from '@angular/core';
import auth from 'firebase/compat/app';
import firebase from '@firebase/app-compat';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
	user = firebase.auth().currentUser;
	ngOnInit(): void {
		console.log('DEBUG: PORTFOLIO'+this.user);
		if (this.user) {
			alert('Bienvenido: '+this.user);
			console.log('DEBUG: Portfolio');
		}
	}
}
