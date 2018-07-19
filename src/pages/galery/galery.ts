import { Component, Renderer, ElementRef, ViewChild, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagesService } from './../../services/images.service'
	
@Component({
	selector: 'galery',
	templateUrl: 'galery.html'
})
export class Galery {

	@ViewChild('fileInput') fileInput: ElementRef;
	@Input() images: object[] = new Array<object>();

	constructor(
		public navCtrl: NavController,
		private camera: Camera,
		private renderer: Renderer,
		private imagesService: ImagesService
		) {}

	private getImageFromCamera () {

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			console.log(imageData);
		}, (err) => {
			console.log("error en camera picture", err);
		});
	}

	private uploadFiles (event) {
		console.log("uploadFiles");
		var files = event.srcElement.files;
		for (var i = 0; i < files.length; ++i) {
			this.imagesService.saveFisicalFile(files[i])
			.subscribe((fisicalImageSaved) => {
				console.log("next", fisicalImageSaved);
				//Montar la imagen para la db
				this.imagesService.saveImage(fisicalImageSaved)
				.subscribe((imageSaved) => {
					console.log(imageSaved);
				}, err => {
					console.log(err);
				});
			}, err => {
				console.log(err);
			});
		}
	}

	private selectFiles () {
		let event = new MouseEvent('click', {bubbles: true});
		this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
	}

}