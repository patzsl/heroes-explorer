import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-title]',
  standalone: true,
})
export class TitleDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.addDecorativeStyle();
  }

  private addDecorativeStyle(): void {
    this.renderer.addClass(this.el.nativeElement, 'decorative-style');
  }
}
