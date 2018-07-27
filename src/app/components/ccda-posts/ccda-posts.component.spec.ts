import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdaPostsComponent } from './ccda-posts.component';

describe('CcdaPostsComponent', () => {
  let component: CcdaPostsComponent;
  let fixture: ComponentFixture<CcdaPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcdaPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
