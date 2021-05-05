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

  relation = [
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Wife",
    "Husband",
    "Son",
    "Daughter",
    "GrandMother",
    "GrandFather",
    "GrandSon",
    "GrandDaughter"
  ];
  addresscard;

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

    if(this.userForm.get('family').value){
      console.log(this.userForm.get('family').value)
    }
    let familyarray = this.userForm.get('family').value
    this.addresscard = familyarray.length;

    console.log(this.userForm.get('family').value)
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

  familydetail(){
    return this.fb.group({
      relationship:new FormControl("", Validators.required),
      rel_firstname: new FormControl("", Validators.required),
      rel_lastname: new FormControl("", Validators.required),
      rel_email: new FormControl("", [Validators.required, Validators.email]),
      rel_phone: new FormControl(null, [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ]),
      rel_gender: new FormControl("", Validators.required),
      rel_addressLine: new FormArray([this.addressline()]),
      rel_city: new FormControl("", Validators.required),
      rel_state: new FormControl("", Validators.required),
      rel_pincode: new FormControl(null, [
        Validators.required,
        Validators.min(100000),
        Validators.max(999999)
      ])
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

  addFamily(){
    let relation = this.userForm.get('family') as FormArray;
    relation.push(this.familydetail());
    this.addresscard = relation.length;
  }

  removeFamily(j){
    let relation = this.userForm.get('family') as FormArray;
    relation.removeAt(j);
    this.addresscard = relation.length;
  }

  addfamilyLine(j){
    let family = this.userForm.get('family') as FormArray;
    let addressLine = family.controls[j].get('rel_addressLine') as FormArray;
    // console.log(family.controls[0].get('addressLine').value)
     addressLine.push(this.addressline());
  }

  removefamilyLine(j,i){
    let family = this.userForm.get('family') as FormArray;
    let addressLine = family.controls[j].get('rel_addressLine') as FormArray;
    addressLine.removeAt(i);
  }

  OnSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      alert("Submitted Successfully...!!");
    }
  }
}
