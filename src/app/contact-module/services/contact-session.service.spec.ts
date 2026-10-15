import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ContactSessionService } from './contact-session.service';
import { ContactService } from './contact.service';
import { ContactNavigationState } from '../../shared/contact-navigation-state';

describe('Contact memory session', () => {
  let session: ContactSessionService;
  let service: jasmine.SpyObj<ContactService>;
  let responses: Subject<void>[];
  const input = { name: 'Synthetic', email: 'fixture@example.invalid', phone: '',
    message: 'Controlled synthetic message long enough.' };
  beforeEach(() => {
    responses = [];
    service = jasmine.createSpyObj('ContactService', ['sendEmail']);
    service.sendEmail.and.callFake(() => {
      expect(TestBed.inject(ContactNavigationState).pending()).toBeTrue();
      const response = new Subject<void>(); responses.push(response); return response;
    });
    TestBed.configureTestingModule({ providers: [{ provide: ContactService, useValue: service }] });
    session = TestBed.inject(ContactSessionService);
  });
  it('retains detached draft and blur state only in memory across permitted Close', () => {
    const draft = { ...input };
    session.update(draft, { name: true });
    draft.name = 'Changed after update';
    session.close(true);
    expect(session.draft).toEqual(input);
    expect(session.touched).toEqual({ name: true });
    expect(session.state()).toBe('editing');
  });
  it('locks before one immutable POST, retains failure Retry and clears only explicit success Close', () => {
    const draft = { ...input };
    session.send(draft);
    session.send(draft);
    session.close(true);
    expect(session.state()).toBe('sending');
    expect(service.sendEmail.calls.count()).toBe(1);
    draft.message = 'Mutation';
    expect(service.sendEmail.calls.first().args[0]).toEqual(input);
    responses[0]?.error(new Error('Controlled failure'));
    expect(session.state()).toBe('failure');
    expect(TestBed.inject(ContactNavigationState).pending()).toBeFalse();
    session.close(true);
    expect(session.draft).toEqual(input);
    session.retry(); session.retry();
    expect(service.sendEmail.calls.count()).toBe(2);
    expect(service.sendEmail.calls.mostRecent().args[0]).toEqual(input);
    responses[1]?.next();
    expect(session.state()).toBe('success');
    session.close(false);
    expect(session.state()).toBe('success');
    session.close(true);
    expect(session.state()).toBe('editing');
    expect(session.draft).toEqual({ name: '', email: '', phone: '', message: '' });
    expect(session.touched).toEqual({});
  });
});
