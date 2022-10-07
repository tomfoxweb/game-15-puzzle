import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Core } from '../core/core';
import { Cell, CellValue, Column, Row } from '../core/map';

import { PuzzleComponent } from './puzzle.component';

describe('PuzzleComponent', () => {
  let component: PuzzleComponent;
  let fixture: ComponentFixture<PuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuzzleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const EXPECTED_ROW_COUNT = 4;
  const EXPECTED_COLUMN_COUNT = 4;
  const EXPECTED_BUTTON_COUNT = 16;

  it(`should render ${EXPECTED_BUTTON_COUNT} puzzle buttons`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const puzzleButtons = compiled.querySelectorAll('button.puzzle-item');
    expect(puzzleButtons?.length).toEqual(EXPECTED_BUTTON_COUNT);
  });

  it(`should set puzzle items textContent in order`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let value: CellValue = 0;
    for (let row = 0; row < EXPECTED_ROW_COUNT; row++) {
      for (let col = 0; col < EXPECTED_COLUMN_COUNT; col++) {
        const expectedId = `item${row}${col}`;
        const item = compiled.querySelector(`#${expectedId}`);
        expect(item).toBeTruthy();
        expect(item!.textContent?.trim()).toEqual(value.toString());
        value++;
      }
    }
  });

  it(`should load puzzle values from Core`, () => {
    spyOn(component, 'setCell');
    component.ngOnInit();
    let value: CellValue = 0;
    for (let row = 0; row < EXPECTED_ROW_COUNT; row++) {
      for (let col = 0; col < EXPECTED_COLUMN_COUNT; col++) {
        expect(component.setCell).toHaveBeenCalledWith(
          jasmine.objectContaining({
            row: row as Row,
            column: col as Column,
            value: value as CellValue,
          })
        );
        value++;
      }
    }
  });
});
