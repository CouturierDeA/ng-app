import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {SimpleChange, SimpleChanges} from "@angular/core";
import {
  getByDataId,
  setInputValue, setSelectOption
} from "../../../../test-utils/test-utils";
import {PaginationComponent} from "../pagination.component";
import {FormsModule} from "@angular/forms";
import {PaginationRequest} from "../../../domain/solr/solr-response";

describe('PaginationComponent работает корректно: ', () => {
  let fixture: ComponentFixture<PaginationComponent>
  let component: PaginationComponent
  let pageInput: HTMLInputElement
  let rowsSelect: HTMLSelectElement
  let total: HTMLElement
  let params: PaginationRequest = {
    start: 0,
    rows: 30,
    numFound: 90
  };
  let changes: SimpleChanges;

  beforeEach(async () => {
    params = {
      start: 0,
      rows: 30,
      numFound: 90,
    };
    changes = {
      start: new SimpleChange(undefined, params.start, true),
      rows: new SimpleChange(undefined, params.rows, true),
      numFound: new SimpleChange(undefined, params.numFound, true),
      rowsList: new SimpleChange(undefined, [10, 15, params.rows, 50, 100], true),
    }
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent,
        // PaginationHosting
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ],
      imports: [
        CommonModule,
        FormsModule
      ],
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    component.start = params.start;
    component.rows = params.rows;
    component.numFound = params.numFound;
    component.ngOnChanges(changes)
    fixture.detectChanges()
    pageInput = getByDataId(fixture, 'pagination-page-input')
    rowsSelect = getByDataId(fixture, 'pagination-rows-select')
    total = getByDataId(fixture, 'pagination-total')
  });

  it(`Компонент инициализируется `, () => {
    expect(component).toBeDefined()
  })

  it(`pageInput отображается`, () => {
    expect(pageInput).toBeDefined()
  })

  it(`rowsSelect отображается`, () => {
    expect(rowsSelect).toBeDefined()
  })
  it(`total отображается`, () => {
    expect(total).toBeDefined()
  })

  it(`total отрабатывает корректно`, () => {
    expect(total.innerText).toContain(`${Number(params.numFound) / Number(params.rows)}`)
  })

  it(`Пользователь может сменить страницу (к примеру вторую из 3 доступных)`, () => {
    const pageToGo = 2;
    const spy = spyOn(component.paginationEvent, 'emit').and.callThrough()
    setInputValue(pageInput, pageToGo, 'input')
    setInputValue(pageInput, pageToGo, 'change')
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith({
      start: pageToGo - component.pagesDisplayNormalization,
      rows: params.rows,
      startForBackend: pageToGo * params.rows - params.rows,
    })
  })

  it(`Пользователь может сменить страницу (к примеру на третью (последнюю))`, () => {
    const pageToGo = 3;
    const spy = spyOn(component.paginationEvent, 'emit').and.callThrough()
    setInputValue(pageInput, pageToGo, 'input')
    setInputValue(pageInput, pageToGo, 'change')
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith({
      start: pageToGo - component.pagesDisplayNormalization,
      rows: params.rows,
      startForBackend: pageToGo * params.rows - params.rows,
    })
  })

  it(`Пользователь может выбрать количество записей (rows), отображаемых на странице`, () => {
    const rowsOptionIndex = 3;
    const rowsOptionValue = component.rowsList[rowsOptionIndex];
    const spy = spyOn(component.paginationEvent, 'emit').and.callThrough()
    fixture.detectChanges()
    setSelectOption(rowsSelect, rowsOptionIndex)
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith({
      start: 0,
      rows: rowsOptionValue,
      startForBackend: 0
    })
  })

  it(`при вводе pageInput значения < 1, currentPage сбрасывается к первой странице`, () => {
    component.currentPage = -1
    fixture.detectChanges()
    setInputValue(pageInput, -1, 'change')
    fixture.detectChanges()
    expect(component.currentPage).toEqual(1)
  })

  it(`при вводе pageInput значения > количества страниц, currentPage сбрасывается к последней странице`,
    () => {
      component.currentPage = 100000
      fixture.detectChanges()
      setInputValue(pageInput, 100000, 'change')
      fixture.detectChanges()
      expect(component.currentPage).toEqual(component.pagesTotal)
    }
  )
})
