import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject, timer } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';

@Directive({
  selector: '[delayedInput]',
})
export class DelayedInputDirective implements OnInit, OnDestroy {
  private destroySubject$ = new Subject<void>();

  @Input() delayTime = 500;

  @Output() delayedInput = new EventEmitter();

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'input')
      .pipe(
        // debounce(() => timer(this.delayTime)),
        debounceTime(this.delayTime),
        distinctUntilChanged(
          null,
          (event: Event) => (event.target as HTMLInputElement).value
        ),
        takeUntil(this.destroySubject$)
      )
      .subscribe((value) => this.delayedInput.emit(value));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
