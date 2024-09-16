import { TestBed } from '@angular/core/testing';
import { StorageService } from '@core/services/storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve definir e obter um item', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    service.getItem$(key).subscribe((result) => {
      expect(result).toBe(value);
    });
  });

  it('deve remover um item', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    service.removeItem(key);
    service.getItem$(key).subscribe((result) => {
      expect(result).toBeNull();
    });
  });

  it('deve retornar null para uma chave inexistente', () => {
    const key = 'nonExistentKey';

    service.getItem$(key).subscribe((result) => {
      expect(result).toBeNull();
    });
  });

  it('deve atualizar um item existente', () => {
    const key = 'testKey';
    const initialValue = 'initialValue';
    const updatedValue = 'updatedValue';

    service.setItem(key, initialValue);
    service.setItem(key, updatedValue);
    service.getItem$(key).subscribe((result) => {
      expect(result).toBe(updatedValue);
    });
  });
});
