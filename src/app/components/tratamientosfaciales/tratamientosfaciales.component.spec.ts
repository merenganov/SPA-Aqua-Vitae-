import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosfacialesComponent } from './tratamientosfaciales.component';

describe('TratamientosfacialesComponent', () => {
  let component: TratamientosfacialesComponent;
  let fixture: ComponentFixture<TratamientosfacialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientosfacialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientosfacialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
