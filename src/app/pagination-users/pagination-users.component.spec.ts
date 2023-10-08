import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationUsersComponent } from './pagination-users.component';

describe('PaginationUsersComponent', () => {
  let component: PaginationUsersComponent;
  let fixture: ComponentFixture<PaginationUsersComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
