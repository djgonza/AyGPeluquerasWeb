import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagesService } from './../../services/images.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public navCtrl: NavController,
		private camera: Camera,
		private imagesService: ImagesService
		) {}

	private loadImagen() {

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			this.imagesService.saveImage({
				"nombre": this.generateRandomName(20) + ".jpg",
				"data": imageData
			}).subscribe((data) => {
				console.log(data);
			}, err => {
				console.log("error en service", err);
			});
		}, (err) => {
			console.log("error en camera picture", err);
		});
	}

	private generateRandomName (len) {
		var arr = new Uint8Array((len || 40) / 2)
		window.crypto.getRandomValues(arr)
		return Array.from(arr, (dec) => {
			return ('0' + dec.toString(16)).substr(-2)
		}).join('')
	}

	private listImages () {
		this.imagesService.loadAllImages().subscribe(res => {
			console.log(res);
		});
	}

	private fileUpload (event) {
		console.log(event);
	}

}
