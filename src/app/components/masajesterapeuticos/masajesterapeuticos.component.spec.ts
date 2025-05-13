import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasajesterapeuticosComponent } from './masajesterapeuticos.component';

describe('MasajesterapeuticosComponent', () => {
  let component: MasajesterapeuticosComponent;
  let fixture: ComponentFixture<MasajesterapeuticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasajesterapeuticosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasajesterapeuticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
