import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService } from './contact.service';

describe('Contact provider boundary', () => {
  let service: ContactService;
  let http: HttpTestingController;
  const input = { name: 'Synthetic & fixture', email: 'fixture@example.invalid', phone: '',
    message: 'Controlled synthetic message only.' };
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ContactService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('uses the documented JSON transport with an explicit string success signal', () => {
    let complete = false;
    service.sendEmail(input).subscribe(() => complete = true);
    const request = http.expectOne(service.formURL);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Content-Type')).toBe('application/json');
    expect(request.request.headers.get('Accept')).toBe('application/json');
    const body = request.request.serializeBody();
    expect(typeof body).toBe('string');
    if (typeof body === 'string') expect(JSON.parse(body)).toEqual(input);
    expect(complete).toBeFalse();
    request.flush({ success: 'true' });
    expect(complete).toBeTrue();
  });
  it('rejects negative or malformed HTTP200 responses and transport errors without logging contact data', () => {
    const log = spyOn(console, 'log');
    let errors = 0;
    for (const response of [{ success: 'false' }, { success: true }, {}, null, 'HTML response']) {
      service.sendEmail(input).subscribe({ next: () => fail('Not confirmed success'), error: () => errors++ });
      http.expectOne(service.formURL).flush(response);
    }
    service.sendEmail(input).subscribe({ next: () => fail('Transport failed'), error: () => errors++ });
    http.expectOne(service.formURL).error(new ProgressEvent('error'));
    expect(errors).toBe(6);
    expect(log).not.toHaveBeenCalled();
  });
});
