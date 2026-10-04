import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExternalLinksDirective } from './external-links.directive';

@Component({
  standalone: true, imports: [ExternalLinksDirective],
  template: '<div appExternalLinks [innerHTML]="html"></div><a href="https://outside.example">Outside host</a>',
})
class HostComponent {
  html = '<a href="https://external.example" rel="author">External</a>' +
    '<a href="/local">Internal</a><a href="#part">Fragment</a>' +
    '<a href="mailto:hi@example.com">Mail</a><a href="/file" download>Download</a>';
}

describe('Scoped external link annotation', () => {
  it('annotates initial and replaced content while preserving internal protocol and download contexts', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    const host = root.querySelector('div')!;
    const external = host.querySelector('a')!;
    expect(external.target).toBe('_blank');
    expect(external.rel.split(' ')).toEqual(jasmine.arrayContaining(['author', 'noopener', 'noreferrer']));
    for (const anchor of Array.from(host.querySelectorAll('a')).slice(1)) {
      expect(anchor.target).toBe('');
    }
    expect(root.querySelector('div + a')?.getAttribute('target')).toBeNull();
    fixture.componentInstance.html = '<a href="https://replacement.example">Replacement</a>' +
      '<a href="/new">New internal</a>';
    fixture.detectChanges();
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    expect(host.querySelector('a')?.target).toBe('_blank');
    expect(host.querySelector('a:last-child')?.getAttribute('target')).toBeNull();
    const anchor = host.querySelector('a')!;
    anchor.href = '/changed';
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    expect(anchor.target).toBe('');
    anchor.href = 'https://again.example';
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    expect(anchor.target).toBe('_blank');
    anchor.removeAttribute('href');
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    expect(anchor.target).toBe('');
    fixture.destroy();
    const detached = document.createElement('a');
    detached.href = 'https://after-destroy.example';
    host.append(detached);
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    expect(detached.target).toBe('');
  });
});
