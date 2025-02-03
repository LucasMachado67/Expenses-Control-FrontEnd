import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMainPageComponent } from './balance-main-page.component';

describe('BalanceMainPageComponent', () => {
  let component: BalanceMainPageComponent;
  let fixture: ComponentFixture<BalanceMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
