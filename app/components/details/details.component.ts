import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import * as imagepicker from "nativescript-imagepicker";
import * as firebase from "nativescript-plugin-firebase";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { UserFactory } from '~/models/factories/user.factory';
import { User } from '~/models/user';
import { FirestoreProvider } from '~/services/firestore/firestore';

@Component({
  selector: 'app-components/details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss']
})
export class DetailsComponent {

  public formGroup: FormGroup;

  private imagePicker: imagepicker.ImagePicker;

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private firestore: FirestoreProvider,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      picture: [''],
      address: ['']
    });
    this.imagePicker = imagepicker.create({
      mode: "single"
    });
  }

  ngOnInit() {
    this.route.params
      .forEach((params) => {
        const id = params['id'];
        if (id === 'new') {
          this.setFormGroupValues(UserFactory.newInstance());
        } else {
          this.firestore.getUserById(id).then((snapshot: firebase.firestore.DocumentSnapshot) => {
            this.setFormGroupValues(UserFactory.fromDocument(snapshot));
          });
        }
      });
  }

  private setFormGroupValues(user: User) {
    this.formGroup.patchValue({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      description: user.description,
      email: user.email,
      picture: user.picture,
      address: user.address
    });
  }

  public pickImage() {
    this.imagePicker
      .authorize()
      .then(() => this.imagePicker.present())
      .then((selection: ImageAsset[]) => this.firestore.uploadFile(selection[0]))
      .then((url: string) => this.formGroup.controls.picture.patchValue(url))
      .catch(function (e) {
        console.error(e);
      });
  }

  public submit() {
    this.firestore.saveUser(this.formGroup)
      .then(() => this.routerExtensions.back())
      .catch(err => console.error(err));
  }

}
