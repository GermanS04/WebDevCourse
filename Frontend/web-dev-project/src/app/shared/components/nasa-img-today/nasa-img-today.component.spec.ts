import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaImgTodayComponent } from './nasa-img-today.component';

describe('NasaImgTodayComponent', () => {
  let component: NasaImgTodayComponent;
  let fixture: ComponentFixture<NasaImgTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasaImgTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasaImgTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
