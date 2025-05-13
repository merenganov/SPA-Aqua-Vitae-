import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoscorporalesComponent } from './tratamientoscorporales.component';

describe('TratamientoscorporalesComponent', () => {
  let component: TratamientoscorporalesComponent;
  let fixture: ComponentFixture<TratamientoscorporalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoscorporalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoscorporalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
