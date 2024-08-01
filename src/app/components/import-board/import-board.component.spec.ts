import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBoardComponent } from './import-board.component';

describe('ImportBoardComponent', () => {
  let component: ImportBoardComponent;
  let fixture: ComponentFixture<ImportBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
