import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { TokenService } from './token.service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ImagesService {

	private apiPath = "http://localhost:3000/images";
	//private repositoryPath = "http://images.aygpeluqueras.es/";
	private repositoryPath = "http://localhost:8888/";

	constructor (
		private http: HttpService,
		private tokenService: TokenService
	) {}

	public loadAllImages (): Observable<object[]> {
		return this.http.get(this.apiPath + 'images/getAll');
	}

	public saveImage (imagen: object): Observable<object> {
		console.log(imagen);
		var httpOptions = {
			headers: this.tokenService.getTokenHeader()
		} 
		return this.http.post(this.apiPath, imagen, httpOptions);
	}

	public saveFisicalFile(file): Observable<object> {

		console.log(file);

		var res = new BehaviorSubject<object>(null);

		//var uri = "http://localhost:8888/index.php";
		var repositoryPath = "http://images.aygpeluqueras.es/";
		var xhr = new XMLHttpRequest();
		var fd = new FormData();

		//Añadir cabeceras
		//xhr.setRequestHeader(header, value)

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log("end", xhr.response);
				alert(xhr.response);
				res.next(xhr.response);
			}
		};
		xhr.upload.addEventListener("progress", function(e) {
			if (e.lengthComputable) {
				var percentage = Math.round((e.loaded * 100) / e.total);
				console.log(percentage);
				//console.log(e);
			}
		}, false);
		xhr.upload.addEventListener("error", function(err) {
			console.log("error", err);
		}, false);
		xhr.upload.addEventListener('loadend', function(e) {
			console.log("end load");
  		});

		fd.append('file', file);
		xhr.open("POST", repositoryPath, true);
		xhr.send(fd);

		return res;
	}

}