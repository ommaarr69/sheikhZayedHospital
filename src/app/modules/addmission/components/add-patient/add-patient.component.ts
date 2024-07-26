import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectList } from 'src/app/shared/models/select-list';
import { GenderEnum } from '../../enums/gender-enum';
import { DatePipe } from '@angular/common';
import { AddPatientService } from '../../services/add-patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  providers: [DatePipe]
})
export class AddPatientComponent implements OnInit {
  form !: FormGroup;
  genderList: SelectList[] = [];
  ptId: number = 0;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private datePipe: DatePipe,
    private patientService: AddPatientService,

  ) {
    this.genderList = Object.keys(GenderEnum).map((key: any) => ({ name: GenderEnum[key], id: Number(key) })).filter((x) => !isNaN(Number(x.id)));
  }

  ngOnInit(): void {
    this.initForm();
    this._route.params.subscribe((params) => {
      this.ptId = params['id'];
      if (this.ptId !== 0) {
        this.form.get('nationalId')?.setValue(this.ptId);
      }
    });
  }



  initForm() {
    this.form = this.fb.group({
      nationalId: [{ value: '', disabled: true }],
      gender: [null],
      age: [null],
      fullName: [null],
      nationality: [null],
      phoneNumber: [null, Validators.pattern(/^(010|011|012|015)\d{8}$/)],
      address: [null],
      bloodType: 'A+',
      date: ''
    })
  }

  numberOnly(event: KeyboardEvent): boolean {
    const inputElement = event.target as HTMLInputElement;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.form.valid) {
      this.printDiv();
    }
    this.form.get('nationalId')?.setValue(this.ptId);
    const data = { patient: this.form.value, emergency: {} };
    console.log(data);

    this.patientService.addTicket(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  printDiv() {
    let printContents = document.getElementById('print')?.innerHTML;
    const ptData = this.form.value;
    console.log(ptData);
    const originalContents = document.body.innerHTML;
    printContents = `
<div _ngcontent-mmv-c68="" dir="rtl">
    <div _ngcontent-mmv-c68="" class="row text-center pt-2">
        <div _ngcontent-mmv-c68="" class="col-md-4">
            <p _ngcontent-mmv-c68="">وزارة الصحة والاسكان</p>
            <p _ngcontent-mmv-c68="">مديرية الشئون الصحية بالجيزة</p>
            <p _ngcontent-mmv-c68="">مستشفى الشيخ زايد المركزي
            </p>
        </div>
        <div _ngcontent-mmv-c68="" class="col-md-4">
            <p _ngcontent-mmv-c68="">تذكرة</p>
            <p _ngcontent-mmv-c68="">استقبال طوارئ</p>
        </div>
        <div _ngcontent-mmv-c68="" class="col-md-4">
            <p _ngcontent-mmv-c68="">كود المريض</p>
            <div _ngcontent-mmv-c68="" class="border border-1 p-3"> 69 </div>
        </div>
    </div>
    <div _ngcontent-mmv-c68="" class="row">
        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">الرقم القومي</label><input
                _ngcontent-mmv-c68="" type="text" formcontrolname="nationalId" pinputtext="" value="${this.ptId}"
                class="p-inputtext p-component p-element p-filled ng-untouched ng-pristine" ng-reflect-name="nationalId"
                ></div>

        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">النوع</label>
        <input
                _ngcontent-mmv-c68="" type="text" formcontrolname="nationalId" pinputtext="" value="${ptData.gender ? 'انثى' : 'ذكر'}"
                class="p-inputtext p-component p-element p-filled ng-untouched ng-pristine" ng-reflect-name="nationalId"
                >
        </div>
        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">العمر</label><p-inputnumber
                _ngcontent-mmv-c68="" inputid="integeronly" formcontrolname="age"
                class="p-element p-inputwrapper ng-untouched ng-pristine ng-valid" ng-reflect-input-id="integeronly"
                 ng-reflect-name="age"><span
                    ng-reflect-ng-class="[object Object]" class="p-inputnumber p-component"><input pinputtext=""
                        inputmode="decimal" class="p-inputtext p-component p-element p-inputnumber-input" value="${ptData.age}"
                        ng-reflect-ng-class="p-inputnumber-input" placeholder="اكتب العمر هنا ..." id="integeronly"><!--bindings={
    "ng-reflect-ng-if": "false"
  }--><!--bindings={
    "ng-reflect-ng-if": "false"
  }--><!--bindings={
    "ng-reflect-ng-if": "false"
  }--><!--bindings={
    "ng-reflect-ng-if": "false"
  }--></span></p-inputnumber></div>
    </div>
    <div _ngcontent-mmv-c68="" class="row mt-3">
        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">اسم المريض</label><input
                _ngcontent-mmv-c68="" type="text" placeholder="اكتب الاسم هنا ..." formcontrolname="fullName"  value="${ptData.fullName}"
                pinputtext="" class="p-inputtext p-component p-element ng-untouched ng-pristine ng-valid"
                ng-reflect-name="fullName"></div>
        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">الجنسية</label><input
                _ngcontent-mmv-c68="" type="text" placeholder="اكتب الجنسية هنا ..." formcontrolname="nationality"  value="${ptData.nationality}"
                pinputtext="" class="p-inputtext p-component p-element ng-untouched ng-pristine ng-valid"
                ng-reflect-name="nationality"></div>
        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">الموبايل</label><input
                _ngcontent-mmv-c68="" type="text" formcontrolname="phoneNumber" placeholder="ادخل رقم الموبايل ...."  value="${ptData.phoneNumber}"
                pinputtext="" class="p-inputtext p-component p-element w-75 mb-5 ng-untouched ng-pristine ng-valid"
                ng-reflect-name="phoneNumber"></div>
    </div>
    <div _ngcontent-mmv-c68="" class="row mt-1">
        <div _ngcontent-mmv-c68="" class="col-md-8"><label _ngcontent-mmv-c68="" for="">العنوان</label><input
                _ngcontent-mmv-c68="" type="text" placeholder="اكتب العنوان هنا ..." formcontrolname="address"  value="${ptData.address}"
                pinputtext="" class="p-inputtext p-component p-element w-75 ng-untouched ng-pristine ng-valid"
                ng-reflect-name="address"></div>
        <div _ngcontent-mmv-c68="" class="col-md-4"><label _ngcontent-mmv-c68="" for="">التاريخ</label><input
                _ngcontent-mmv-c68="" type="text" formcontrolname="date" pinputtext="" value="12/07/2024"
                class="p-inputtext p-component p-element w-75" ng-reflect-name="date"></div>
    </div>
    <div _ngcontent-mmv-c68="" class="row mt-2">
        <div _ngcontent-mmv-c68="" class="col-md-6 border-1 border">
            <p _ngcontent-mmv-c68="" for="">علاج الطوارئ : </p><textarea _ngcontent-mmv-c68="" rows="5" cols="30"
                pinputtextarea="" class="w-100"></textarea>
        </div>
        <div _ngcontent-mmv-c68="" class="col-md-6 border-1 border">
            <p _ngcontent-mmv-c68="" for="">التاريخ المرضي : </p>
            <div _ngcontent-mmv-c68="" class="row">
                <div _ngcontent-mmv-c68="" class="col-md-3">
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="New York" inputid="ny" class="p-element my-1 me-2" ng-reflect-name="group1"
                            ng-reflect-value="New York" ng-reflect-input-id="ny">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="New York" id="ny"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="ny" class="my-1">ضغط</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="San Francisco" inputid="sf" class="p-element my-1 me-2" ng-reflect-name="group1"
                            ng-reflect-value="San Francisco" ng-reflect-input-id="sf">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="San Francisco" id="sf"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="sf" class="my-1">سكر</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="Los Angeles" inputid="la" class="p-element my-1 me-2" ng-reflect-name="group1"
                            ng-reflect-value="Los Angeles" ng-reflect-input-id="la">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="Los Angeles" id="la"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="la" class="my-1">قلب</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="Chicago" inputid="ch" class="p-element my-1 me-2" ng-reflect-name="group1"
                            ng-reflect-value="Chicago" ng-reflect-input-id="ch">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="Chicago" id="ch"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="ch" class="my-1">اخرى</label></div>
                </div>
                <div _ngcontent-mmv-c68="" class="col-md-8"><textarea _ngcontent-mmv-c68="" rows="5" cols="30"
                        pinputtextarea="" class="w-100"></textarea></div>
            </div>
        </div>
    </div>
    <div _ngcontent-mmv-c68="" class="row mt-2">
        <div _ngcontent-mmv-c68="" class="col-md-6 border-1 border">
            <p _ngcontent-mmv-c68="" for="">الفحوصات المطلوبة : </p><textarea _ngcontent-mmv-c68="" rows="5" cols="30"
                pinputtextarea="" class="w-100"></textarea>
        </div>
        <div _ngcontent-mmv-c68="" class="col-md-6 border border-1">
            <p _ngcontent-mmv-c68="" for="">الاجراء المتخذ : </p>
            <div _ngcontent-mmv-c68="" class="row">
                <div _ngcontent-mmv-c68="" class="col-md-8"><textarea _ngcontent-mmv-c68="" rows="5" cols="30"
                        pinputtextarea="" class="w-100"></textarea></div>
                <div _ngcontent-mmv-c68="" class="col-md-4">
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="New York" inputid="ny" class="p-element my-1" ng-reflect-name="group1"
                            ng-reflect-value="New York" ng-reflect-input-id="ny">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="New York" id="ny"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="ny" class="my-1">خروج تحسن</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="San Francisco" inputid="sf" class="p-element my-1" ng-reflect-name="group1"
                            ng-reflect-value="San Francisco" ng-reflect-input-id="sf">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="San Francisco" id="sf"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="sf" class="my-1">تحويل</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="Los Angeles" inputid="la" class="p-element my-1" ng-reflect-name="group1"
                            ng-reflect-value="Los Angeles" ng-reflect-input-id="la">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="Los Angeles" id="la"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="la" class="my-1">خروج وفاة</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="Chicago" inputid="ch" class="p-element my-1" ng-reflect-name="group1"
                            ng-reflect-value="Chicago" ng-reflect-input-id="ch">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="Chicago" id="ch"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="ch" class="my-1">دخول</label></div>
                    <div _ngcontent-mmv-c68="" class="field-checkbox"><p-checkbox _ngcontent-mmv-c68="" name="group1"
                            value="Chicago" inputid="ch" class="p-element my-1" ng-reflect-name="group1"
                            ng-reflect-value="Chicago" ng-reflect-input-id="ch">
                            <div ng-reflect-ng-class="[object Object]" class="p-checkbox p-component">
                                <div class="p-hidden-accessible"><input type="checkbox" value="Chicago" id="ch"
                                        name="group1" aria-checked="false"></div>
                                <div class="p-checkbox-box" ng-reflect-ng-class="[object Object]"><span
                                        class="p-checkbox-icon"></span></div>
                            </div><!--bindings={}-->
                        </p-checkbox><label _ngcontent-mmv-c68="" for="ch" class="my-1">حسب الطلب</label></div>
                </div>
            </div>
        </div>
    </div>
</div>
    
    
    `


    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }

  }


}
