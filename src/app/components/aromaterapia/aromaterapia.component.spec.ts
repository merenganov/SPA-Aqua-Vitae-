import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AromaterapiaComponent } from './aromaterapia.component';

describe('AromaterapiaComponent', () => {
  let component: AromaterapiaComponent;
  let fixture: ComponentFixture<AromaterapiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AromaterapiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AromaterapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
