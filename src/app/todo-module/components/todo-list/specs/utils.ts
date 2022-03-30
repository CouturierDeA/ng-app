import {ComponentFixture} from "@angular/core/testing";

export let getElements = <T>(fixture: ComponentFixture<T>, selector: string): HTMLElement[] | null => {
  return Array.from(fixture.nativeElement.querySelectorAll(selector)) as HTMLElement[]
}

export let getElement = (parent: HTMLElement, selector: string): HTMLElement | null => {
  return parent.querySelector(selector)
}

export const getItemsListFromFixture = <T>(fixture: ComponentFixture<T>): Array<{
  titleText: string | undefined,
  descriptionText: string | undefined
}> | undefined => {
  return getElements(fixture, '.todo-item')?.map(el => ({
    titleText: getElement(el, '.todo-item-title')?.innerHTML,
    descriptionText: getElement(el, '.todo-item-description')?.innerHTML
  }));
}


export const getDeleteBtn = <T>(fixture: ComponentFixture<T>, index: number): HTMLButtonElement => {
  return fixture.nativeElement.querySelectorAll('.todo-item-delete')[index]
}

export const getAddBtn = <T>(fixture: ComponentFixture<T>): HTMLButtonElement => {
  return fixture.nativeElement.querySelector('.todo-add')
}

export const getUpdateBtn = <T>(fixture: ComponentFixture<T>, index: number): HTMLButtonElement => {
  return fixture.nativeElement.querySelectorAll('.todo-item-update')[index]
}

export const getSearchInput = <T>(fixture: ComponentFixture<T>): HTMLInputElement => {
  return fixture.nativeElement.querySelector('.todo-search')
}

export const getTitleInput = <T>(fixture: ComponentFixture<T>): HTMLInputElement => {
  return fixture.nativeElement.querySelector('.todo-form-title')
}

export const getDescriptionInput = <T>(fixture: ComponentFixture<T>): HTMLInputElement => {
  return fixture.nativeElement.querySelector('.todo-form-description')
}

export const setInputValue = (input: HTMLInputElement, value: any) => {
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

export const getTodoSubmitBtn = <T>(fixture: ComponentFixture<T>) => {
  return fixture.nativeElement.querySelector('.todo-submit');
}

