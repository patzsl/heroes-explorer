/* eslint-disable */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { PreLoadingComponent } from './pre-loading.component';

describe('PreLoadingComponent', () => {
  let component: PreLoadingComponent;
  let fixture: ComponentFixture<PreLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreLoadingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should call animateIntro', () => {
      const animateIntroSpy = jest.spyOn(component as any, 'animateIntro');
      component.ngAfterViewInit();
      expect(animateIntroSpy).toHaveBeenCalled();
    });

    it('should animate logo elements', fakeAsync(() => {
      const button = fixture.nativeElement.querySelector('button');

      (component as any).animateButton();

      tick(2000);
      fixture.detectChanges();

      expect(button.classList.contains('intro__button--visible')).toBeTruthy();

      flush();
    }));
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroy$ subject', () => {
      const nextSpy = jest.spyOn(component['destroy$'], 'next');
      const completeSpy = jest.spyOn(component['destroy$'], 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('buttonClick', () => {
    it('should fade out intro elements', () => {
      jest.useFakeTimers();

      const logoElements = [
        {
          classList: { remove: jest.fn(), add: jest.fn() },
        },
        {
          classList: { remove: jest.fn(), add: jest.fn() },
        },
      ];
      jest
        .spyOn(component as any, 'getLogoElements')
        .mockReturnValue(logoElements);

      component.buttonClick();
      jest.advanceTimersByTime(100);

      logoElements.forEach((element) => {
        expect(element.classList.remove).toHaveBeenCalledWith(
          'intro__logo--active',
        );
        expect(element.classList.add).toHaveBeenCalledWith('intro__logo--fade');
      });

      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should hide intro', () => {
      jest.useFakeTimers();

      const introElement = { style: {} as CSSStyleDeclaration };
      component['intro'] = { nativeElement: introElement } as any;
      jest.spyOn(component['router'], 'navigate');

      component.buttonClick();
      jest.advanceTimersByTime(800);

      expect(introElement.style['top']).toBe('-66vh');
      expect(component['router'].navigate).toHaveBeenCalledWith(
        ['/characters'],
        { skipLocationChange: true },
      );

      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should call fadeOutIntro and hideIntro', () => {
      const fadeOutIntroSpy = jest.spyOn(component as any, 'fadeOutIntro');
      const hideIntroSpy = jest.spyOn(component as any, 'hideIntro');
      component.buttonClick();
      expect(fadeOutIntroSpy).toHaveBeenCalled();
      expect(hideIntroSpy).toHaveBeenCalled();
    });
  });

  describe('private methods', () => {
    it('should get correct animation delay', () => {
      expect((component as any).getAnimationDelay(0)).toBe(400);
      expect((component as any).getAnimationDelay(1)).toBe(800);
      expect((component as any).getAnimationDelay(2)).toBe(980);
    });

    it('should animate element', fakeAsync(() => {
      const element = document.createElement('div');
      (component as any).animateElement(element, 100);
      tick(100);
      expect(element.classList.contains('intro__logo--active')).toBeTruthy();
      flush();
    }));
  });
});
