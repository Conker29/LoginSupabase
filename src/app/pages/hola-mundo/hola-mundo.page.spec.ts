import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolaMundoPage } from './hola-mundo.page';

describe('HolaMundoPage', () => {
  let component: HolaMundoPage;
  let fixture: ComponentFixture<HolaMundoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolaMundoPage]
    });
    fixture = TestBed.createComponent(HolaMundoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});