import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormArray';

  state = [
    "Tamilnadu",
    "Kerala",
    "Pondichery",
    "Karnadaka",
    "Andhra Pradesh",
    "Telungana"
  ];

  submitted = false;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ]),
      gender: new FormControl("", Validators.required),
      addressLine: new FormArray([this.addressline()]),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      pincode: new FormControl(null, [
        Validators.required,
        Validators.min(100000),
        Validators.max(999999)
      ]),
      family: new FormArray([])
    });
  }

  get f() {
    return this.userForm.controls;
  }

  get fArray() {
    return this.userForm.get("addressLine") as FormArray;
  }

  addressline() {
    return this.fb.group({
      line: new FormControl("", Validators.required)
    });
  }

  addAddressLine() {
    let addressLine = this.userForm.get("addressLine") as FormArray;
    addressLine.push(this.addressline());
  }

  removeLine(i) {
    let addressLine = this.userForm.get("addressLine") as FormArray;

    addressLine.removeAt(i);
  }

  OnSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      alert("Submitted Successfully...!!");
    }
  }
}
