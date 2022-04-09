import { StoryDetailsModule } from './story-details.module';

describe('StoryDetailsModule', () => {
  let storyDetailsModule: StoryDetailsModule;

  beforeEach(() => {
    storyDetailsModule = new StoryDetailsModule();
  });

  it('should create an instance', () => {
    expect(storyDetailsModule).toBeTruthy();
  });
});
