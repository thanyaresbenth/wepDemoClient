import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTypeComponent } from './topic-type.component';

describe('TopicTypeComponent', () => {
  let component: TopicTypeComponent;
  let fixture: ComponentFixture<TopicTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
