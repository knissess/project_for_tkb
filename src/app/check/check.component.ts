import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  public conditions: boolean = false;
  public error = '';
  public result = false;

  myForm: FormGroup = new FormGroup({
    "bik": new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(9),
      Validators.minLength(9)
    ]),
    "score": new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(20),
      Validators.minLength(20)
    ]),
    "conditions": new FormControl(false)
  });

  get bik() { return this.myForm.get('bik'); }
  get score() { return this.myForm.get('score'); }

  constructor() { }

  ngOnInit(): void {
  }

  public validateRs(): void {
    this.result = false;
    let rs = this.myForm.get('score')?.value;
    let bik = this.myForm.get('bik')?.value;
    if (typeof rs === 'number') {
      rs = rs.toString();
    } else if (typeof rs !== 'string') {
      rs = '';
    }
    if (!rs.length) {
      this.error = 'Р/С пуст';
    } else if (/[^0-9]/.test(rs)) {
      this.error = 'Р/С может состоять только из цифр';
    } else if (rs.length !== 20) {
      this.error = 'Р/С может состоять только из 20 цифр';
    } else {
      var bikRs = bik.toString().slice(-3) + rs;
      var checksum = 0;
      var coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
      for (var i in coefficients) {
        checksum += coefficients[i] * (bikRs[i] % 10);
      }
      if (checksum % 10 === 0) {
        this.result = true;
      } else {
        this.error = 'Неправильное контрольное число';
      }
    }
  }

}
