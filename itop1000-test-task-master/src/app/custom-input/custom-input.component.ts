import { Component, forwardRef,  Input,  OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() =>  CustomInputComponent),
    multi: true
   }]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {
  @Input() myForm: any;

  value: '';

  onChange: (value?: any) => void;

  onTouch: (event: any) => void;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void{
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInput(value) {
      if (this.onChange) {
        this.onChange(value);
      }
  }

  onTouched(value) {
    if (this.onTouch) {
      this.onTouch(value);
    }
  }
}
