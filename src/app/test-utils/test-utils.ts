import {ComponentFixture} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector)) || undefined;
}

export function findComponents<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector)) || undefined;
}

export function setInputValue(input: HTMLInputElement, value: any, event: 'input' | 'change' = 'input') {
  input.value = value;
  input.dispatchEvent(new Event(event));
}

export function setSelectOption(select: HTMLSelectElement, optionNumber: any) {
  select.value = select.options[optionNumber].value;
  select.dispatchEvent(new Event('change'));
}

export function getByDataId<T>(fixture: ComponentFixture<T>, dataId: string) {
  return fixture.nativeElement.querySelector(`[data-id="${dataId}"]`) || undefined
}

//
export function getAllByDataId<T>(fixture: ComponentFixture<T>, dataId: string) {
  return fixture.nativeElement.querySelectorAll(`[data-id="${dataId}"]`) || undefined
}

export function getByDataIdFromDebugElement<T>(debugElement: DebugElement, dataId: string) {
  return debugElement.nativeElement.querySelector(`[data-id="${dataId}"]`) || undefined
}
