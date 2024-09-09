import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pre-loading',
  standalone: true,
  styleUrls: ['./pre-loading.component.scss'],
  template: `
    <div class="intro" #intro>
      <h1 class="intro__header">
        <span class="intro__logo" style="text-transform: uppercase"
          >Marvel&nbsp;</span
        >
        <span
          class="intro__logo"
          style="text-transform: uppercase;font-weight:400"
          >Characters</span
        >
      </h1>
      <p class="intro__subheader">
        <span class="intro__subheader__logo" style="font-weight:400"
          >Discover a captivating world of heroes and villains from the iconic
          House of Ideas!</span
        >
      </p>
      <button class="intro__button" #button (click)="buttonClick()">
        Explore Characters
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreLoadingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('intro', { static: false })
  private intro!: ElementRef<HTMLDivElement>;
  @ViewChild('button', { static: false })
  private button!: ElementRef<HTMLButtonElement>;

  private destroy$ = new Subject<void>();
  private readonly LOGO_ANIMATION_DELAY = 400;
  private readonly SUBHEADER_ANIMATION_DELAY = 490;
  private readonly BUTTON_ANIMATION_DELAY = 1200;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.animateIntro();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buttonClick(): void {
    this.fadeOutIntro();
    this.hideIntro();
  }

  private animateIntro(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animateLogoElements();
      this.animateButton();
    });
  }

  private animateLogoElements(): void {
    const logoElements = this.getLogoElements();
    logoElements.forEach((element, index) => {
      const delay = this.getAnimationDelay(index);
      this.animateElement(element, delay);
    });
  }

  private getLogoElements(): HTMLElement[] {
    return Array.from(
      this.el.nativeElement.querySelectorAll(
        '.intro__logo, .intro__subheader__logo',
      ),
    );
  }

  private getAnimationDelay(index: number): number {
    return index === 2
      ? index * this.SUBHEADER_ANIMATION_DELAY
      : (index + 1) * this.LOGO_ANIMATION_DELAY;
  }

  private animateElement(element: HTMLElement, delay: number): void {
    timer(delay)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.renderer.addClass(element, 'intro__logo--active');
        this.cdr.detectChanges();
      });
  }

  private animateButton(): void {
    timer(this.BUTTON_ANIMATION_DELAY)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.renderer.addClass(
          this.button.nativeElement,
          'intro__button--visible',
        );
        this.cdr.detectChanges();
      });
  }

  private fadeOutIntro(): void {
    const logoElements = this.getLogoElements();
    logoElements.forEach((element, index) => {
      timer((index + 1) * 50)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.renderer.removeClass(element, 'intro__logo--active');
          this.renderer.addClass(element, 'intro__logo--fade');
        });
    });
  }

  private hideIntro(): void {
    const visibleArea = 400;
    const introHeight = this.intro.nativeElement.offsetHeight;
    const topPosition = -(introHeight - visibleArea) + 'px';
    this.renderer.setStyle(this.intro.nativeElement, 'top', topPosition);
    timer(800)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/characters'], { skipLocationChange: true });
      });
  }
}
