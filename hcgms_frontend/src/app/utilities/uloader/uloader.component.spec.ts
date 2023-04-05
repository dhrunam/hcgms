import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UloaderComponent } from './uloader.component';

describe('UloaderComponent', () => {
  let component: UloaderComponent;
  let fixture: ComponentFixture<UloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
