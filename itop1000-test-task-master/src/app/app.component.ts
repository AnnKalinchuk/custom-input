import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { buffer, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  isDisabled = false;

  private buttonClick$: Subject<any> = new Subject();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      customField: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getButtonClicks().subscribe((formValue) => {
      // Do something with debounced formValue
      this.form.enable();
      this.isDisabled = false;
      console.log('formValue', formValue[0]);
    });

  }

  getButtonClicks() {
    return this.buttonClick$.pipe(
      buffer(this.buttonClick$.pipe(
        debounceTime(500)
      ))
    );
  }

  onSubmit() {
    if (this.form.value) {
      this.form.disable();
      this.isDisabled = true;
      this.buttonClick$.next(this.form.value);
    }
  }

}
